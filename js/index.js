const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const allPosts = baseUrl + "posts?_embed&per_page=100&sticky=true"
const slidePost = document.querySelector(".slide-post");
const buttons = document.querySelectorAll("[data-slider-button]");
const prevBtn = document.querySelector("#previous-arrow");
const nextBtn = document.querySelector("#next-arrow");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getAllPosts() {
  let i;
  let number = 0;
  let indexOfPostsInSlider = 2;

  try {
    const response = await fetch(allPosts);
    const results = await response.json();

    for (i = 0; i < results.length; i++) {
      const result = results[i];
      console.log(result);

      if (window.innerWidth < 600) {
        if (i > number) {
          break;
        }
      }

      if (window.innerWidth >= 600) {
        if (i > number + indexOfPostsInSlider) {
          break;
        }
      }

      const embeddedResult = result._embedded['wp:featuredmedia'];
      for (const mainImage of embeddedResult) {
        const mainImgSrc = mainImage.source_url;

        renderSlider(i, result, mainImgSrc);
      }

      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const offset = button.dataset.sliderButton === "next" ? 1 : -1;

          animateToRight();

          if (i === results.length - 1) {
            nextBtn.style.display = "none";
          }

          if (offset === 1) {
            prevBtn.style.display = "flex";


            slidePost.innerHTML = "";
            ++number;
            renderDataInPosts();
          }

          if (offset === -1) {
            console.log(offset);
            animateToLeft();

            nextBtn.style.display = "flex";

            if (window.innerWidth < 600) {
              if (i <= 2) {
                prevBtn.style.display = "none";
              }
            }

            if (window.innerWidth >= 600) {
              if (i <= 4) {
                prevBtn.style.display = "none";
              }
            }

            slidePost.innerHTML = "";
            --number;

            renderDataInPosts();
          }

          /* function renderDataInPosts() */
          function renderDataInPosts() {
            for (i = number; i < results.length; i++) {
              const result = results[i];


              if (window.innerWidth < 600) {
                if (i > number) {
                  break;
                }
              }

              if (window.innerWidth >= 600) {
                if (i > number + indexOfPostsInSlider) {
                  break;
                }
              }

              const embeddedResult = result._embedded['wp:featuredmedia'];
              for (const mainImage of embeddedResult) {
                const mainImgSrc = mainImage.source_url;
                renderSlider(i, result, mainImgSrc);
              }
            }
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

function renderSlider(i, result, mainImgSrc) {
  slidePost.innerHTML += `
      <div class="slide-post-details">
        <h3 class="h3_post-title--heading">${result.title.rendered}</h3>
        <div class="slide-wrapper--img">
          <img src=${mainImgSrc} alt="View over Budva">
        </div>
        ${result.excerpt.rendered}
        <button><a href="../layout/details.html?id=${result.id}" class="btn btn-post-slide">Read more</a></button>
      </div>
    `;
}

function removeAnimateToRight() {
  return new Promise(() => {
    setTimeout(() => {
      slidePost.classList.remove("animate-to-right");
      nextBtn.disabled = false;
    }, 500);
  });
}

function removeAnimateToLeft() {
  return new Promise(() => {
    setTimeout(() => {
      slidePost.classList.remove("animate-to-left");
      nextBtn.disabled = false;
    }, 500);
  });
}


async function animateToRight() {
  slidePost.classList.add("animate-to-right");
  nextBtn.disabled = true;
  const response = await removeAnimateToRight();
  response;
}

async function animateToLeft() {
  slidePost.classList.add("animate-to-left");
  nextBtn.disabled = true;
  const response = await removeAnimateToLeft();
  response;
}

