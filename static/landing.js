document.addEventListener("DOMContentLoaded", function () {
  const studentButton = document.querySelector(".btn.student");

  studentButton.addEventListener("click", function () {
    window.location.href = "/create-student-profile";
  });

  const alumButton = document.querySelector(".btn.alum");

  alumButton.addEventListener("click", function () {
    window.location.href = "/create-alum-profile";
  });
});
