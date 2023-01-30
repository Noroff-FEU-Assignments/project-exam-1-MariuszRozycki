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

    for (i = 0; i < results.length; i++) {
      const result = results[i];

      if (window.innerWidth < 600) {
        if (i > number) {
          break;
        }
      }

      if (window.innerWidth >= 600) {
        if (i > number + 2) {
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

          if (offset === 1) {

            if (i >= results.length) {
              return;
            }

            slidePost.innerHTML = "";
            ++number;

            for (i = number; i < results.length; i++) {
              const result = results[i];

              if (window.innerWidth < 600) {
                if (i > number) {
                  break;
                }
              }

              if (window.innerWidth >= 600) {
                if (i > number + 2) {
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

          if (offset === -1) {
            if (window.innerWidth < 600) {
              if (i <= 1) {
                return;
              }
            }

            if (window.innerWidth >= 600) {
              if (i <= 3) {
                return;
              }
            }

            slidePost.innerHTML = "";
            --number;

            for (i = number; i < results.length; i++) {
              const result = results[i];

              if (window.innerWidth < 600) {
                if (i > number) {
                  break;
                }
              }

              if (window.innerWidth >= 600) {
                if (i > number + 2) {
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
      <h1 style="color: white">${i}</h1>
        <h3 class="h3_post-title--heading">${result.title.rendered}</h3>
        <div class="slide-wrapper--img">
          <img src=${mainImgSrc} alt="View over Budva">
        </div>
        ${result.excerpt.rendered}
        <button class="btn btn-post-slide">Go to post</button>
      </div>
    `;
}











