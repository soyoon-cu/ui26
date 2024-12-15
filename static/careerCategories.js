document.addEventListener("DOMContentLoaded", function () {
  const careerRedirects = {
    "Graduate Education": "/profile_list/graduate-education",
    Consulting: "/profile_list/consulting",
    Finance: "/profile_list/finance",
    Tech: "/profile_list/tech",
    "Public Sector": "/profile_list/public-sector",
  };

  const optionButtons = document.querySelectorAll(".btn.option");
  optionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent.trim();
      if (careerRedirects[buttonText]) {
        window.location.href = careerRedirects[buttonText];
      }
    });
  });

  const backButton = document.querySelector(".btn.back-btn");
  backButton.addEventListener("click", function () {
    window.location.href = "/home";
  });

  const settingsButton = document.querySelector(".btn.settings-btn");
  settingsButton.addEventListener("click", function () {
    window.location.href = "/profile_list/all";
  });
});
