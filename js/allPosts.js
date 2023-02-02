const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const allPosts = baseUrl + "posts?_embed&per_page=100";
const allPostsContainer = document.querySelector(".all-posts-container");

async function getAllPosts() {

  try {
    const response = await fetch(allPosts);
    const results = await response.json();

    for (let result of results) {
      renderHtml(result);
    }
  }
  catch (err) {
    console.log(err);
  }
}

getAllPosts();

function renderHtml(result) {
  allPostsContainer.innerHTML += `
  <div class="post">
  <h2 class="h2_sub-heading">${result.title.rendered}</h2>
  ${result.content.rendered}
  </div>
`;
}