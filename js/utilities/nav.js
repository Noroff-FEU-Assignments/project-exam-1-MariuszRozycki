const nav = document.querySelector(".nav-main");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const barOne = document.querySelector("#bar-one");
const barTwo = document.querySelector("#bar-two");
const barThree = document.querySelector("#bar-three");
const navMainList = document.querySelector(".nav-main__list");

hamburgerMenu.addEventListener('click', () => {
  barOne.classList.toggle("bar-one");
  barTwo.classList.toggle("bar-two");
  barThree.classList.toggle("bar-three");
  navMainList.classList.toggle("show");

  if (document.querySelector('[title="Trip Blog || Home Page"]')) {
    const sliderButtons = document.querySelectorAll(".slider-button");
    sliderButtons.forEach(button => button.classList.toggle("off"));
  }
});

navMainList.addEventListener("click", (event) => {
  if (
    event.target.matches("#hamburger-menu") ||
    event.target.matches(".nav-main__list")
  ) {
    barOne.classList.toggle("bar-one");
    barTwo.classList.toggle("bar-two");
    barThree.classList.toggle("bar-three");
    navMainList.classList.toggle("show");
  }
});



