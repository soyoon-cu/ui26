// Helper: Get ID from URL
function getIdFromUrl() {
    return window.location.pathname.split("/").pop();
}

function collectFormData() {
    return {
        q1: $("#first-step").val(),
        q2: $("#cu-experience").val(),
        q3: $("#decisions").val(),
        q4: $("#field").val(),
        q5: $("#resources").val(),
        consent: $("#consent-checkbox").is(":checked")
    };
}

function fetchAlumniInfo(id, onSuccess, onError) {
    $.ajax({
        url: `/alumni_info/${id}`,
        method: "GET",
        success: onSuccess,
        error: onError
    });
}

function submitQuestionnaireData(id, combinedData, onSuccess, onError) {
    $.ajax({
        url: `/questionnaire/${id}`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(combinedData),
        success: onSuccess,
        error: onError
    });
}

$(document).ready(function () {
    $("#submit-btn").click(function () {
        const id = getIdFromUrl();
        const formData = collectFormData();

        fetchAlumniInfo(
            id,
            function (alumniInfo) {
                const combinedData = {
                    alumniId: id,
                    ...alumniInfo,
                    formData
                };

                submitQuestionnaireData(
                    id,
                    combinedData,
                    function () {
                        alert("Questionnaire submitted successfully!");
                    },
                    function () {
                        alert("Failed to submit the questionnaire. Please try again.");
                    }
                );
            },
            function () {
                alert("Failed to fetch alumni info. Please try again.");
            }
        );
    });
});
