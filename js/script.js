const navMain = document.querySelector(".nav-main");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const barOne = document.querySelector("#bar-one");
const barTwo = document.querySelector("#bar-two");
const barThree = document.querySelector("#bar-three");
const navMainList = document.querySelector("#main-nav__list");
const titleHome = document.querySelector('title').innerText === "Trip Blog || Home Page";
const titleAbout = document.querySelector('title').innerText === "Trip Blog || About";
const titleAllPosts = document.querySelector('title').innerText === "Trip Blog || All Posts";
const titleContact = document.querySelector('title').innerText === "Trip Blog || Contact";
let flag = true;


hamburgerMenu.addEventListener('click', () => {
  flag = !flag;

  barOne.classList.toggle("bar-one");
  barTwo.classList.toggle("bar-two");
  barThree.classList.toggle("bar-three");
  navMain.classList.toggle("nav-main__on");


  renderNavHtml(flag);
});


function renderNavHtml() {
  if (!flag) {
    navMainList.classList.add("main-nav__list__on");
    navMainList.innerHTML = `
    <li><a class="main-nav__list__item home" href="../index.html" title="Trip Blog || Home Page">Home</a></li>
    <li><a class="main-nav__list__item about" href="../layout/about.html" title="Trip Blog || About">About</a></li>
    <li><a class="main-nav__list__item all-posts" href="../layout/all-posts.html" title="Trip Blog || All Posts">All Posts</a></li>
    <li><a class="main-nav__list__item contact" href="../layout/contact.html" title="Trip Blog || Contact">Contact</a></li>
  `;

    const listItems = document.querySelectorAll(".main-nav__list__item");

    if (titleHome) for (let item of listItems) if (item.classList.contains("home")) item.classList.add("highlight");
    if (titleAbout) for (let item of listItems) if (item.classList.contains("about")) item.classList.add("highlight");
    if (titleAllPosts) for (let item of listItems) if (item.classList.contains("all-posts")) item.classList.add("highlight");
    if (titleContact) for (let item of listItems) if (item.classList.contains("contact")) item.classList.add("highlight");

    const mainNavListItem = document.querySelectorAll(".main-nav__list__item");
    for (let item of mainNavListItem) {
      item.addEventListener('click', () => {
        barOne.classList.remove("bar-one");
        barTwo.classList.remove("bar-two");
        barThree.classList.remove("bar-three");
        location.href = href;
      });
    }
  } else {
    navMainList.classList.remove("main-nav__list__on");
    navMainList.innerHTML = "";
  }


}










