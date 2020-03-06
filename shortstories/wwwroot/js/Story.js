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
        this.storyContainer.style.display = "block";
        this.chapterContainer.style.display = "none";
        this.submitContainer.style.display = "block";
    }

    displayChapterContent() {
        this.storyContainer.style.display = "none";
        this.chapterContainer.style.display = "block";
        this.submitContainer.style.display = "block";
    }

    hideStoryAndChapterContent() {
        this.storyContainer.style.display = "none";
        this.chapterContainer.style.display = "none";
        this.submitContainer.style.display = "none";
    }

    generateNewChapterContainer() {
        let chaptersContainer = document.getElementsByClassName("create-story-chapter-container");
        if (Array.from(chaptersContainer).length >= 3) {
            return;
        } else {
            let copyOfChaptersContainer = this.containerTemplate.cloneNode(true);
            this.chapterContainer.insertBefore(copyOfChaptersContainer, document.getElementById("create-story-add-chapter-button"));
        }
    }
}