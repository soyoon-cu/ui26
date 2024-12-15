document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("back-btn");

    backButton.addEventListener("click", function () {
        window.location.href = "/profile_list/all";
    });
});

function getIdFromUrl() {
    return window.location.pathname.split("/").pop();
}

function fetchQuestionnaireData(id, onSuccess, onError) {
    $.ajax({
        url: `/questionnaire_data/${id}`,
        method: "GET",
        success: onSuccess,
        error: onError
    });
}

function populateQuestionnaireData(data) {
    if (data && data.formData) {
        window.questionnaireData = data;

        $(".tab-content").html(`<p>${data.formData.q1}</p>`);

        $("h1").text(data.name);
        $(".box1 p").text(`Working Area: ${data.working_area}`);
        $(".box4 p").text(data.contact_info.email);
    } else {
        $(".tab-content").html("<p>No data available for this ID.</p>");
    }
}


function setupTabSwitching() {
    $(".tab").on("click", function () {
        const tabKey = $(this).data("tab");
        const formData = window.questionnaireData?.formData || {};

        const tabContentMap = {
            "first-steps": formData.q1,
            "cu-experience": formData.q2,
            "career-path": formData.q3,
            "field-interest": formData.q4,
            "resources": formData.q5
        };

        $(".tab").removeClass("active");
        $(this).addClass("active");

        const content = tabContentMap[tabKey] || "Content not found.";
        $(".tab-content").html(`<p>${content}</p>`);
    });
}

$(document).ready(function () {
    const id = getIdFromUrl();
    fetchQuestionnaireData(
        id,
        function (data) {
            populateQuestionnaireData(data);
            setupTabSwitching();
        },
        function () {
            $(".tab-content").html("<p>Failed to load questionnaire data.</p>");
        }
    );
    const videoUploadInput = document.getElementById("videoUpload");
    const videoPlayer = document.getElementById("videoPlayer");

    videoUploadInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            videoPlayer.src = videoURL;
            videoPlayer.play();
        } else {
            alert("No video file selected.");
        }
    });
});
