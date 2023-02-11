const postDetailContainer = document.querySelector(".post-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/posts/" + id;
const h1 = document.querySelector("h1");
const title = document.querySelector("title");
const modal = document.querySelector(".modal");

async function getDetailPost() {
  try {
    const response = await fetch(url);
    const result = await response.json();

    title.innerHTML = `${result.title.rendered}`;

    renderHtml(result);

    const images = document.querySelectorAll("figure img");

    images.forEach(el => {
      el.addEventListener("click", () => {
        modal.innerHTML = `<img src="${el.getAttribute("src")}" alt="${el.getAttribute("alt")}">`;
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
  postDetailContainer.innerHTML = `
  <div class="post-details">
    <button class="btn back-to-posts" onclick="history.back()" title="Trip Blog || ${result.title.rendered}">&lt;&lt; Previous site</button>
    <h1 class="h1_main">Post details: <span>${result.title.rendered}</span></h1>  
    ${result.content.rendered}  
    <button class="btn back-to-posts" onclick="location.href='all-posts.html'" title="Trip Blog || ${result.title.rendered}">&lt;&lt; All posts</button>
  <div>`;
}

modal.addEventListener("click", (event) => {
  if (event.target.matches(".modal")) {
    modal.style.display = "none";
  }
})




