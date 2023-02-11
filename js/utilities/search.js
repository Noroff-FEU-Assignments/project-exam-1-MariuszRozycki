const searchButton = document.querySelector("#search-button");
const searchResult = document.querySelector(".search-result");
const searchBar = document.querySelector("#search-bar");


searchButton.addEventListener("click", search);

function search() {
  const searchBarValue = document.querySelector("#search-bar").value.trim();
  const tagsUrl = baseUrl + `tags?search=${searchBarValue}`;
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

            if (searchBarValue === "") {
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


searchBar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});

document.onkeydown = function (event) {
  if (event.key == "Escape") {
    searchResult.style.display = "none";
    searchResult.innerHTML = "";
  }
};
