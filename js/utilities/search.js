const searchUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const searchButton = document.querySelector("#search-button");
const searchResult = document.querySelector(".search-result");
const searchBar = document.querySelector("#search-bar");
const searchContainer = document.querySelector(".search");

searchButton.addEventListener("click", search);

function search() {
  const searchBarValue = document.querySelector("#search-bar").value.trim();
  const tagsUrl = searchUrl + `tags?search=${searchBarValue}`;
  const postsUrl = searchUrl + "posts?_embed&per_page=100&sticky=true";

  async function getData(url) {
    searchResult.innerHTML = "";

    try {
      const responseTags = await fetch(url);
      const resultsTags = await responseTags.json();

      for (let el of resultsTags) {
        try {
          const responsePosts = await fetch(postsUrl);
          const resultsPosts = await responsePosts.json();

          for (let resultsPost of resultsPosts) {
            const resultsPostTags = resultsPost.tags;

            for (let postTag of resultsPostTags) {
              if (el.id === postTag) {

                if (searchBarValue === "") {
                  return null;
                }

                else {
                  searchResult.style.display = "block";
                  createHtml(resultsPost);
                }
              }
            }
          }
        }
        catch (error) {
          searchContainer.innerHTML = displayError(error);
        }
      }
    }
    catch (error) {
      searchContainer.innerHTML = displayError(error);
    }
  }
  getData(tagsUrl);

  function createHtml(resultsPost) {
    searchResult.innerHTML += `
      <div class="search-post" onclick="location.href='../layout/details.html?id=${resultsPost.id}'">
        <p>${resultsPost.title.rendered}</p>
      </div>
    `;
  }

  searchResult.style.display = "block";

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-modal")) {
      searchResult.style.display = "none";
      searchResult.innerHTML = "";
    }
  });
}


document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search();
  }

  if (event.key == "Escape" || event.key == "Backspace") {
    searchResult.style.display = "none";
    searchResult.innerHTML = "";
  }
});

