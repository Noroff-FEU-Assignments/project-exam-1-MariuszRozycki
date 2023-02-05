const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const allPosts = baseUrl + "posts?_embed&per_page=100";
const firstPostsContainer = document.querySelector("#first-ten-posts");
const restOfPosts = document.querySelector("#rest-of-posts");
const btnShowMore = document.querySelector(".btn-posts");
const enlargedImgWrapper = document.createElement('div');
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

let flag = false;

async function getAllPosts() {
  try {
    const response = await fetch(allPosts);
    const results = await response.json();
    for (let i = 0; i < 10; i++) {
      let result = results[i];
      console.log(result);
      renderFirsPostsHtml(result, i);
    }

    btnShowMore.addEventListener("click", () => {
      flag = !flag;

      if (flag) {

        btnShowMore.innerText = "Show less";
        for (let i = 10; i < results.length; i++) {
          let result = results[i];
          renderRestOfPostsHtml(result, i);
        }
      } else {
        restOfPosts.innerHTML = "";
        btnShowMore.innerText = "Show more";
      }
    });

    const images = document.querySelectorAll("figure img");

    images.forEach(el => {
      el.addEventListener("click", () => {
        modal.innerHTML = `<img src="${el.getAttribute("src")}" alt="${el.getAttribute("alt")}">`;
        console.log(el.attributes.alt);
        modal.style.display = "block";
      });
    })
  }
  catch (err) {
    console.log(err);
  }
}
getAllPosts();


function renderFirsPostsHtml(result, i) {
  firstPostsContainer.innerHTML += `
  <div class="post" onclick="location.href='../layout/details.html?id=${result.id}'">
  <h2 class="h2_sub-heading">Post #${i + 1}<span>${result.title.rendered}</span></h2>
  ${result.content.rendered}
  </div>
`;
}

function renderRestOfPostsHtml(result, i) {
  restOfPosts.innerHTML += `
  <div class="post" >
  <h2 class="h2_sub-heading">Post #${i + 1}<span>${result.title.rendered}</span></h2>
  ${result.content.rendered}
  </div>
`;
}

modal.addEventListener("click", (event) => {
  if (event.target.matches(".modal")) {
    modal.style.display = "none";
  }
})

