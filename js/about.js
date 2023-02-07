const pageAboutUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/pages?slug=about";
// const pageUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/pages/";
const about = document.querySelector(".about");

async function getPageData() {
  try {
    const response = await fetch(pageAboutUrl);
    const results = await response.json();

    console.log(results);
    for (let result of results) {
      console.log(result);
      generateHtml(result);
    }
  }
  catch (error) {
    console.log(error);
  }

}

getPageData();

function generateHtml(result) {
  about.innerHTML = `${result.content.rendered}`;
}
