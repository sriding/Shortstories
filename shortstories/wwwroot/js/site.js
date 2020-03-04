// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Function to run functions on page load.
const pageLoadFunction = () => {
    Home.getUsersData().then((data) => {
        console.log(data);
    })
    Register.addFormEventListener();
    Login.addFormEventListener();

    const headerInstance = new Header();
    headerInstance.checkAuthorizationState().then((authStatus) => {
        if (authStatus) {
            document.getElementsByClassName("header-unauthenticated")[0].style.display = "none";
            document.getElementById("header-username").innerHTML = authStatus;
            document.getElementsByClassName("header-authenticated")[0].style.display = "block";
        }
    }).catch((err) => {
        console.log(err);
    })
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