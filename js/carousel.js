const baseUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/";
const pageHomeUrl = "https://mariuszrozycki.info/trip-blog/wp-json/wp/v2/pages?slug=home";
const allPosts = baseUrl + "posts?_embed&per_page=100&sticky=true";
const lastTwelvePosts = baseUrl + "posts?_embed&per_page=12&sticky=true";
const slidePost = document.querySelector(".slide-post");
const buttons = document.querySelectorAll("[data-slider-button]");
const prevBtn = document.querySelector("#previous-arrow");
const nextBtn = document.querySelector("#next-arrow");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

localStorage.removeItem("RECENT_POSTS");
let recentPosts = JSON.parse(localStorage.getItem("RECENT_POSTS")) || [];

async function getPageData() {
  try {
    const response = await fetch(pageHomeUrl);
    const results = await response.json();

    console.log(results);
    for (let result of results) {
      console.log(result);
    }
  }
  catch (error) {
    console.log(error);
  }
}
getPageData();

async function getLastPosts(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    recentPosts = results;
    localStorage.setItem("RECENT_POSTS", JSON.stringify(recentPosts));
    getDataFromLocalStorage();
  }

  catch (error) {
    console.log(error);
  }
}
getLastPosts(lastTwelvePosts);

function getDataFromLocalStorage() {
  let i;
  let number = 0;
  let indexOfPostsInSlider = 2;

  for (i = 0; i < recentPosts.length; i++) {
    const data = recentPosts[i];

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

    const embeddedResult = data._embedded['wp:featuredmedia'];
    for (const mainImage of embeddedResult) {
      const mainImgSrc = mainImage.source_url;

      renderSlider(i, data, mainImgSrc);
    }

    buttons.forEach(button => {
      button.addEventListener("click", (e) => {
        const offset = button.dataset.sliderButton === "next" ? 1 : -1;

        e.preventDefault();


        if (i === recentPosts.length - 1) {
          nextBtn.style.display = "none";
        }

        if (offset === 1) {
          // animateToRightExit();
          animateToRight();
          prevBtn.style.display = "flex";
          slidePost.innerHTML = "";
          ++number;
          renderDataInPosts();


        }

        if (offset === -1) {
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
          for (i = number; i < recentPosts.length; i++) {
            const data = recentPosts[i];


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
// getDataFromLocalStorage();

function renderSlider(i, data, mainImgSrc) {
  slidePost.innerHTML += `
      <div class="slide-post-details">
        <h3 class="h3_post-title--heading">${data.title.rendered}</h3>
        <div class="slide-wrapper--img">
          <img src=${mainImgSrc} alt="View over Budva">
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

// function removeAnimateToRightExit() {
//   return new Promise(() => {
//     setTimeout(() => {
//       slidePost.classList.remove("animate-to-right-exit");
//       nextBtn.disabled = false;
//     }, 1000);
//   });
// }

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

// async function animateToRightExit() {
//   slidePost.classList.add("animate-to-right-exit");
//   nextBtn.disabled = true;
//   const response = await removeAnimateToRightExit();
//   response;
// }

// nextBtn.onclick = (e) => {
//   e.preventDefault();
//   animateToRightExit();
// }