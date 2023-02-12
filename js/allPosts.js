const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const allPosts = baseUrl + "posts?_embed&per_page=100";
const firstPostsContainer = document.querySelector("#first-ten-posts");
const restOfPosts = document.querySelector("#rest-of-posts");
const btnShowMore = document.querySelector(".btn-all--posts");
const enlargedImgWrapper = document.createElement('div');
const body = document.querySelector("body");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

let flag = false;

async function getAllPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    for (let i = 0; i < 10; i++) {
      let result = results[i];

      const embeddedResult = result._embedded['wp:featuredmedia'];
      for (const mainImage of embeddedResult) {
        const mainImgSrc = mainImage.source_url;
        renderFirsPostsHtml(result, i, mainImgSrc, mainImage);
      }
    }

    btnShowMore.addEventListener("click", () => {
      flag = !flag;

      if (flag) {

        btnShowMore.innerText = "Show less";
        for (let i = 10; i < results.length; i++) {
          let result = results[i];

          const embeddedResult = result._embedded['wp:featuredmedia'];
          for (const mainImage of embeddedResult) {
            const mainImgSrc = mainImage.source_url;
            renderRestOfPostsHtml(result, i, mainImgSrc, mainImage);
          }
        }
      } else {
        restOfPosts.innerHTML = "";
        btnShowMore.innerText = "Show more";
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}
getAllPosts(allPosts);


function renderFirsPostsHtml(result, i, mainImgSrc, mainImage) {
  firstPostsContainer.innerHTML += `
  <div class="post" onclick="location.href='../layout/details.html?id=${result.id}'" title="Trip Blog || ${result.title.rendered}">
  <h2 class="h2_sub-heading"><span class="post-number">Post #${i + 1}</span><span class="post-title">${result.title.rendered}</span></h2>
  <div class="wrapper-img">
          <img src=${mainImgSrc} alt="${mainImage.alt_text}">
        </div>
  ${result.excerpt.rendered}
  <button><a href="../layout/details.html?id=${result.id}" class="btn btn-all-post">Read more</a></button>
  </div>
`;
}

function renderRestOfPostsHtml(result, i, mainImgSrc, mainImage) {
  restOfPosts.innerHTML += `
  <div class="post" onclick="location.href='../layout/details.html?id=${result.id}'" title="Trip Blog || ${result.title.rendered}">
  <h2 class="h2_sub-heading"><span class="post-number">Post #${i + 1}</span><span class="post-title">${result.title.rendered}</span></h2>
  <div class="wrapper-img">
          <img src=${mainImgSrc} alt="${mainImage.alt_text}">
        </div>
  ${result.excerpt.rendered}
  <button><a href="../layout/details.html?id=${result.id}" class="btn btn-all-post">Read more</a></button>
  </div>
`;
}


