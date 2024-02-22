// API key를 따로 빼둠
const API_KEY = `8024fec327eb489fb8d9674cbcc596a9`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url =
  new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}
`);

// 코드 리펙토링
const getNews = async () => {
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};
// 기본 보여주는 함수
const getLatestNews = async () => {
  url =
    // URL인스턴스는 url에 필요한 함수와 변수들을 제공함
    new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}
    `);

  getNews();
};
// 카테고리별 클릭시 뉴스 함수
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();

  url =
    new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}
  `);
  getNews();
};

// 키워드검색 함수
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("serch-input").value;

  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );

  getNews();
};

// 렌더함수
const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img
      class="new-img-size"
      src=${
        news.urlToImage ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
      }
      alt=""
    />
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${
      news.description === null || news.description === ""
        ? "내용없음"
        : news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description
    }</p>
    <div>${news.source.name || "no source"} * ${moment(
        news.publishedAt
      ).fromNow()}</div>
  </div>
</div>`
    )
    .join("");
  // join메서드는 배열 중간의 컴마를 없애줌

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

// 햄버거메뉴 V
// 누나가 사용한 것은 Sidenav overlay V
// 데스크탑 모드일 때 햄버거메뉴 안보임 V
// 모바일 모드일 때 메뉴들이 사라지고 햄버거가 나타남 V
// 햄버거를 클릭하면 메뉴들이 사이드바로 나타남 메뉴들은 세로정렬 V

// 인풋, Go버튼은 평소에는 숨겨져있다 V
// 검색아이콘을 클릭하면 인풋, Go버튼이 나타난다 V

// 햄버거 클릭시 사이드바 open
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
// 우측상단 X버튼 클릭시 close
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
// 검색창 껏다키는 toggle기능 구현
let isHidden = false;
let searchInput = document.getElementById("serch-input");
let goBtn = document.getElementById("go-btn");

function openSch() {
  if (isHidden) {
    searchInput.style.visibility = "visible";
    goBtn.style.visibility = "visible";
    isHidden = false;
  } else {
    searchInput.style.visibility = "hidden";
    goBtn.style.visibility = "hidden";
    isHidden = true;
  }
}

// 1. 버튼들에 클릭이벤트 가져오기 V
// 2. 카테고리별 뉴스 가져오기 V
// 3. 그 뉴스를 보여준다
