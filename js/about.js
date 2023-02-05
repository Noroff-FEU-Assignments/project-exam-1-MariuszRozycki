const pageUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/pages";
const about = document.querySelector(".about");

async function getData() {
  try {
    const response = await fetch(pageUrl);
    const results = await response.json();

    for (let result of results) {
      console.log(result);
      generateHtml(result);
    }
  }
  catch (error) {
    console.log(error);
  }

}

getData();

function generateHtml(result) {
  about.innerHTML = `${result.content.rendered}`;
}