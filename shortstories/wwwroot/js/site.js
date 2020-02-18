// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Function to run functions on page load.
const pageLoadFunction = () => {
    Home.getUsersData();
    Register.addFormEventListener();
    Login.addFormEventListener();
};

auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("user signs in, ", user);
        // ...
    } else {
        // User is signed out.
        // ...
        console.log("user signs out", user);
    }
});