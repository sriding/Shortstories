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

        const avatarResponse = await avatarStream.json();

        if (avatarStream.status !== 200 && avatarResponse.errors) {
            let newElement = document.createElement("p");
            newElement.classList.add("settings-validation", "alert", "alert-danger");
            newElement.innerHTML = avatarResponse.errors.toString();
            document.getElementById("settings-profile-details-form").append(newElement);
            return null;
        }

        let correctAvatar = null;
        this.settingsAvatarImages.forEach((avatarImages) => {
            if (avatarImages.alt === avatarResponse.pAvatar) {
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

        const writerLabelResponse = await writerLabelStream.json();

        if (writerLabelStream.status !== 200 && writerLabelResponse.errors) {
            let newElement = document.createElement("p");
            newElement.classList.add("settings-validation", "alert", "alert-danger");
            newElement.innerHTML = writerLabelResponse.errors.toString();
            document.getElementById("setings-profile-details-form").append(newElement);
            return null;
        }

        document.getElementsByClassName(`settings-option-${writerLabelResponse.pWriter}`)[0].selected = true;
    }

    async preFillProfileDescription() {
        const descriptionStream = await fetch("https://localhost:44389/api/profilemodels/description/" + window.localStorage.getItem("pid"), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const descriptionResponse = await descriptionStream.json();

        if (descriptionStream.status !== 200 && descriptionResponse.errors) {
            let newElement = document.createElement("p");
            newElement.classList.add("settings-validation", "alert", "alert-danger");
            newElement.innerHTML = descriptionResponse.errors.toString();
            document.getElementById("setings-profile-details-form").append(newElement);
            return null;
        }

        document.getElementById("settings-writer-description").value = descriptionResponse.pDescription;
    }

    async displayCurrentStories() {
        const storiesStream = await fetch("https://localhost:44389/api/storymodels/profile/" + window.localStorage.getItem("pid"), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })

        const stories = await storiesStream.json();

        if (storiesStream.status !== 200 && stories.errors) {
            let newElement = document.createElement("p");
            newElement.classList.add("settings-validation", "alert", "alert-danger");
            newElement.innerHTML = descriptionResponse.errors.toString();
            document.getElementById("settings-stories-container").prepend(newElement);
            return null;
        }

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
            //window.location.reload();
        }).catch((err) => {
            document.getElementById("settings-validation-email").innerHTML = err.toString();
        })
    }

    static changePassword(password) {
        //using global firebase object
        firebaseInstance.changePassword(password).then(() => {
           //window.location.reload();
        }).catch((err) => {
            document.getElementById("settings-validation-password").innerHTML = err.toString();
        })
    }

    updateUserButtonEventListeners() {
        document.getElementById("settings-update-user-button").addEventListener("click", (e) => {
            e.preventDefault();
            this.showCurrentLoginDetailsPrompt();
            this.adjustPositionOfLoginDetailsPrompt();
        })
    }

    static async currentLoginFormSubmit() {
        let emailInformation = document.getElementById("current-login-details-email-address").value;
        let passwordInformation = document.getElementById("current-login-details-password").value;

        Array.from(document.getElementsByClassName("settings-validation")).forEach((elements) => {
            elements.innerHTML = "";
            elements.style.display = "none";
        })

        Array.from(document.getElementsByClassName("current-login-validation")).forEach((elements) => {
            elements.innerHTML = "";
            elements.style.display = "none";
        })

        try {
            const login = await firebaseInstance.signInWithEmailAndPassword(emailInformation, passwordInformation);

            if (login === null) {
                return null;
            }

            document.getElementById("role-main").style.filter = "none";
            document.getElementById("current-login-details-modal").style.display = "none";

            let newEmail = document.getElementById("settings-form-email").value;
            let newPassword = document.getElementById("settings-form-password").value;

            if (document.getElementById("settings-form-email").value !== "") {
                const changedEmail = await this.changeEmail(newEmail);
            }

            if (document.getElementById("settings-form-password").value !== "") {
                const changedPassword = await this.changePassword(newPassword);
            }

        } catch (err) {
            document.getElementById("current-login-validation-password").style.display = "inline-block";
            document.getElementById("current-login-validation-password").innerHTML = err.toString();
            return null;
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

            if (changeAvatarStream.status !== 200 && changeAvatarStream.status !== 204 && changeAvatar.errors) {
                document.getElementById("settings-validation-avatars").style.display = "inline-block";
                document.getElementById("settings-validation-avatars").innerHTML = changeAvatar.errors.toString(); 
                return null;
            }
        } catch (err) {
            document.getElementById("settings-validation-avatars").style.display = "inline-block";
            document.getElementById("settings-validation-avatars").innerHTML = err.toString();
            return null;
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

            if (changeLabelStream.status !== 200 && changeLabelStream.status !== 204 && changeLabel.errors) {
                document.getElementById("settings-validation-profession").style.display = "inline-block";
                document.getElementById("settings-validation-profession").innerHTML = changeLabel.errors.toString();
                return null;
            }
        } catch (err) {
            document.getElementById("settings-validation-profession").style.display = "inline-block";
            document.getElementById("settings-validation-profession").innerHTML = err.toString();
            return null;
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

            if (changeDescriptionStream.status !== 200 && changeDescriptionStream.status !== 204 && changeDescription.errors) {
                document.getElementById("settings-validation-description").style.display = "inline-block";
                document.getElementById("settings-validation-description").innerHTML = changeDescription.errors.toString();
                return null;
            }
        } catch (err) {
            document.getElementById("settings-validation-description").style.display = "inline-block";
            document.getElementById("settings-validation-description").innerHTML = err.toString();
            return null;
        }
    }

    async updateProfileButtonEventListeners() {
        document.getElementById("settings-update-profile-button").addEventListener("click", async () => {
            Array.from(document.getElementsByClassName("settings-validation")).forEach((elements) => {
                elements.innerHTML = "";
                elements.style.display = "none";
            })

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

            window.location.reload();
        })
    }

    editStoryButtonsEventListeners() {
        Array.from(document.getElementsByClassName("settings-edit-button")).forEach((editButtons) => {
            editButtons.addEventListener("click", () => {
                let uid = window.localStorage.getItem("uid");
                window.location.href = `https://localhost:44389/Story/${uid}/Edit/${editButtons.value}`;
            })
        })
    }

    async deleteStory(storyId) {
        try {
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

            if (deleteStoryStream.status !== 200 && deleteStoryResponse.errors) {
                return null;
            }
        } catch (err) {
            return null;
        }
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

    adjustPositionOfLoginDetailsPrompt() {
        let windowWidth = window.innerWidth;
        let windowCenter = windowWidth * 0.5;
        //completely dependent on what is declared in css as the width.
        let widthOfLoginPrompt = 340;

        let rightEdge = windowCenter + (widthOfLoginPrompt * 0.5);
        let leftEdge = windowCenter - (widthOfLoginPrompt * 0.5);

        document.getElementById("current-login-details-modal").style.left = `${leftEdge}px`;
    }
}