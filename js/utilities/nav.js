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
});