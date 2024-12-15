document.addEventListener("DOMContentLoaded", function () {
  const studentButton = document.querySelector(".student");

  studentButton.addEventListener("click", function () {
    window.location.href = "/create-student-profile";
  });

  const alumButton = document.querySelector(".alum");

  alumButton.addEventListener("click", function () {
    window.location.href = "/create-alum-profile";
  });

  const loginButton = document.querySelector(".login");

  loginButton.addEventListener("click", function () {
    window.location.href = "/home";
  });
});
