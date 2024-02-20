// API key를 따로 빼둠
const API_KEY = `8024fec327eb489fb8d9674cbcc596a9`;
let news = [];

const getLatestNews = async () => {
  const url =
    // URL인스턴스는 url에 필요한 함수와 변수들을 제공함
    new URL(`https://newstimesbbc.netlify.app//top-headlines
  `);
  console.log(url);
  const response = await fetch(url);
  // JSON을 통해 우리가 원하는 data의 형태로 받아올 수 있음
  const data = await response.json();
  news = data.articles;
  console.log("뉴스", news);
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

function render() {}
