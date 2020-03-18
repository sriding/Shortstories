// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Function to run functions on page load.
const pageLoadFunction = () => {
    //Home Page
    const homeInstance = new Home();
    if (homeInstance.homePage !== null) {
        homeInstance.getStoriesByFollowers(window.localStorage.getItem("pid"), "home-follower-stories");
        homeInstance.getStoriesByFilter("New", "home-filter-stories");
        homeInstance.addAllDropdownButtonEventListeners();
    }
    //Register Page
    const registerInstance = new Register();
    registerInstance.addFormEventListener();
    registerInstance.changeChosenAvatar();

    //Login Page
    const loginInstance = new Login();
    loginInstance.addFormEventListener();

    //Header Component
    const headerInstance = new Header();
    headerInstance.checkAuthorizationState().then((username) => {
        if (username) {
            document.getElementsByClassName("header-unauthenticated")[0].style.display = "none";
            document.getElementById("header-username").innerHTML = username;
            document.getElementsByClassName("header-authenticated")[0].style.display = "block";
            headerInstance.logoutEventListener();
            headerInstance.setAvatar();
            headerInstance.setProfileLink();
        }
    }).catch((err) => {
        console.log(err);
    })

    const profileInstance = new Profile();
    if (profileInstance.profileViewId != null) {
        profileInstance.followButtonAddEventListeners();
        profileInstance.checkIfUserIsAFriend();
        homeInstance.getStoriesByProfile(document.getElementById("profile-username").innerHTML, "profile-stories");
    }

    //Story Page
    const storyInstance = new Story();

    //Profile Page
};