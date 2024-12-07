$(document).ready(function () {
    $(".btn").click(function () {
        var name = $("#name").val().trim();
        var schoolYear = $("#school-year").val();
        var majors = $("#majors").val();
        var industries = $("#industries").val().trim();

        if (!name || !schoolYear || !majors || !industries) {
            alert("Please fill out all fields!");
            return;
        }

        var formData = {
            name: name,
            schoolYear: schoolYear,
            majors: majors,
            industries: industries,
        };

        $.ajax({
            url: "/create-student-profile",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                console.log("Server Response:", response);
                alert("Profile submitted successfully!");
            },
            error: function (xhr, status, error) {
                console.error("Error submitting profile:", error);
                alert("There was an error. Please try again.");
            },
        });
    });
});
