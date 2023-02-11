const searchButton = document.querySelector("#search-button");
const searchResult = document.querySelector(".search-result");

searchButton.onclick = () => {

  const searchBar = document.querySelector("#search-bar").value.trim();
  const categoriesUrl = baseUrl + `categories?search=${searchBar}`;
  const tagsUrl = baseUrl + `tags?search=${searchBar}`;
  const postsUrl = baseUrl + "posts?_embed&per_page=100&sticky=true";

  async function getData() {
    const responseTags = await fetch(tagsUrl);
    const resultsTags = await responseTags.json();

    for (let el of resultsTags) {

      const responsePosts = await fetch(postsUrl);
      const resultsPosts = await responsePosts.json();

      for (let resultsPost of resultsPosts) {
        const resultsPostTags = resultsPost.tags;
        for (let postTag of resultsPostTags) {
          if (el.id === postTag) {

            if (searchBar === "") {
              return null;
            } else {
              searchResult.style.display = "block";
              createHtml(resultsPost);
            }
          }
        }
      }
    }
  }
  getData();

  function createHtml(resultsPost) {
    searchResult.innerHTML += `
      <div class="search-post" onclick="location.href='../layout/details.html?id=${resultsPost.id}'">
        <p>${resultsPost.title.rendered}</p>
      </div>
    `;
  }

  searchResult.style.display = "block";

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-modal")) {
      searchResult.style.display = "none";
      searchResult.innerHTML = "";
    }
  })
}
