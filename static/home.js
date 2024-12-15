document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-item");
  const menuLinks = {
    "🏠 Home": "/home",
    "💼 Careers": "/career-categories",
    "🔄 Sharing": "/questionnaire/1",
    "📞 Contact Us": "/contact-us",
  };

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", function () {
      const menuText = menuItem.textContent.trim();
      const targetUrl = menuLinks[menuText];
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });
  });

  const boxes = document.querySelectorAll(".box");
  const boxLinks = [
    "/questionnaire/1",
    "/career-categories",
  ];

  boxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      const targetUrl = boxLinks[index];
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    });
  });
});
