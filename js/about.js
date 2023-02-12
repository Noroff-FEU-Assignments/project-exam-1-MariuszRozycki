const pageAboutUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/pages?slug=about";

const about = document.querySelector(".about");

async function getPageData(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();

    for (let result of results) {
      generateHtml(result);
    }
  }

  catch (error) {
    about.innerHTML = displayError(error);
  }
}
getPageData(pageAboutUrl);

function generateHtml(result) {
  about.innerHTML = `${result.content.rendered}</div>`;
}
