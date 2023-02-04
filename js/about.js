const pageUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/pages";

async function getData() {
  const response = await fetch(pageUrl);
  const result = await response.json();

  console.log(result);
}

getData();