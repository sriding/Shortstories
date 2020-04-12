class Home {
    homePage = null;

    constructor() {
        this.homePage = document.getElementById("home-page") || null;
    }

    addMainDropdownButtonEventListener() {
        document.getElementById("home-filter-title").addEventListener("click", () => {
            if (document.getElementsByClassName("home-genre-selection-container")[0].style.display === "grid") {
                document.getElementsByClassName("home-genre-selection-container")[0].style.display = "none";
            } else {
                document.getElementsByClassName("home-genre-selection-container")[0].style.display = "grid";
            }
        })

        document.getElementsByClassName("la-angle-down")[0].addEventListener("click", () => {
            if (document.getElementsByClassName("home-genre-selection-container")[0].style.display === "grid") {
                document.getElementsByClassName("home-genre-selection-container")[0].style.display = "none";
            } else {
                document.getElementsByClassName("home-genre-selection-container")[0].style.display = "grid";
            }
        })
    }

    addAllDropdownButtonEventListeners() {
        Array.from(document.getElementsByClassName("dropdown-item")).forEach((element) => {
            element.addEventListener("click", () => {
                document.getElementById("home-filter-stories").innerHTML = "";
                document.getElementById("home-filter-title").innerHTML = element.innerHTML;
                document.getElementsByClassName("home-genre-selection-container")[0].style.display = "none";
                this.getStoriesByFilter(element.innerHTML, "home-filter-stories");
            })
        })
    }

    async getStoriesByFilter(filterText, elementId) {
        try {
            if (filterText === null) {
                return null;
            }

            const storiesStream = await fetch(window.location.origin + "/api/storymodels/filter/" + filterText, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const stories = await storiesStream.json();

            this.createStoryContainersGeneral(stories, elementId);
        } catch (error) {
            return null;
        }
    }

    async getStoriesByFollowers(profileId, elementId) {
        try {
            if (profileId === null) {
                const noFollowersElement = document.createElement("p");
                noFollowersElement.classList.add("mt-3", "mb-3");
                noFollowersElement.style.fontSize = "20px";
                noFollowersElement.innerHTML = "Not following anyone.";
                document.getElementById("home-no-follower-stories").append(noFollowersElement);
                return null;
            }
            const storiesStream = await fetch(window.location.origin + "/api/storymodels/filter/followers/" + profileId, {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem("t")
                }
            })

            if (storiesStream.status === 401) {
                const noFollowersElement = document.createElement("p");
                noFollowersElement.classList.add("mt-3", "mb-3");
                noFollowersElement.style.fontSize = "20px";
                noFollowersElement.innerHTML = "Not following anyone.";
                document.getElementById("home-no-follower-stories").append(noFollowersElement);

                return null;
            }

            const stories = await storiesStream.json();

            this.createStoryContainersFollowers(stories, elementId);
        } catch (error) {
            return null;
        }
    }

    async getStoriesByProfile(profileUsername, elementId) {
        try {
            const storiesStream = await fetch(window.location.origin + "/api/storymodels/filter/profile/" + profileUsername, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const stories = await storiesStream.json();

            this.createStoryContainersGeneral(stories, elementId, true);
        } catch (error) {
            return null;
        }
    }

    createStoryContainersGeneral(stories, elementId, profile = false) {
        if (stories.stories.length === 0) {
            const noStoriesElement = document.createElement("p");
            noStoriesElement.classList.add("mt-3", "mb-3");
            noStoriesElement.style.fontSize = "20px";
            if (profile !== false) {
                noStoriesElement.innerHTML = "No stories from this user.";
            } else {
                noStoriesElement.innerHTML = "No stories for this filter.";
            }
            document.getElementById(elementId).append(noStoriesElement);
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

            linkWrapper.href = window.location.origin + "/story/display/" + story.StoryModelId;
            title.innerHTML = story.StoryTitle;
            headline.innerHTML = story.StoryHeadline;
            linkWrapper.append(divContainer);
            divContainer.append(title, headline, genreContainer);

            document.getElementById(elementId).append(linkWrapper);
        })
    }

    createStoryContainersFollowers(stories, elementId) {
        if (stories.stories.length === 0) {
            const noStoriesElement = document.createElement("p");
            noStoriesElement.classList.add("mt-3", "mb-3");
            noStoriesElement.style.fontSize = "20px";
            noStoriesElement.innerHTML = "No stories to display from those you are following.";
            document.getElementById("home-no-follower-stories").append(noStoriesElement);
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

                linkWrapper.href = window.location.origin + "/story/display/" + story.StoryModelId;
                title.innerHTML = story.StoryTitle;
                headline.innerHTML = story.StoryHeadline;
                linkWrapper.append(divContainer);
                divContainer.append(title, headline, genreContainer);

                document.getElementById(elementId).append(linkWrapper);
            })
        })
    }
}

export default Home;