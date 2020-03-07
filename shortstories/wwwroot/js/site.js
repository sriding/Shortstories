// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Function to run functions on page load.
const pageLoadFunction = () => {
    //Home Page
    Home.getUsersData().then((data) => {
        console.log(data);
    })

    //Register Page
    Register.addFormEventListener();

    //Login Page
    Login.addFormEventListener();

    //Header Component
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

    //Story Page
    const storyInstance = new Story();
    document.getElementById("create-story-add-chapter-button").addEventListener("click", () => {
        let deleteChapterButton = storyInstance.generateNewChapterContainer();
        if (deleteChapterButton !== false && deleteChapterButton !== undefined) {
            deleteChapterButton.addEventListener("click", (e) => {
                storyInstance.deleteChapterContainer(e);
            })
        }
    })

    document.getElementById("create-story-chapter-check-yes").addEventListener("change", (e) => {
        if (e.target.checked === true) {
            storyInstance.displayChapterContent();
            document.getElementById("create-story-chapter-check-no").checked = false;
        } else {
            storyInstance.hideStoryAndChapterContent();
        }
    })

    document.getElementsByClassName("la-times-circle")[0].addEventListener("click", (e) => {
        storyInstance.deleteChapterContainer(e);
    })

    document.getElementById("create-story-chapter-check-no").addEventListener("change", (e) => {
        if (e.target.checked === true) {
            storyInstance.displayStoryContent();
            document.getElementById("create-story-chapter-check-yes").checked = false;
        } else {
            storyInstance.hideStoryAndChapterContent();
        }
    })

    document.getElementById("create-story-submit-button").addEventListener("click", () => {
        storyInstance.submitStory();
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