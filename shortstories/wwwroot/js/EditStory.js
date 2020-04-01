class EditStory {
    editStoryPage = null;
    //This probably could be implemented better rather than me having two different node clones.
    emptyStoryChapterContainerClone1 = null;
    emptyStoryChapterContainerClone2 = null;

    constructor() {
        this.editStoryPage = document.getElementById("edit-story-main-container") || null;
    }

    async getStoryDetails(storyId) {
        //Should be placed in a better spot - will fix later
        this.emptyStoryChapterContainerClone1 = document.getElementsByClassName("edit-story-chapter-container")[0].cloneNode(true);
        this.emptyStoryChapterContainerClone2 = document.getElementsByClassName("edit-story-chapter-container")[0].cloneNode(true);

        const storyStream = await fetch(window.location.origin + "/api/storymodels/" + storyId, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const story = await storyStream.json();

        if (storyStream.status !== 200 && story.errors) {
            let newElement = document.createElement("p");
            newElement.classList.add("edit-story-validation", "alert", "alert-danger");
            newElement.innerHTML = story.errors.toString();
            document.getElementById("edit-story-form").prepend(newElement);
        }

        this.preFillStoryTitle(story.StoryTitle);
        this.preFillStoryHeadline(story.StoryHeadline);

        if (story.StoryContent === "null" || story.StoryContent === "" || story.StoryContent === null) {
            const storyChaptersStream = await fetch(window.location.origin + "/api/storychaptersmodels/story/" + storyId, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const storyChapters = await storyChaptersStream.json();

            if (storyChaptersStream.status !== 200 && storyChapters.errors) {
                let newElement = document.createElement("p");
                newElement.classList.add("edit-story-validation", "alert", "alert-danger");
                newElement.innerHTML = storyChapters.errors.toString();
                document.getElementById("edit-story-form").prepend(newElement);
            }

            const chapterNumbers = [];
            const chapterTitles = [];
            const chapterContents = [];
            storyChapters.forEach((chapters) => {
                chapterNumbers.push(chapters.ChapterNumber);
                chapterTitles.push(chapters.ChapterTitle);
                chapterContents.push(chapters.ChapterContent);
            })

            this.preFillStoryChapterContentIfNecessary(chapterNumbers, chapterTitles, chapterContents);
            this.preSelectIfStoryContainsChapters();
            this.deleteChapterIconsAddEventListeners();
        } else {
            this.preFillStoryContentIfNecessary(story.StoryContent);
            this.preSelectIfStoryDoesNotContainChapters();
        }

        const genresStream = await fetch(window.location.origin + "/api/storygenresmodels/story/" + storyId, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const genres = await genresStream.json();

        if (genresStream.status !== 200 && genres.errors) {
            let newElement = document.createElement("p");
            newElement.classList.add("edit-story-validation", "alert", "alert-danger");
            newElement.innerHTML = genres.errors.toString();
            document.getElementById("edit-story-form").prepend(newElement);
        }

        this.preSelectStoryGenres(genres);

        const tagsStream = await fetch(window.location.origin + "/api/storytagsmodels/story/" + storyId, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const tags = await tagsStream.json();

        if (tagsStream.status !== 200 && tags.errors) {
            let newElement = document.createElement("p");
            newElement.classList.add("edit-story-validation", "alert", "alert-danger");
            newElement.innerHTML = tags.errors.toString();
            document.getElementById("edit-story-form").prepend(newElement);
        }

        this.preFillStoryTags(tags);
    }

    preFillStoryTitle(storyTitle) {
        document.getElementById("edit-story-title").value = storyTitle;
    }

    preFillStoryHeadline(storyHeadline) {
        document.getElementById("edit-story-headline").value = storyHeadline;
    }

    preFillStoryTags(storyTagsArray) {
        const storyTagsOnly = [];
        storyTagsArray.forEach((storyTags) => {
            storyTagsOnly.push(storyTags.StoryTag);
        })
        document.getElementById("edit-story-tags").value = storyTagsOnly.join(", ");
    }

    preSelectStoryGenres(storyGenresArray) {
        const storyGenresOnly = [];
        storyGenresArray.forEach((storyGenres) => {
            storyGenresOnly.push(storyGenres.StoryGenre);
        })
        Array.from(document.getElementsByClassName("edit-story-individual-genres")).forEach((genre) => {
            if (storyGenresOnly.includes(genre.value) === true) {
                genre.classList.add("btn-dark", "edit-story-individual-genres-selected");
                genre.classList.remove("btn-outline-dark");
            }
        })
    }

    preSelectIfStoryContainsChapters() {
        document.getElementById("edit-story-story-content-container").style.display = "none";
        this.addNewChapterButtonFunctionality();
        document.getElementById("edit-story-chapter-check-yes").checked = true;
        document.getElementById("edit-story-chapter-check-no").checked = false;
    }

    preSelectIfStoryDoesNotContainChapters() {
        this.addNewChapterButtonFunctionality();
        document.getElementById("edit-story-chapters-container").style.display = "none";
        document.getElementById("edit-story-add-chapter-button").style.display = "none";
        document.getElementById("edit-story-chapter-check-yes").checked = false;
        document.getElementById("edit-story-chapter-check-no").checked = true;
    }

    preFillStoryContentIfNecessary(storyContent) {
        document.getElementById("edit-story-story-content").value = storyContent;
    }

    preFillStoryChapterContentIfNecessary(chapterNumbersArray, chapterTitlesArray, chapterContentsArray) {
        chapterNumbersArray.forEach((number, index) => {
            if (index === 0) {
                document.getElementsByClassName("edit-story-chapter-title")[index].value = chapterTitlesArray[index];
                document.getElementsByClassName("edit-story-chapter-content")[index].value = chapterContentsArray[index];
            } else {
                document.getElementById("edit-story-chapters-container").append(this.emptyStoryChapterContainerClone1.cloneNode(true));
                document.getElementsByClassName("edit-story-chapter-title")[index].value = chapterTitlesArray[index];
                document.getElementsByClassName("edit-story-chapter-content")[index].value = chapterContentsArray[index];
            }
        })
    }

    updateSelectedGenresFunctionality() {
        Array.from(document.getElementsByClassName("edit-story-individual-genres")).forEach(genres => {
            genres.addEventListener("click", (e) => {
                let totalSelectedGenres = Array.from(document.getElementsByClassName("edit-story-individual-genres-selected")).length || 0;

                if (e.target.classList.contains("btn-dark") !== true && totalSelectedGenres < 3) {
                    e.target.classList.remove("btn-outline-dark");
                    e.target.classList.add("btn-dark", "edit-story-individual-genres-selected");
                } else {
                    e.target.classList.add("btn-outline-dark");
                    e.target.classList.remove("btn-dark", "edit-story-individual-genres-selected");
                }
            })
        })
    }

    switchingBetweenStoryAndChapterSelection() {
        const yesCheckbox = document.getElementById("edit-story-chapter-check-yes");
        const noCheckbox = document.getElementById("edit-story-chapter-check-no");

        yesCheckbox.addEventListener("change", (e) => {
            if (e.target.checked === true) {
                noCheckbox.checked = false;
                document.getElementById("edit-story-story-content-container").style.display = "none";
                document.getElementById("edit-story-chapters-container").style.display = "block";
                document.getElementById("edit-story-add-chapter-button").style.display = "block";
            } else {
                document.getElementById("edit-story-chapters-container").style.display = "none";
                document.getElementById("edit-story-add-chapter-button").style.display = "none";
            }
        })

        noCheckbox.addEventListener("change", (e) => {
            if (e.target.checked === true) {
                yesCheckbox.checked = false;
                document.getElementById("edit-story-story-content-container").style.display = "block";
                document.getElementById("edit-story-chapters-container").style.display = "none";
                document.getElementById("edit-story-add-chapter-button").style.display = "none";
            } else {
                document.getElementById("edit-story-story-content-container").style.display = "none";
            }
        })
    }

    addNewChapterButtonFunctionality() {
        document.getElementById("edit-story-add-chapter-button").addEventListener("click", () => {
            if (Array.from(document.getElementsByClassName("edit-story-chapter-container")).length < 3) {
                this.deleteChapterIconsRemoveEventListeners();
                document.getElementById("edit-story-chapters-container").append(this.emptyStoryChapterContainerClone2.cloneNode(true));
                this.deleteChapterIconsAddEventListeners();
            }
        })
    }

    deleteChapterIconsAddEventListeners() {
        Array.from(document.getElementsByClassName("la-times-circle")).forEach((circles, index) => {
            circles.addEventListener("click", (e) => {
                if (index !== 0) {
                    this.deleteChapterFunction(e);
                } else {
                    document.getElementsByClassName("edit-story-chapter-title")[0].value = "";
                    document.getElementsByClassName("edit-story-chapter-content")[0].value = "";
                }
            })
        })
    }

    deleteChapterIconsRemoveEventListeners() {
        Array.from(document.getElementsByClassName("la-times-circle")).forEach((circles) => {
            circles.removeEventListener("click", (e) => {
                this.deleteChapterFunction(e);
            })
        })
    }

    deleteChapterFunction(e) {
        e.target.removeEventListener("click", (e) => {
            this.deleteChapterFunction(e);
        })
        e.target.parentElement.remove();
    }

    //TODO: Page needs to reload once request is made successfully
    async updateStoryButtonFunctionality() {
        document.getElementById("edit-story-submit-button").addEventListener("click", async () => {
            const storyId = Number(document.getElementById("edit-story-id").value);
            const storyTitle = document.getElementById("edit-story-title").value;
            const storyHeadline = document.getElementById("edit-story-headline").value;
            const storyTagsArray = document.getElementById("edit-story-tags").value.split(",");
            const storyTagsArrayTrimmed = storyTagsArray.map((tags) => {
                return tags.trim();
            })
            const storyGenresElements = Array.from(document.getElementsByClassName("edit-story-individual-genres-selected"));
            const storyGenresArray = storyGenresElements.map((genres) => {
                return genres.value;
            })

            Array.from(document.getElementsByClassName("edit-story-validation")).forEach((elements) => {
                elements.innerHTML = "";
                elements.style.display = "none";
            })

            try {
                //If the story content container isn't hidden then...
                if (document.getElementById("edit-story-story-content-container").style.display !== "none") {
                    const storyContent = document.getElementById("edit-story-story-content").value;

                    await this.apiRequestForStory(storyId, storyTitle, storyHeadline, storyContent);
                    await this.apiRequestForStoryGenre(storyId, storyGenresArray);
                    await this.apiRequestForStoryTag(storyId, storyTagsArrayTrimmed);

                } else {
                    const chapterTitlesElements = Array.from(document.getElementsByClassName("edit-story-chapter-title"));
                    const chapterContentsElements = Array.from(document.getElementsByClassName("edit-story-chapter-content"));
                    const chapterNumbers = [];
                    chapterContentsElements.forEach((contents, index) => {
                        chapterNumbers.push(index + 1);
                    })

                    const chapterTitlesArray = chapterTitlesElements.map((titles) => {
                        return titles.value;
                    })
                    const chapterContentsArray = chapterContentsElements.map((contents) => {
                        return contents.value;
                    })

                    await this.apiRequestForStory(storyId, storyTitle, storyHeadline, null);
                    await this.apiRequestForStoryChapter(storyId, chapterNumbers, chapterTitlesArray, chapterContentsArray);
                    await this.apiRequestForStoryGenre(storyId, storyGenresArray);
                    await this.apiRequestForStoryTag(storyId, storyTagsArray);
                }
            } catch (error) {
                let newElement = document.createElement("p");
                newElement.classList.add("edit-story-validation", "alert", "alert-danger");
                newElement.innerHTML = error.toString();
                document.getElementById("edit-story-form").append(newElement);

                return null;
            }
        })
    }

    async apiRequestForStory(storyId, storyTitle, storyHeadline, storyContent = null) {
        if (storyContent === "") {
            document.getElementById("edit-story-validation-story-content").style.display = "inline-block";
            document.getElementById("edit-story-validation-story-content").innerHTML = "No story content.";
            return null;
        }

        const body = {
            "StoryTitle": storyTitle,
            "StoryHeadline": storyHeadline,
            "StoryContent": storyContent,
            "ProfileId": window.localStorage.getItem("pid")
        }

        try {
            const storyStream = await fetch(window.location.origin + "/api/storymodels/" + window.localStorage.getItem("uid") + "/" + storyId, {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t"),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const story = await storyStream.json();

            if (storyStream.status !== 200 && story.errors) {
                let count = 0;

                if (story.errors.StoryTitle) {
                    document.getElementById("edit-story-validation-title").style.display = "inline-block";
                    document.getElementById("edit-story-validation-title").innerHTML = story.errors.StoryTitle;
                    count++;
                }

                if (story.errors.StoryHeadline) {
                    document.getElementById("edit-story-validation-headline").style.display = "inline-block";
                    document.getElementById("edit-story-validation-headline").innerHTML = story.errors.StoryHeadline;
                    count++;
                }

                if (story.errors.StoryContent) {
                    document.getElementById("edit-story-validation-story-content").style.display = "inline-block";
                    document.getElementById("edit-story-validation-story-content").innerHTML = story.errors.StoryContent;
                    count++;
                }

                if (story.errors.ProfileId) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("edit-story-validation", "alert", "alert-danger");
                    newElement.innerHTML = story.errors.ProfileId;
                    document.getElementById("edit-story-form").append(newElement);
                    count++;
                }

                if (count === 0) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("edit-story-validation", "alert", "alert-danger");
                    newElement.innerHTML = story.errors.toString();
                    document.getElementById("edit-story-form").append(newElement);
                }

                count = 0;

                return null;
            }
        } catch (error) {
            let newElement = document.createElement("p");
            newElement.classList.add("edit-story-validation", "alert", "alert-danger");
            newElement.innerHTML = error.toString();
            document.getElementById("edit-story-form").append(newElement);

            return null;
        }
    }

    async apiRequestForStoryChapter(storyId, chapterNumbers, chaptertitles, chapterContents) {
        const body = chapterNumbers.map((numbers, index) => {
            return {
                "ChapterNumber": numbers,
                "ChapterTitle": chaptertitles[index],
                "ChapterContent": chapterContents[index],
                "StoryId": storyId
            }
        })
        try {
            const storyChapterStream = await fetch(window.location.origin + "/api/storychaptersmodels/" + window.localStorage.getItem("uid") + "/" + storyId, {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t"),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const storyChapter = await storyChapterStream.json();

            if (storyChapterStream.status !== 200 && storyChapter.errors) {
                let errorsArray = Object.values(storyChapter.errors);
                errorsArray.forEach((err) => {
                    let newElement = document.createElement("p");
                    newElement.classList.add("edit-story-validation", "alert", "alert-danger");
                    newElement.innerHTML = "One or more of the chapters has the following error/s: " + err;
                    document.getElementById("edit-story-chapters-container").append(newElement);
                })
                return null;
            }
        } catch (error) {
            let newElement = document.createElement("p");
            newElement.classList.add("edit-story-validation", "alert", "alert-danger");
            newElement.innerHTML = error.toString();
            document.getElementById("edit-story-form").append(newElement);

            return null;
        }
    }

    async apiRequestForStoryGenre(storyId, storyGenres) {
        const body = storyGenres.map((genre, index) => {
            return {
                "StoryGenre": genre,
                "StoryId": storyId
            }
        })

        try {
            const storyGenreStream = await fetch(window.location.origin + "/api/storygenresmodels/" + window.localStorage.getItem("uid") + "/" + storyId, {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t"),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const storyGenre = await storyGenreStream.json();

            if (storyGenreStream.status !== 200 && storyGenre.errors) {
                let count = 0;

                if (storyGenre.errors.StoryGenre) {
                    document.getElementById("edit-story-validation-genres").style.display = "inline-block";
                    document.getElementById("edit-story-validation-genres").innerHTML = storyGenre.errors.StoryGenre;
                    count++;
                }

                if (storyGenre.errors.StoryId) {
                    document.getElementById("edit-story-validation-genres").style.display = "inline-block";
                    document.getElementById("edit-story-validation-genres").innerHTML = storyGenre.errors.StoryId;
                    count++;
                }

                if (count === 0) {
                    document.getElementById("edit-story-validation-genres").style.display = "inline-block";
                    document.getElementById("edit-story-validation-genres").innerHTML = storyGenre.errors.toString();
                }

                count = 0;

                return null;
            }
        } catch (error) {
            let newElement = document.createElement("p");
            newElement.classList.add("edit-story-validation", "alert", "alert-danger");
            newElement.innerHTML = error.toString();
            document.getElementById("edit-story-form").append(newElement);

            return null;
        }
    }

    async apiRequestForStoryTag(storyId, storyTags) {
        const body = storyTags.map((tags, index) => {
            return {
                "StoryTag": tags.trim(),
                "StoryId": storyId
            }
        })

        try {
            const storyTagStream = await fetch(window.location.origin + "/api/storytagsmodels/" + window.localStorage.getItem("uid") + "/" + storyId, {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t"),
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const storyTag = await storyTagStream.json();

            if (storyTagStream.status !== 200 && storyTag.errors) {
                let count = 0;

                if (storyTag.errors.StoryTag) {
                    document.getElementById("edit-story-validation-tags").style.display = "inline-block";
                    document.getElementById("edit-story-validation-tags").innerHTML = storyTag.errors.StoryTag;
                    count++;
                }

                if (storyTag.errors.StoryId) {
                    document.getElementById("edit-story-validation-tags").style.display = "inline-block";
                    document.getElementById("edit-story-validation-tags").innerHTML = storyTag.errors.StoryId;
                    count++;
                }

                if (count === 0) {
                    document.getElementById("edit-story-validation-tags").style.display = "inline-block";
                    document.getElementById("edit-story-validation-tags").innerHTML = storyTag.errors.toString();
                }

                count = 0;

                return null;
            }

            //window.location.reload();
        } catch (error) {
            let newElement = document.createElement("p");
            newElement.classList.add("edit-story-validation", "alert", "alert-danger");
            newElement.innerHTML = error.toString();
            document.getElementById("edit-story-form").append(newElement);

            return null;
        }
    }
}