const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const allPosts = baseUrl + "posts?_embed&per_page=100";
const slidePost = document.querySelector(".slide-post");
const buttons = document.querySelectorAll("[data-slider-button]");


async function getAllPosts() {
  try {
    const response = await fetch(allPosts);
    const results = await response.json();

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      const embeddedResult = result._embedded['wp:featuredmedia'];
      for (const mainImage of embeddedResult) {
        const mainImgSrc = mainImage.source_url;
        renderSlider(i, result, mainImgSrc);
      }
    }
  } catch (error) {
    console.log(error);
  }

}
getAllPosts();


function renderSlider(i, result, mainImgSrc) {
  if (i === 0) {
    slidePost.innerHTML += `
    <div class="slide-post-details" data-active>
      <h3 class="h3_post-title--heading">${result.title.rendered}</h3>
      <div class="slide-wrapper--img">
        <img src=${mainImgSrc} alt="View over Budva">
      </div>
      ${result.excerpt.rendered}
      <button class="btn btn-post-slide">Go to post</button>
    </div>
  `;
  } else {
    slidePost.innerHTML += `
    <div class="slide-post-details">
      <h3 class="h3_post-title--heading">${result.title.rendered}</h3>
      <div class="slide-wrapper--img">
        <img src=${mainImgSrc} alt="View over Budva">
      </div>
      ${result.excerpt.rendered}
      <button class="btn btn-post-slide">Go to post</button>
    </div>
  `;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const offset = button.dataset.sliderButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-slider]")
      .querySelector("[data-post]");

    const activeSlide = slides.querySelector("[data-active]");
    console.log(activeSlide);
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});














// for (let arrow of arrowNext) {
//   arrow.addEventListener('click', (e) => {
//     e.preventDefault();
//     sliderPost.classList.toggle("sliders-off");
//     sliderPost.nextElementSibling.classList.remove("sliders-off");
//     console.log(arrow);
//   });
// }


