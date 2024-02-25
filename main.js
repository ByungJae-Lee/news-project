// API key를 따로 빼둠
const API_KEY = `8024fec327eb489fb8d9674cbcc596a9`;
let newsList = [];
// 데스크탑 메뉴 클릭
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
// 사이드바 메뉴 클릭
const sideNav = document.querySelectorAll(".side-nav button");
sideNav.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  `https://newnatimes.netlify.app/top-headlines
  `
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

// 코드 리펙토링 / 에러핸들링
const getNews = async () => {
  try {
    url.searchParams.set("page", page); // => &page = page
    url.searchParams.set("pageSize", pageSize); // => &pageSize = pageSize
    const response = await fetch(url);
    console.log("res", response);

    const data = await response.json();
    console.log("data", data);

    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("NO result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};
// 기본헤드라인 보여주는 함수
const getLatestNews = async () => {
  url =
    // URL인스턴스는 url에 필요한 함수와 변수들을 제공함
    new URL(`https://newnatimes.netlify.app/top-headlines
    `);
  getNews();
};
// 카테고리별 클릭시 뉴스 함수
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();

  url =
    new URL(`https://newnatimes.netlify.app/top-headlines?category=${category}
  `);
  getNews();
};

// 키워드검색 함수
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;

  url = new URL(`https://newnatimes.netlify.app/top-headlines?q=${keyword}`);

  getNews();
};
// 렌더링함수
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
// error렌더링 함수
const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};
// 페이지네이션 렌더 함수
const paginationRender = () => {
  // totalResult V
  // page V
  // pageSize V
  // groupSize V
  // totalPages
  const totalPages = Math.ceil(totalResults / pageSize);
  // pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage
  let lastPage = pageGroup * groupSize;
  // 마지막 페이지그룹이 그룹사이즈보다 작다면? lastpage = totalpage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  // firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1); // => pagination 0부터 시작하는걸 방지

  let paginationHTML = ``;
  // Previous버튼
  if (firstPage >= 6) {
    paginationHTML = `<li class="page-item" onclick="moveToPage(1)"><a class="page-link" >&lt&lt</a></li>
  <li class="page-item" onclick="moveToPage(${
    page - 1
  })"><a class="page-link" >&lt</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})" ><a class="page-link" >${i}</a></li>`;
  }
  // Next버튼
  if (lastPage < totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${
      page + 1
    })"><a class="page-link" >&gt</a></li>
    <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link" >&gt&gt</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};
// 페이지이동 함수
const moveToPage = (pageNum) => {
  console.log("Move to page", pageNum);
  page = pageNum;
  getNews();
};
getLatestNews();

// 햄버거메뉴 V
// 누나가 사용한 것은 Sidenav overlay V
// 데스크탑 모드일 때 햄버거메뉴 안보임 V
// 모바일 모드일 때 메뉴들이 사라지고 햄버거가 나타남 V
// 햄버거를 클릭하면 메뉴들이 사이드바로 나타남 메뉴들은 세로정렬 V

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
let searchInput = document.getElementById("search-input");
let goBtn = document.getElementById("go-btn");
// 검색버튼 클릭시 검색창 보이기, 숨기기
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
// 검색창 enter key적용
searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    goBtn.click();
  }
});
