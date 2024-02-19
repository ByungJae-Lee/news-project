// API key를 따로 빼둠
const API_KEY = `8024fec327eb489fb8d9674cbcc596a9`;
let news = [];

const getLatestNews = async () => {
  const url =
    // URL인스턴스는 url에 필요한 함수와 변수들을 제공함
    new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}
  `);
  console.log(url);
  const response = await fetch(url);
  // JSON을 통해 우리가 원하는 data의 형태로 받아올 수 있음
  const data = await response.json();
  news = data.articles;
  console.log("뉴스", news);
};

getLatestNews();
