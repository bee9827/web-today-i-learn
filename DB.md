# DB 실습

## 문제 1: 테이블 생성하기 (CREATE TABLE)

### 1) attendance 테이블에서 중복되는 컬럼

- crew_id
- nickname

---

### 2), 4) crew 테이블 생성

```sql
CREATE TABLE crew
(
    crew_id  INT         NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    PRIMARY KEY (crew_id)
);
```

### 3) attendance 테이블에서 크루 정보 추출

```sql
SELECT DISTINCT crew_id, nickname
FROM attendance;
```

### 5) crew 테이블에 데이터 삽입

```sql
INSERT INTO crew (crew_id, nickname)
SELECT DISTINCT crew_id, nickname
FROM attendance;
```

## 문제 2: 테이블 컬럼 삭제하기 (ALTER TABLE)
### 1) attendance 에서 불필요해지는 컬럼은?
- nickName
### 2) 컬럼을 삭제하려면 어떻게 해야 하는가?
```sql
ALTER TABLE attendance
DROP COLUMN nickname
```
## 문제 3: 외래키 설정하기
```sql
ALTER TABLE attendance
ADD CONSTRAINT fk_attendance_crew
FOREIGN KEY (crew_id)
REFERENCES crew(crew_id);
```

## 문제 4: 유니크 키 설정
```sql
ALTER TABLE attendance
ADD CONSTRAINT unique_nickname UNIQUE (nickname);
```

# DML(CRUD) 실습
## 문제5: 크루 닉네임 검색하기(LIKE)
```sql
SELECT * FROM crew WHERE nickname LIKE '디%';
```

## 문제 6: 출석 기록 확인하기 (SELECT + WHERE)
```sql
SELECT * FROM attendance WHERE id = (
    SELECT crew_id FROM crew WHERE nickname = '어셔')
AND attendance_date = `2025-03-06`
```
## 문제 7: 누락된 출석 기록 추가(INSERT)
```sql
INSERT INTO attendance(crew_id, attendance_date, start_time, end_time)
VALUES ((SELECT crew_id FROM crew WHERE nickname = '어셔'),
        '2025-03-06',
        '09:31',
        '18:01');
```
## 문제 8: 잘못된 출석 기록 수정(UPDATE)
```sql
UPDATE attendance 
SET start_time = '10:00'
WHERE crew_id = (
    SELECT crew_id FROM crew WHERE nickname = '주니')
AND attendance_date = '2025-03-12';
```
## 문제 9: 
```sql
DELETE FROM attendance
WHERE crew_id = (
       SELECT crew_id FROM crew WHERE nickname = '아론')
AND attendance_date = '2025-03-12'
```
## 문제 10: 출석 정보 조회하기(JOIN)
```sql
SELECT 
    c.nickname,
    a.attendance_date,
    a.start_time,
    a.end_time 
FROM attendance a 
JOIN crew c
ON a.crew_id = c.crew_id;
```
## 문제 11: nickname으로 쿼리 처리하기(서브 쿼리)
```sql
SELECT *
FROM attendance
WHERE crew_id = (
    SELECT crew_id
    FROM crew
    WHERE nickname = '검프'
);
```
## 문제 12: 가장 늦게 하교한 크루 찾기
```sql
SELECT 
    c.nickname,a end_time
FROM attendance a
JOIN crew c
ON a.crew_id = c.crew_id
WHERE a.attendance_date = '2025-03-05'
ORDER BY a.end_time DESC   
LIMIT 1
```
# 집계 함수
## 문제 13: 크루별로 '기록된' 날짜 수 조회
```sql
SELECT 
    c.nickname,
    COUNT(a.attendance_date) AS days
FROM attendance a 
JOIN crew c ON a.crew_id = c.crew_id
GROUP BY c.nickname
```
## 문제 14: 크루별로 등교 기록이 있는(start_time IS NOT NULL) 날짜 수 조회
```sql
SELECT 
    c.nickname
    COUNT(*) AS days
FROM attendance a
JOIN crew c ON a.crew_id = c.crew_id
WHERE a.strat_time IS NOT NULL
GROUP BY c.nickname
```
## 문제 15: 날짜별로 등교한 크루 수 조회
```sql
SELECT
    attendance_date AS days
    COUNT(DISTINCT crew_id) AS crew_count
FROM attendance 
WHERE start_time IS NOT NULL
GROUP BY attendance_date
```
## 문제 16
```sql
SELECT 
    c.nickname
    MIN(a.start_time) AS earlies
    MAX(a.start_time) AS latest
FROM attendance a
JOIN crew c ON a.crew_id = c.crew_id
GROUP BY c.nickname
```
