﻿class Story {
    storyCreatePage = null;
    storyViewPage = null;
    containerTemplate = null;
    storyContainer = null;
    chapterContainer = null;
    yesCheckBox = null;
    noCheckBox = null;
    submitButton = null;
    submitContainer = null;
    addChapterButton = null;
    lineAwesomeCircle = null;
    displayStoryChapterContentContainer = null;

    constructor() {
        this.storyCreatePage = document.getElementById("create-story-main-container") || null;
        this.storyViewPage = document.getElementById("story-view-page") || null;

        //If the user is on the create story page
        if (this.storyCreatePage !== null) {
            this.containerTemplate = document.getElementsByClassName("create-story-chapter-container")[0].cloneNode(true) || null;
            this.storyContainer = document.getElementById("create-story-story-content-container") || null;
            this.chapterContainer = document.getElementById("create-story-chapters-container") || null;
            this.yesCheckBox = document.getElementById("create-story-chapter-check-yes") || null;
            this.noCheckBox = document.getElementById("create-story-chapter-check-no") || null;
            this.submitButton = document.getElementById("create-story-submit-button") || null;
            this.submitContainer = document.getElementById("create-story-submit-container") || null;
            this.addChapterButton = document.getElementById("create-story-add-chapter-button") || null;
            this.lineAwesomeCircle = document.getElementsByClassName("la-times-circle")[0] || null;

            this.addChapterButton.addEventListener("click", () => {
                let deleteChapterButton = this.generateNewChapterContainer();
                if (deleteChapterButton !== false && deleteChapterButton !== undefined) {
                    deleteChapterButton.addEventListener("click", (e) => {
                        this.deleteChapterContainer(e);
                    })
                }
            })

            this.yesCheckBox.addEventListener("change", (e) => {
                if (e.target.checked === true) {
                    this.displayChapterContent();
                    this.noCheckBox.checked = false;
                } else {
                    this.hideStoryAndChapterContent();
                }
            })

            this.noCheckBox.addEventListener("change", (e) => {
                if (e.target.checked === true) {
                    this.displayStoryContent();
                    this.yesCheckBox.checked = false;
                } else {
                    this.hideStoryAndChapterContent();
                }
            })

            this.lineAwesomeCircle.addEventListener("click", (e) => {
                this.deleteChapterContainer(e);
            })

            this.submitButton.addEventListener("click", () => {
                this.submitStory();
            })
        }

        //If the user is on the viewing story page
        if (this.storyViewPage !== null) {
            this.displayStoryChapterContentContainer = document.getElementsByClassName("display-story-chapter-content-container");
            if (this.displayStoryChapterContentContainer[0] !== undefined) {
                this.showFirstStoryChapter();
                this.addFunctionalityDisplayNextChapter();
                this.addFunctionalityDisplayPreviousChapter();
            }
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
        let storyTitleHeadline = document.getElementById("create-story-headline").value;
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
                        "StoryHeadline": storyTitleHeadline,
                        "StoryContent": null,
                        "ProfileId": window.localStorage.getItem("pid")
                    })
                })

                const storyId = await storyStream.json();



                //Split tag string into array of tags, and make a request per tag.
                const storyTagsTextArray = storyTagsText.split(",");
                console.log(storyTagsTextArray);
                //Make sure to check length of array to assure 3 tags total.
                storyTagsTextArray.forEach(async (tag) => {
                    let tagsRequest = await fetch("https://localhost:44389/api/storytagsmodels/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "StoryTag": tag.trim(),
                            "StoryId": storyId
                        })
                    });
                })

                const storyGenresTextArray = storyGenresText.split(",");
                storyGenresTextArray.forEach(async (genre) => {
                    let genreRequest = await fetch("https://localhost:44389/api/storygenresmodels/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "StoryGenre": genre.trim(),
                            "StoryId": storyId
                        })
                    });
                })

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
                        "StoryHeadline": storyTitleHeadline,
                        "StoryContent": storyContentText,
                        "ProfileId": window.localStorage.getItem("pid")
                    })
                })

                const storyId = await storyStream.json();

                
                //Split tag string into array of tags, and make a request per tag.
                const storyTagsTextArray = storyTagsText.split(",");
                console.log(storyTagsTextArray);
                //Make sure to check length of array to assure 3 tags total.
                storyTagsTextArray.forEach(async (tag) => {
                    let tagsRequest = await fetch("https://localhost:44389/api/storytagsmodels/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "StoryTag": tag.trim(),
                            "StoryId": storyId
                        })
                    });
                })

                const storyGenresTextArray = storyGenresText.split(",");
                storyGenresTextArray.forEach(async (genre) => {
                    let genreRequest = await fetch("https://localhost:44389/api/storygenresmodels/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "StoryGenre": genre.trim(),
                            "StoryId": storyId
                        })
                    });
                })

                window.location.href = "https://localhost:44389/";
            } catch (error) {
                console.log(error);
            } 

        }
    }

    showFirstStoryChapter() {
        this.displayStoryChapterContentContainer[0].classList.add("display-story-displayer");
    }

    displayPreviousChapter() {
        const chapterContainer = Array.from(this.displayStoryChapterContentContainer);
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
        const chapterContainer = Array.from(this.displayStoryChapterContentContainer);
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