class Home {
    homePage = null;

    constructor() {
        this.homePage = document.getElementById("home-page") || null;
    }

    addAllDropdownButtonEventListeners() {
        Array.from(document.getElementsByClassName("dropdown-item")).forEach((element) => {
            element.addEventListener("click", () => {
                document.getElementById("home-filter-stories").innerHTML = "";
                document.getElementById("dropdownMenuButton").innerHTML = element.innerHTML;
                this.getStoriesByFilter(element.innerHTML, "home-filter-stories");
            })
        })
    }

    async getStoriesByFilter(filterText, elementId) {
        try {
            const storiesStream = await fetch("https://localhost:44389/api/storymodels/filter/" + filterText, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const stories = await storiesStream.json();

            this.createStoryContainersGeneral(stories, elementId);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async getStoriesByFollowers(profileId, elementId) {
        try {
            const storiesStream = await fetch("https://localhost:44389/api/storymodels/filter/followers/" + profileId, {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("t")
                }
            })

            const stories = await storiesStream.json();

            this.createStoryContainersFollowers(stories, elementId);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async getStoriesByProfile(profileUsername, elementId) {
        try {
            const storiesStream = await fetch("https://localhost:44389/api/storymodels/filter/profile/" + profileUsername, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const stories = await storiesStream.json();

            this.createStoryContainersGeneral(stories, elementId);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    createStoryContainersGeneral(stories, elementId) {
        if (stories.stories.length === 0) {
            document.getElementById(elementId).innerHTML = "No stories for this filter.";
            return;
        }

        stories.stories.forEach((story, index) => {
            let linkWrapper = document.createElement("a");
            let divContainer = document.createElement("div");
            let title = document.createElement("h3");
            let headline = document.createElement("p");
            let genreContainer = document.createElement("div");

            linkWrapper.classList.add("d-inline-block", "home-link-container");
            divContainer.classList.add("shadow-sm", "position-relative", "m-3", "p-4", "home-main-container");
            title.classList.add("text-left");
            headline.classList.add("mt-3", "mb-3", "text-left");
            genreContainer.classList.add("d-flex", "position-absolute", "home-genre-container");

            stories.genres[index].forEach((genre) => {
                let genreElement = document.createElement("p");
                genreElement.classList.add("text-muted", "border", "pt-1", "pb-1", "pr-2", "pl-2", "mr-1", "home-genre-text");
                genreElement.innerHTML = genre.StoryGenre;
                genreContainer.append(genreElement);
            })

            linkWrapper.href = "https://localhost:44389/story/display/" + story.StoryModelId;
            title.innerHTML = story.StoryTitle;
            headline.innerHTML = story.StoryHeadline;
            linkWrapper.append(divContainer);
            divContainer.append(title, headline, genreContainer);

            document.getElementById(elementId).append(linkWrapper);
        })
    }

    createStoryContainersFollowers(stories, elementId) {
        if (stories.stories.length === 0) {
            document.getElementById(elementId).innerHTML = "No follower stories.";
            return;
        }

        stories.stories.forEach((storyList) => {
            storyList.forEach((story, index) => {
                let linkWrapper = document.createElement("a");
                let divContainer = document.createElement("div");
                let title = document.createElement("h3");
                let headline = document.createElement("p");
                let genreContainer = document.createElement("div");

                linkWrapper.classList.add("d-inline-block", "home-link-container");
                divContainer.classList.add("shadow-sm", "position-relative", "m-3", "p-4", "home-main-container");
                title.classList.add("text-left");
                headline.classList.add("mt-3", "mb-3", "text-left");
                genreContainer.classList.add("d-flex", "position-absolute", "home-genre-container");

                stories.genres[index].forEach((genre) => {
                    let genreElement = document.createElement("p");
                    genreElement.classList.add("text-muted", "border", "pt-1", "pb-1", "pr-2", "pl-2", "mr-1", "home-genre-text");
                    genreElement.innerHTML = genre.StoryGenre;
                    genreContainer.append(genreElement);
                })

                linkWrapper.href = "https://localhost:44389/story/display/" + story.StoryModelId;
                title.innerHTML = story.StoryTitle;
                headline.innerHTML = story.StoryHeadline;
                linkWrapper.append(divContainer);
                divContainer.append(title, headline, genreContainer);

                document.getElementById(elementId).append(linkWrapper);
            })
        })
    }
}
