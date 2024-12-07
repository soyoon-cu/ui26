document.addEventListener("DOMContentLoaded", function () {
  const exploreCareerBox = document.querySelector(".box:nth-of-type(2)");

  exploreCareerBox.addEventListener("click", function () {
    window.location.href = "/career-categories";
  });

  const menuItems = document.querySelectorAll(".menu-item");

  const paths = ["/home", "/career-categories", "/sharing", "/contact-us"];

  menuItems.forEach((menuItem, index) => {
    menuItem.addEventListener("click", function () {
      window.location.href = paths[index];
    });
  });
});
