const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const pageHomeUrl = baseUrl + "pages?slug=home";
const allPosts = baseUrl + "posts?_embed&per_page=100&sticky=true";
const lastTwelvePosts = baseUrl + "posts?_embed&per_page=12&sticky=true";
const homePageWrapper = document.querySelector(".home-page--wrapper");
const slidePost = document.querySelector(".slide-post");
const buttons = document.querySelectorAll("[data-slider-button]");
const prevBtn = document.querySelector(".previous-arrow");
const nextBtn = document.querySelector(".next-arrow");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/* First part of HOME website function getPageData */
async function getPageData(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();

    for (let result of results) {
      renderPageHtml(result);
    }
  }
  catch (error) {
    displayError(error);
  }
}
getPageData(pageHomeUrl);

function renderPageHtml(result) {
  homePageWrapper.innerHTML = `
  ${result.content.rendered}
  `;
}

/* Second part of HOME website function getLastPosts - twelve posts */
async function getLastPosts(url) {
  let i;
  let number = 0;
  let indexOfPostsInSlider = 2;

  try {
    const response = await fetch(url);
    const results = await response.json();

    slidePost.innerHTML = "";

    for (i = 0; i < results.length; i++) {
      const data = results[i];

      if (window.innerWidth < 470) {
        if (i > number) {
          break;
        }
      }

      if (window.innerWidth > 469 && window.innerWidth < 600) {
        if (i > number + 1) {
          break;
        }
      }

      if (window.innerWidth >= 600) {
        if (i > number + indexOfPostsInSlider) {
          break;
        }
      }

      const embeddedResult = data._embedded['wp:featuredmedia'];

      for (const mainImage of embeddedResult) {
        const mainImgSrc = mainImage.source_url;
        console.log(mainImage);
        renderSlider(i, data, mainImgSrc);
      }

      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const offset = button.dataset.sliderButton === "next" ? 1 : -1;
          if (i === results.length - 1) {

            nextBtn.style.display = "none";
          }

          if (offset === 1) {
            animateToRight();
            prevBtn.style.display = "flex";
            slidePost.innerHTML = "";
            ++number;
            renderDataInPosts();
          }

          if (offset === -1) {
            animateToLeft();
            nextBtn.style.display = "flex";

            if (window.innerWidth < 470) {
              if (i <= 2) {
                prevBtn.style.display = "none";
              }
            }

            if (window.innerWidth >= 470 && window.innerWidth <= 600) {
              if (i <= 3) {
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
              const data = results[i];
              if (window.innerWidth < 470) {
                if (i > number) {
                  break;
                }
              }

              if (window.innerWidth > 469 && window.innerWidth < 600) {
                if (i > number + 1) {
                  break;
                }
              }

              if (window.innerWidth >= 600) {
                if (i > number + indexOfPostsInSlider) {
                  break;
                }
              }

              const embeddedResult = data._embedded['wp:featuredmedia'];

              for (const mainImage of embeddedResult) {
                const mainImgSrc = mainImage.source_url;
                renderSlider(i, data, mainImgSrc);
              }
            }
          }
        });
      })
    }
  }

  catch (error) {
    displayError(error);
  }
}
getLastPosts(lastTwelvePosts);

function renderSlider(i, data, mainImgSrc) {
  slidePost.innerHTML += `
      <div class="slide-post-details" onclick="location.href='../layout/details.html?id=${data.id}'">
        <h3 class="h3_post-title--heading">${data.title.rendered}</h3>
        <div class="slide-wrapper--img">
          <img src=${mainImgSrc} alt="${mainImgSrc.alt_text}">
        </div>
        ${data.excerpt.rendered}
        <button><a href="../layout/details.html?id=${data.id}" class="btn btn-post-slide">Read more</a></button>
      </div>
    `;
}

function removeAnimateToRight() {
  return new Promise(() => {
    setTimeout(() => {
      slidePost.classList.remove("animate-to-right");
      nextBtn.disabled = false;
    }, 1000);
  });
}

function removeAnimateToLeft() {
  return new Promise(() => {
    setTimeout(() => {
      slidePost.classList.remove("animate-to-left");
      prevBtn.disabled = false;
    }, 1000);
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
  prevBtn.disabled = true;
  const response = await removeAnimateToLeft();
  response;
}