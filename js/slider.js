const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const allPosts = baseUrl + "posts?_embed&per_page=100";
const slidePost = document.querySelector(".slide-post");
const buttons = document.querySelectorAll("[data-slider-button]");


async function getAllPosts() {
  let i;
  let number = 0;


  try {
    const response = await fetch(allPosts);
    const results = await response.json();

    for (i = number; i < results.length; i++) {
      const result = results[i];

      if (i > 0) {
        break;
      }

      const embeddedResult = result._embedded['wp:featuredmedia'];
      for (const mainImage of embeddedResult) {
        const mainImgSrc = mainImage.source_url;

        renderSlider(result, mainImgSrc);
      }

      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const offset = button.dataset.sliderButton === "next" ? 1 : -1;

          if (offset === 1) {

            ++number;

            for (i = number; i < results.length; i++) {
              const result = results[i];

              if (i > number) {
                break;
              }

              const embeddedResult = result._embedded['wp:featuredmedia'];
              for (const mainImage of embeddedResult) {
                const mainImgSrc = mainImage.source_url;
                slidePost.innerHTML = "";
                renderSlider(result, mainImgSrc);
              }
            }
          }

          if (offset === -1) {
            console.log("Offset -1 dziala");
            console.log(result);

          }

        });
      })
    }
  }

  catch (error) {
    console.log(error);
  }
}
getAllPosts();


function renderSlider(result, mainImgSrc) {
  if (window.innerWidth < 600) {
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

  if (window.innerWidth > 599) {
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






  // buttons.forEach(button => {
  //   button.addEventListener('click', () => {
  //     const offset = button.dataset.sliderButton === "next" ? 1 : -1;
  //     const slides = button
  //       .closest("[data-slider]")
  //       .querySelector("[data-post]");

  //     const activeSlide = slides.querySelector("[data-active]");
  //     console.log(activeSlide);
  //     let newIndex = [...slides.children].indexOf(activeSlide) + offset;
  //     if (newIndex < 0) newIndex = slides.children.length - 1;
  //     if (newIndex >= slides.children.length) newIndex = 0;

  //     slides.children[newIndex].dataset.active = true;
  //     delete activeSlide.dataset.active;
  //   });
  // });














// for (let arrow of arrowNext) {
//   arrow.addEventListener('click', (e) => {
//     e.preventDefault();
//     sliderPost.classList.toggle("sliders-off");
//     sliderPost.nextElementSibling.classList.remove("sliders-off");
//     console.log(arrow);
//   });
// }


