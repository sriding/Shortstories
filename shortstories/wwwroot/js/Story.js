class Story {
    onStoryPage = false;
    containerTemplate;
    storyContainer;
    chapterContainer;
    yesCheckBox;
    noCheckBox;
    submitContainer;

    constructor() {
        if (!document.getElementById("create-story-main-container")) {
            this.onStoryPage = false;
        } else {
            this.onStoryPage = true;
            this.containerTemplate = document.getElementsByClassName("create-story-chapter-container")[0].cloneNode(true);
            this.storyContainer = document.getElementById("create-story-story-content-container");
            this.chapterContainer = document.getElementById("create-story-chapters-container");
            this.yesCheckBox = document.getElementById("create-story-chapter-check-yes");
            this.noCheckBox = document.getElementById("create-story-chapter-check-no");
            this.submitContainer = document.getElementById("create-story-submit-container");
        }
    }

    displayStoryContent() {
        Array.from(document.getElementsByClassName("create-story-chapter-container")).forEach((containerElements) => {
            let child = containerElements.lastElementChild;
            while (child) {
                containerElements.removeChild(child);
                child = containerElements.lastElementChild;
            }
            containerElements.remove();
        })
        this.generateNewChapterContainer();
        this.storyContainer.style.display = "block";
        this.chapterContainer.style.display = "none";
        this.submitContainer.style.display = "block";
    }

    displayChapterContent() {
        document.getElementById("create-story-story-content").value = "";
        this.storyContainer.style.display = "none";
        this.chapterContainer.style.display = "block";
        this.submitContainer.style.display = "block";
    }

    hideStoryAndChapterContent() {
        Array.from(document.getElementsByClassName("create-story-chapter-container")).forEach((containerElements) => {
            let child = containerElements.lastElementChild;
            while (child) {
                containerElements.removeChild(child);
                child = containerElements.lastElementChild;
            }
            containerElements.remove();
        })
        this.generateNewChapterContainer();
        document.getElementById("create-story-story-content").value = "";
        this.storyContainer.style.display = "none";
        this.chapterContainer.style.display = "none";
        this.submitContainer.style.display = "none";
    }

    generateNewChapterContainer() {
        let chaptersContainer = document.getElementsByClassName("create-story-chapter-container");
        if (Array.from(chaptersContainer).length >= 3) {
            return false;
        } else {
            let copyOfChaptersContainer = this.containerTemplate.cloneNode(true);
            this.chapterContainer.insertBefore(copyOfChaptersContainer, document.getElementById("create-story-add-chapter-button"));
            return copyOfChaptersContainer.firstElementChild;
        }
    }

    deleteChapterContainer(e) {
        //TODO: Remove event listeners from delete button if necessary once element is deleted manually.
        //TODO: If only one chapter container exists, clear out the contents instead of removing it.
        if (Array.from(document.getElementsByClassName("create-story-chapter-container")).length === 1) {
            return;
        } else {
            let parentElement = e.target.parentElement;
            let child = parentElement.lastElementChild;
            while (child) {
                parentElement.removeChild(child);
                child = parentElement.lastElementChild;
            }
            parentElement.remove();
        }
    }

    async submitStory() {
        let storyTitleText = document.getElementById("create-story-title").value;
        let storyTagsText = document.getElementById("create-story-tags").value;
        let storyGenresText = document.getElementById("create-story-genres").value;
        let storyContentText = document.getElementById("create-story-story-content").value;
        let storyChapterTitleArray = Array.from(document.getElementsByClassName("create-story-chapter-title"));
        let storyChapterContentArray = Array.from(document.getElementsByClassName("create-story-chapter-content"));

        if (storyContentText == "") {
            try {
                const storyStream = await fetch("https://localhost:44389/api/storymodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryTitle": storyTitleText,
                        "StoryContent": null,
                        "ProfileId": window.localStorage.getItem("pid")
                    })
                })

                const storyId = await storyStream.json();

                const tagsRequest = await fetch("https://localhost:44389/api/storytagsmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryTag": storyTagsText,
                        "StoryId": storyId
                    })
                });

                const genreRequest = await fetch("https://localhost:44389/api/storygenresmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryGenre": storyGenresText,
                        "StoryId": storyId
                    })
                });

                //Either array should work fine for looping here. Just make sure to adjust content location in the body.
                storyChapterTitleArray.forEach(async (content, index) => {
                    let storyChaptersRequest = await fetch("https://localhost:44389/api/storychaptersmodels/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "ChapterNumber": index + 1,
                            "ChapterTitle": content.value,
                            "ChapterContent": storyChapterContentArray[index].value,
                            "StoryId": storyId
                        })
                    });
                });

                window.location.href = "https://localhost:44389/";
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const storyStream = await fetch("https://localhost:44389/api/storymodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryTitle": storyTitleText,
                        "StoryContent": storyContentText,
                        "ProfileId": window.localStorage.getItem("pid")
                    })
                })

                const storyId = await storyStream.json();

                const tagsRequest = await fetch("https://localhost:44389/api/storytagsmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryTag": storyTagsText,
                        "StoryId": storyId
                    })
                })

                const genresRequest = await fetch("https://localhost:44389/api/storygenresmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryGenre": storyGenresText,
                        "StoryId": storyId
                    })
                })

                window.location.href = "https://localhost:44389/";
            } catch (error) {
                console.log(error);
            } 

        }
    }

    showFirstStoryChapter() {
        //document.getElementsByClassName("display-story-content-container")[0].style.display = "block";
        document.getElementsByClassName("display-story-content-container")[0].classList.add("display-story-displayer");
    }

    displayPreviousChapter() {
        const chapterContainer = Array.from(document.getElementsByClassName("display-story-content-container"));
        for (let i = 0; i < chapterContainer.length; i++) {
            if (chapterContainer[i].classList.contains("display-story-displayer") && i !== 0) {
                chapterContainer[i].classList.remove("display-story-displayer");
                chapterContainer[i - 1].classList.add("display-story-displayer");
                break;
            }
        }
    }

    addFunctionalityDisplayPreviousChapter() {
        document.getElementsByClassName("la-caret-square-left")[0].addEventListener("click", () => {
            this.displayPreviousChapter();
        })
    }

    displayNextChapter() {
        const chapterContainer = Array.from(document.getElementsByClassName("display-story-content-container"));
        for (let i = 0; i < chapterContainer.length; i++) {
            if (chapterContainer[i].classList.contains("display-story-displayer") && i !== chapterContainer.length - 1) {
                chapterContainer[i].classList.remove("display-story-displayer");
                chapterContainer[i + 1].classList.add("display-story-displayer");
                break;
            }
        }
    }

    addFunctionalityDisplayNextChapter() {
        document.getElementsByClassName("la-caret-square-right")[0].addEventListener("click", () => {
            this.displayNextChapter();
        })
    }
}