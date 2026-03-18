const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

// 1. 기존 데이터 불러오기
document.addEventListener("DOMContentLoaded", function () {
  const savedData = JSON.parse(localStorage.getItem("tilData")) || [];

  savedData.forEach((item) => {
    addTilItem(item);
  });
});

// 2. 폼 제출 이벤트
tilForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const date = document.querySelector("#til-date").value;
  const title = document.querySelector("#til-title").value;
  const content = document.querySelector("#til-content").value;

  if (!date || !title || !content) {
    alert("모든 값을 입력해주세요!");
    return;
  }

  const newItem = { date, title, content };

  // 화면에 추가
  addTilItem(newItem);

  // localStorage에 저장
  const savedData = JSON.parse(localStorage.getItem("tilData")) || [];
  savedData.unshift(newItem);
  localStorage.setItem("tilData", JSON.stringify(savedData));

  tilForm.reset();
});

// 3. DOM 생성 함수 (재사용)
function addTilItem({ date, title, content }) {
  const article = document.createElement("article");
  article.classList.add("til-item");

  const time = document.createElement("time");
  time.textContent = new Date(date).toLocaleDateString();

  const h3 = document.createElement("h3");
  h3.textContent = title;

  const p = document.createElement("p");
  p.textContent = content;

  article.appendChild(time);
  article.appendChild(h3);
  article.appendChild(p);

  tilList.prepend(article);
}
