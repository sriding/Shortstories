class Settings {
    settingsPage = null;
    settingsAvatarImages = null;

    constructor() {
        this.settingsPage = document.getElementById("settings-page") || null;
        this.settingsAvatarImages = Array.from(document.getElementsByClassName("settings-avatar"));
    }

    async preSelectCurrentAvatar() {
        const avatarStream = await fetch("https://localhost:44389/api/profilemodels/avatar/" + window.localStorage.getItem("pid"), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        const avatar = await avatarStream.text();
        let correctAvatar = null;
        this.settingsAvatarImages.forEach((avatarImages) => {
            if (avatarImages.alt === avatar) {
                correctAvatar = avatarImages;
            }
        });

        if (correctAvatar === null) {
            return;
        }

        correctAvatar.classList.add("settings-chosen-avatar", "border");

        this.settingsAvatarImages.forEach((avatarImages) => {
            avatarImages.addEventListener("click", (e) => {
                document.getElementsByClassName("settings-chosen-avatar")[0].classList.remove("settings-chosen-avatar", "border");
                e.target.classList.add("settings-chosen-avatar", "border");
            })
        })
    }

    async preSelectCurrentWriterLabel() {
        const writerLabelStream = await fetch("https://localhost:44389/api/profilemodels/writer/" + window.localStorage.getItem("pid"), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const writerLabel = await writerLabelStream.text();

        document.getElementsByClassName(`settings-option-${writerLabel}`)[0].selected = true;
    }

    async preFillProfileDescription() {
        const descriptionStream = await fetch("https://localhost:44389/api/profilemodels/description/" + window.localStorage.getItem("pid"), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const description = await descriptionStream.text();

        document.getElementById("settings-writer-description").value = description;
    }

    async displayCurrentStories() {
        const storiesStream = await fetch("https://localhost:44389/api/storymodels/profile/" + window.localStorage.getItem("pid"), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const stories = await storiesStream.json();

        stories.forEach((story) => {
            let containerElement = document.createElement("div");
            let titleElement = document.createElement("p");
            let editButtonElement = document.createElement("button");
            let deleteButtonElement = document.createElement("button");

            containerElement.classList.add("d-flex", "align-items-center", "mb-4");
            titleElement.classList.add("border", "p-2", "mr-3", "mb-0");
            editButtonElement.classList.add("settings-edit-button", "btn", "btn-outline-info", "mr-1", "ml-1");
            deleteButtonElement.classList.add("settings-delete-button", "btn", "btn-outline-danger", "mr-1", "ml-1");

            titleElement.innerHTML = story.StoryTitle;
            titleElement.style.fontSize = "24px";
            editButtonElement.innerHTML = "Edit";
            deleteButtonElement.innerHTML = "Delete";
            editButtonElement.value = story.StoryModelId;
            deleteButtonElement.value = story.StoryModelId;

            containerElement.append(titleElement, editButtonElement, deleteButtonElement);

            document.getElementById("settings-stories-container").append(containerElement);
        })

        this.editStoryButtonsEventListeners();
        this.deleteStoryButtonsEventListeners();
    }

    static changeEmail(email) {
        //using global firebase object
        firebaseInstance.changeEmail(email).then(() => {
            window.location.reload();
            console.log("Changed email.");
        }).catch((err) => {
            console.log("There was an error changing email on firebase.");
        })
    }

    static changePassword(password) {
        //using global firebase object
        firebaseInstance.changePassword(password).then(() => {
            window.location.reload();
            console.log("Changed password.");
        }).catch((err) => {
            console.log("There was an error changing password on firebase.");
        })
    }

    updateUserButtonEventListeners() {
        document.getElementById("settings-update-user-button").addEventListener("click", (e) => {
            e.preventDefault();
            this.showCurrentLoginDetailsPrompt();
        })
    }

    static async currentLoginFormSubmit() {
        let emailInformation = document.getElementById("current-login-details-email-address").value;
        let passwordInformation = document.getElementById("current-login-details-password").value;

        const login = await firebaseInstance.signInWithEmailAndPassword(emailInformation, passwordInformation);

        if (login === undefined) {
            return;
        }

        let newEmail = document.getElementById("settings-form-email").value;
        let newPassword = document.getElementById("settings-form-password").value;

        if (newEmail && newEmail !== "") {
            this.changeEmail(newEmail);
        }

        if (newPassword && newPassword !== "") {
            this.changePassword(newPassword);
        }
    }

    async changeAvatar(newAvatar) {
        try {
            const changeAvatarStream = await fetch("https://localhost:44389/api/profilemodels/update/avatar/" + window.localStorage.getItem("uid") + "/" + newAvatar, {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t"),
                    "Content-type": "application/json"
                }
            })

            const changeAvatar = await changeAvatarStream.json();

            console.log(changeAvatar);
        } catch (err) {
            console.log(err);
        }
    }

    async changeWriterLabel(newLabel) {
        try {
            const changeLabelStream = await fetch("https://localhost:44389/api/profilemodels/update/type-of-writer/" + window.localStorage.getItem("uid") + "/" + newLabel, {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t"),
                    "Content-type": "application/json"
                }
            })

            const changeLabel = await changeLabelStream.json();

            console.log(changeLabel);
        } catch (err) {
            console.log(err);
        }
    }

    async changeProfileDescription(newDescription) {
        try {
            const changeDescriptionStream = await fetch("https://localhost:44389/api/profilemodels/update/description/" + window.localStorage.getItem("uid") + "/" + newDescription, {
                method: "PUT",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t"),
                    "Content-type": "application/json"
                }
            })

            const changeDescription = await changeDescriptionStream.json();

            console.log(changeDescription);
        } catch (err) {
            console.log(err);
        }
    }

    async updateProfileButtonEventListeners() {
        document.getElementById("settings-update-profile-button").addEventListener("click", async () => {
            const newAvatar = document.getElementsByClassName("settings-chosen-avatar")[0];
            const avatarChanged = await this.changeAvatar(newAvatar.alt);

            const newDescription = document.getElementById("settings-writer-description").value;
            const descriptionChanged = await this.changeProfileDescription(newDescription);

            //Had to move this to the bottom of the function, because how do you await for a foreach loop to finish?
            Array.from(document.getElementsByClassName("settings-option")).forEach(async (option) => {
                if (option.selected === true) {
                    const writerLabelChanged = await this.changeWriterLabel(option.value);
                }
            })
        })
    }

    editStoryButtonsEventListeners() {
        Array.from(document.getElementsByClassName("settings-edit-button")).forEach((editButtons) => {
            editButtons.addEventListener("click", () => {
                window.location.href = `https://localhost:44389/Story/Edit/${editButtons.value}`;
            })
        })
    }

    async deleteStory(storyId) {
        const deleteStoryStream = await fetch("https://localhost:44389/api/storymodels/" + storyId, {
            method: "DELETE",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t"),
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                UserModelId: window.localStorage.getItem("uid"),
                FirebaseUserId: window.localStorage.getItem("fid")
            })
        })

        const deleteStoryResponse = await deleteStoryStream.json();
    }

    deleteStoryButtonsEventListeners() {
        Array.from(document.getElementsByClassName("settings-delete-button")).forEach((deleteButtons) => {
            deleteButtons.addEventListener("click", () => {
                this.deleteStory(deleteButtons.value);
                window.location.reload();
            })
        })
    }

    showCurrentLoginDetailsPrompt() {
        document.getElementById("role-main").style.filter = "opacity(0.50)";
        document.getElementById("current-login-details-modal").style.display = "block";
    }

    hideCurrentLoginDetailsPrompt() {
        document.getElementById("role-main").style.filter = "none";
        document.getElementById("current-login-details-modal").style.display = "none";
    }
}