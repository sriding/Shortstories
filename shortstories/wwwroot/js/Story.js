class Story {
    storyCreatePage = null;
    storyViewPage = null;
    containerTemplate = null;
    storyContainer = null;
    chapterContainer = null;
    yesCheckBox = null;
    noCheckBox = null;
    genreButtons = null;
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
            this.genreButtons = Array.from(document.getElementsByClassName("create-story-individual-genres"));
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

            this.genreButtons.forEach(genre => {
                genre.addEventListener("click", (e) => {
                    if (e.target.classList.contains("btn-outline-dark")) {
                        if (Array.from(document.getElementsByClassName("genre-button-selected")).length < 3) {
                            e.target.classList.remove("btn-outline-dark");
                            e.target.classList.add("btn-dark");
                            e.target.classList.add("genre-button-selected");
                        } else {}
                    } else {
                        e.target.classList.remove("btn-dark");
                        e.target.classList.remove("genre-button-selected");
                        e.target.classList.add("btn-outline-dark");
                    }
                })
            })

            this.lineAwesomeCircle.addEventListener("click", (e) => {
                this.deleteChapterContainer(e);
            })

            this.submitButton.addEventListener("click", () => {
                this.submitStory();
            })

            this.displayStoryAlert();
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

    displayStoryAlert() {
        const storyAlert = document.getElementById("create-story-alert");
        if (window.localStorage.getItem("uid") === null) {
            storyAlert.classList.remove("d-none");
            storyAlert.classList.add("d-inline-block");
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
        let storyTitleText = document.getElementById("create-story-title").value || null;
        let storyTitleHeadline = document.getElementById("create-story-headline").value || null;
        let storyTagsText = document.getElementById("create-story-tags").value || null;
        let storyGenresArray = Array.from(document.getElementsByClassName("genre-button-selected"));
        let storyContentText = document.getElementById("create-story-story-content");
        let storyChapterTitleArray = Array.from(document.getElementsByClassName("create-story-chapter-title"));
        let storyChapterContentArray = Array.from(document.getElementsByClassName("create-story-chapter-content"));

        Array.from(document.getElementsByClassName("create-story-validation")).forEach((elements) => {
            elements.innerHTML = "";
            elements.style.display = "none";
        })

        if (document.getElementById("create-story-story-content-container").style.display === "none") {
            try {
                const storyStream = await fetch(window.location.origin + "/api/storymodels/create", {
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

                if (storyStream.status !== 200 && storyId.errors) {
                    let count = 0;
                    if (storyId.errors.StoryModelId) {
                        let newElement = document.createElement("p");
                        newElement.classList.add("create-story-validation", "alert", "alert-danger");
                        newElement.innerHTML = storyId.errors.StoryModelId;
                        document.getElementById("create-story-form").append(newElement);
                        count++;
                    }

                    if (storyId.errors.StoryTitle) {
                        document.getElementById("create-story-validation-title").style.display = "inline-block";
                        document.getElementById("create-story-validation-title").innerHTML = storyId.errors.StoryTitle;
                        count++;
                    }

                    if (storyId.errors.StoryHeadline) {
                        document.getElementById("create-story-validation-headline").style.display = "inline-block";
                        document.getElementById("create-story-validation-headline").innerHTML = storyId.errors.StoryHeadline;
                        count++;
                    }

                    if (storyId.errors.StoryContent) {
                        document.getElementById("create-story-validation-story-content").style.display = "inline-block";
                        document.getElementById("create-story-validation-story-content").innerHTML = storyId.errors.StoryContent;
                        count++;
                    }

                    if (storyId.errors.ProfileId) {
                        let newElement = document.createElement("p");
                        newElement.classList.add("create-story-validation", "alert", "alert-danger");
                        newElement.innerHTML = storyId.errors.ProfileId;
                        document.getElementById("create-story-form").append(newElement);
                        count++;
                    }

                    if (count === 0) {
                        let newElement = document.createElement("p");
                        newElement.classList.add("create-story-validation", "alert", "alert-danger");
                        newElement.innerHTML = storyId.errors.toString();
                        document.getElementById("create-story-form").append(newElement);
                    }

                    count = 0;

                    return null;
                }

                //Split tag string into array of tags, and make a request per tag.
                if (storyTagsText !== null) {
                    const storyTagsTextArray = storyTagsText.split(",");
                    //Make sure to check length of array to assure 3 tags total.
                    await storyTagsTextArray.forEach(async (tag) => {
                        let tagsRequest = await fetch(window.location.origin + "/api/storytagsmodels/create", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "StoryTag": tag.trim(),
                                "StoryId": storyId
                            })
                        });

                        let tagsResponse = await tagsRequest.json();

                        if (tagsRequest.status !== 200 && tagsResponse.errors) {
                            let count = 0;

                            if (tagsResponse.errors.StoryTag) {
                                document.getElementById("create-story-validation-tags").style.display = "inline-block";
                                document.getElementById("create-story-validation-tags").innerHTML = tagsResponse.errors.StoryTag;
                                count++;
                            }

                            if (tagsResponse.errors.StoryId) {
                                let newElement = document.createElement("p");
                                newElement.classList.add("create-story-validation", "alert", "alert-danger");
                                newElement.innerHTML = tagsResponse.errors.StoryId;
                                document.getElementById("create-story-form").append(newElement);
                                count++;
                            }

                            if (count === 0) {
                                let newElement = document.createElement("p");
                                newElement.classList.add("create-story-validation", "alert", "alert-danger");
                                newElement.innerHTML = tagsResponse.errors.toString();
                                document.getElementById("create-story-form").append(newElement);
                            }

                            count = 0;

                            return null;
                        }
                    })
                }

                storyGenresArray.forEach(async (genre) => {
                    let genreRequest = await fetch(window.location.origin + "/api/storygenresmodels/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "StoryGenre": genre.value,
                            "StoryId": storyId
                        })
                    });

                    let genreResponse = await genreRequest.json();

                    if (genreRequest.status !== 200 && genreResponse.errors) {
                        let count = 0;

                        if (genreResponse.errors.StoryGenre) {
                            document.getElementById("create-story-validation-genres").style.display = "inline-block";
                            document.getElementById("create-story-validation-genres").innerHTML = genreResponse.errors.StoryGenre;
                            count++;
                        }

                        if (genreResponse.errors.StoryId) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = genreResponse.errors.StoryId;
                            document.getElementById("create-story-form").append(newElement);
                            count++;
                        }

                        if (count === 0) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = genreResponse.errors.toString();
                            document.getElementById("create-story-form").append(newElement);
                        }

                        count = 0;

                        return null;
                    }
                })

                //Either array should work fine for looping here. Just make sure to adjust content location in the body.
                storyChapterTitleArray.forEach(async (content, index) => {
                    let storyChaptersRequest = await fetch(window.location.origin + "/api/storychaptersmodels/create", {
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

                    let storyChaptersResponse = await storyChaptersRequest.json();

                    if (storyChaptersRequest.status !== 200 && storyChaptersResponse.errors) {
                        let count = 0;
                        if (storyChaptersResponse.errors.ChapterNumber) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = "One or more of the chapters has the following error/s: " + storyChaptersResponse.errors.ChapterNumber;
                            document.getElementById("create-story-chapters-container").append(newElement);
                            count++;
                        }

                        if (storyChaptersResponse.errors.ChapterTitle) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = "One or more of the chapters has the following error/s: " + storyChaptersResponse.errors.ChapterTitle;
                            document.getElementById("create-story-chapters-container").append(newElement);
                            count++;
                        }

                        if (storyChaptersResponse.errors.ChapterContent) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = "One or more of the chapters has the following error/s: " + storyChaptersResponse.errors.ChapterContent;
                            document.getElementById("create-story-chapters-container").append(newElement);
                            count++;
                        }

                        if (storyChaptersResponse.errors.StoryId) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = "One or more of the chapters has the following error/s: " + storyChaptersResponse.errors.StoryId;
                            document.getElementById("create-story-chapters-container").append(newElement);
                            count++;
                        }

                        if (count === 0) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = "One or more of the chapters has the following error/s: " + storyChaptersResponse.errors.toString();
                            document.getElementById("create-story-chapters-container").append(newElement);
                        }

                        count = 0;

                        return null;
                    }
                });

                window.location.href = "/";
            } catch (error) {
                let newElement = document.createElement("p");
                newElement.classList.add("create-story-validation", "alert", "alert-danger");
                newElement.innerHTML = error.toString();
                document.getElementById("create-story-form").append(newElement);
            }
        } else {
            if (storyContentText.value === "") {
                document.getElementById("create-story-validation-story-content").style.display = "inline-block";
                document.getElementById("create-story-validation-story-content").innerHTML = "No story content entered.";
                return null;
            }

            try {
                const storyStream = await fetch(window.location.origin + "/api/storymodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryTitle": storyTitleText,
                        "StoryHeadline": storyTitleHeadline,
                        "StoryContent": storyContentText.value,
                        "ProfileId": window.localStorage.getItem("pid")
                    })
                })

                const storyId = await storyStream.json();

                if (storyStream.status !== 200 && storyId.errors) {
                    let count = 0;
                    if (storyId.errors.StoryModelId) {
                        let newElement = document.createElement("p");
                        newElement.classList.add("create-story-validation", "alert", "alert-danger");
                        newElement.innerHTML = storyId.errors.StoryModelId;
                        document.getElementById("create-story-form").append(newElement);
                        count++;
                    }

                    if (storyId.errors.StoryTitle) {
                        document.getElementById("create-story-validation-title").style.display = "inline-block";
                        document.getElementById("create-story-validation-title").innerHTML = storyId.errors.StoryTitle;
                        count++;
                    }

                    if (storyId.errors.StoryHeadline) {
                        document.getElementById("create-story-validation-headline").style.display = "inline-block";
                        document.getElementById("create-story-validation-headline").innerHTML = storyId.errors.StoryHeadline;
                        count++;
                    }

                    if (storyId.errors.StoryContent) {
                        document.getElementById("create-story-validation-story-content").style.display = "inline-block";
                        document.getElementById("create-story-validation-story-content").innerHTML = storyId.errors.StoryContent;
                        count++;
                    }

                    if (storyId.errors.ProfileId) {
                        let newElement = document.createElement("p");
                        newElement.classList.add("create-story-validation", "alert", "alert-danger");
                        newElement.innerHTML = storyId.errors.ProfileId;
                        document.getElementById("create-story-form").append(newElement);
                        count++;
                    }

                    if (count === 0) {
                        let newElement = document.createElement("p");
                        newElement.classList.add("create-story-validation", "alert", "alert-danger");
                        newElement.innerHTML = storyId.errors.toString();
                        document.getElementById("create-story-form").append(newElement);
                    }

                    count = 0;

                    return null;
                }

                
                //Split tag string into array of tags, and make a request per tag.
                if (storyTagsText !== null) {
                    const storyTagsTextArray = storyTagsText.split(",");
                    //Make sure to check length of array to assure 3 tags total.
                    storyTagsTextArray.forEach(async (tag) => {
                        let tagsRequest = await fetch(window.location.origin + "/api/storytagsmodels/create", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "StoryTag": tag.trim(),
                                "StoryId": storyId
                            })
                        });

                        let tagsResponse = await tagsRequest.json();

                        if (tagsRequest.status !== 200 && tagsResponse.errors) {
                            let count = 0;

                            if (tagsResponse.errors.StoryTag) {
                                document.getElementById("create-story-validation-tags").style.display = "inline-block";
                                document.getElementById("create-story-validation-tags").innerHTML = tagsResponse.errors.StoryTag;
                                count++;
                            }

                            if (tagsResponse.errors.StoryId) {
                                let newElement = document.createElement("p");
                                newElement.classList.add("create-story-validation", "alert", "alert-danger");
                                newElement.innerHTML = tagsResponse.errors.StoryId;
                                document.getElementById("create-story-form").append(newElement);
                                count++;
                            }

                            if (count === 0) {
                                let newElement = document.createElement("p");
                                newElement.classList.add("create-story-validation", "alert", "alert-danger");
                                newElement.innerHTML = tagsResponse.errors.toString();
                                document.getElementById("create-story-form").append(newElement);
                            }

                            count = 0;

                            return null;
                        }
                    })
                }

                storyGenresArray.forEach(async (genre) => {
                    let genreRequest = await fetch(window.location.origin + "/api/storygenresmodels/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "StoryGenre": genre.value,
                            "StoryId": storyId
                        })
                    });

                    let genreResponse = await genreRequest.json();

                    if (genreRequest.status !== 200 && genreResponse.errors) {
                        let count = 0;

                        if (genreResponse.errors.StoryGenre) {
                            document.getElementById("create-story-validation-genres").style.display = "inline-block";
                            document.getElementById("create-story-validation-genres").innerHTML = genreResponse.errors.StoryGenre;
                            count++;
                        }

                        if (genreResponse.errors.StoryId) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = genreResponse.errors.StoryId;
                            document.getElementById("create-story-form").append(newElement);
                            count++;
                        }

                        if (count === 0) {
                            let newElement = document.createElement("p");
                            newElement.classList.add("create-story-validation", "alert", "alert-danger");
                            newElement.innerHTML = genreResponse.errors.toString();
                            document.getElementById("create-story-form").append(newElement);
                        }

                        count = 0;

                        return null;
                    }
                })

                window.location.href = "/";
            } catch (error) {
                let newElement = document.createElement("p");
                newElement.classList.add("create-story-validation", "alert", "alert-danger");
                newElement.innerHTML = error.toString();
                document.getElementById("create-story-form").append(newElement);

                return null;
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
        document.getElementsByClassName("la-caret-square-right")[0].addEventListener("keydown", (e) => {
        }, false)
        document.getElementsByClassName("la-caret-square-right")[0].addEventListener("click", () => {
            this.displayNextChapter();
        })
    }
}

export default Story;