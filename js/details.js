const postDetailContainer = document.querySelector(".post-detail-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/posts/" + id + "?_embed";
const h1 = document.querySelector("h1");
const title = document.querySelector("title");
console.log(title);

async function getDetailPost() {
  const response = await fetch(url);
  const result = await response.json();

  title.innerHTML = `${result.title.rendered}`;
  h1.innerHTML = `Post details about: <span>${result.title.rendered}</span>`;

  renderHtml(result);
}
getDetailPost();

function renderHtml(result) {
  console.log(result.content.rendered);
  postDetailContainer.innerHTML = `
  ${result.content.rendered}
  `;
}