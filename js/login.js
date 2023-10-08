import {BASE_URL_API} from "./configs/constant";

$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the username and password from the form
        var username = $("#username").val();
        var password = $("#password").val();

        // Create an object with the user's credentials
        var userData = {
            username: username,
            password: password
        };

        // Make an AJAX POST request to your API endpoint
        $.ajax({
            type: "POST",
            url: `${BASE_URL_API}/auth/login`,
            data: JSON.stringify(userData),
            contentType: "application/json",
            success: function(response) {
                // Handle the success response from the API here
                console.log("Login successful");
                console.log(response);
            },
            error: function(error) {
                // Handle any errors that occur during the API call
                console.error("Login failed");
                console.error(error);
            }
        });
    });
});