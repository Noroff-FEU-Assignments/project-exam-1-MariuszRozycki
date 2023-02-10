const postDetailContainer = document.querySelector(".post-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/posts/" + id + "?_embed";
console.log(url);
const h1 = document.querySelector("h1");
const title = document.querySelector("title");
const modal = document.querySelector(".modal");

async function getDetailPost() {
  try {
    const response = await fetch(url);
    const result = await response.json();

    title.innerHTML = `${result.title.rendered}`;
    h1.innerHTML = `Post details about: <span>${result.title.rendered}</span>`;

    renderHtml(result);

    const images = document.querySelectorAll("figure img");

    images.forEach(el => {
      el.addEventListener("click", () => {
        modal.innerHTML = `<img src="${el.getAttribute("src")}" alt="${el.getAttribute("alt")}">`;
        console.log(el.attributes.alt);
        modal.style.display = "block";
      });
    })
  }
  catch (error) {
    console.log(error);
  }
}
getDetailPost();

function renderHtml(result) {
  postDetailContainer.innerHTML = `<div class="post-details">${result.content.rendered}<div>`;
}

modal.addEventListener("click", (event) => {
  if (event.target.matches(".modal")) {
    modal.style.display = "none";
  }
})




