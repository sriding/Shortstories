// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//Function to run functions on page load.
const pageLoadFunction = () => {
    //Home Page

    //Register Page
    const registerInstance = new Register();
    registerInstance.addFormEventListener();

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

    //Story Page
    const storyInstance = new Story();
    storyInstance.showFirstStoryChapter();
    storyInstance.addFunctionalityDisplayPreviousChapter();
    storyInstance.addFunctionalityDisplayNextChapter();

    if (storyInstance.onStoryPage === true) {
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
    }

    //Profile Page
    const profileInstance = new Profile();
    profileInstance.followButtonAddEventListeners();
};