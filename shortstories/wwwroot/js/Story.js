class Story {
    containerTemplate;
    storyContainer;
    chapterContainer;
    yesCheckBox;
    noCheckBox;
    submitContainer;

    constructor() {
        this.containerTemplate = document.getElementsByClassName("create-story-chapter-container")[0].cloneNode(true);
        this.storyContainer = document.getElementById("create-story-story-content-container");
        this.chapterContainer = document.getElementById("create-story-chapters-container");
        this.yesCheckBox = document.getElementById("create-story-chapter-check-yes");
        this.noCheckBox = document.getElementById("create-story-chapter-check-no");
        this.submitContainer = document.getElementById("create-story-submit-container");
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
                        "ProfileId": "ed3f02fc-7ce3-4bef-98c2-80d7b4f7ed86"
                    })
                })

                const storyId = await storyStream.json();

                fetch("https://localhost:44389/api/storytagsmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryTag": storyTagsText,
                        "StoryId": storyId
                    })
                });

                fetch("https://localhost:44389/api/storygenresmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryGenre": storyGenresText,
                        "StoryId": storyId
                    })
                });

                fetch("https://localhost:44389/api/storychaptersmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "ChapterNumber": 1,
                        "ChapterTitle": storyChapterTitleArray[0].value,
                        "ChapterContent": storyChapterContentArray[0].value,
                        "StoryId": storyId
                    })
                });
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
                        "ProfileId": "ed3f02fc-7ce3-4bef-98c2-80d7b4f7ed86"
                    })
                })

                const storyId = await storyStream.json();

                fetch("https://localhost:44389/api/storytagsmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryTag": storyTagsText,
                        "StoryId": storyId
                    })
                })

                fetch("https://localhost:44389/api/storygenresmodels/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "StoryGenre": storyGenresText,
                        "StoryId": storyId
                    })
                })
            } catch (error) {
                console.log(error);
            } 

        }
    }
}