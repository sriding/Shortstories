class Register {
    arrayOfAvatarElements = null;

    constructor() {
        this.arrayOfAvatarElements = Array.from(document.getElementsByClassName("register-avatar"));
    }

    addFormEventListener = () => {
        const formElement = document.getElementById("register_form");

        formElement == null ? "" :
            formElement.addEventListener("submit", this.submitRegisterForm, true);
    }


    changeChosenAvatar() {
        this.arrayOfAvatarElements.forEach((avatars) => {
            avatars.addEventListener("click", (e) => {
                document.getElementsByClassName("register-chosen-avatar")[0].classList.remove("register-chosen-avatar", "border");
                e.target.classList.add("register-chosen-avatar", "border");
            })
        })
    }

    submitRegisterForm = async (event) => {
        event.preventDefault();
        Array.from(document.getElementsByClassName("register-validation")).forEach((elements) => {
            elements.style.display = "none";
        })

        const registerFormUsername = document.getElementById("register_form_username").value;
        const registerFormPassword = document.getElementById("register_form_password").value;
        const registerFormEmailAddress = document.getElementById("register_form_email_address").value;
        const registerFormProfession = document.getElementById("register_form_profession").value;
        const registerFormDescription = document.getElementById("register_form_description").value;
        const registerFormAvatar = document.getElementsByClassName("register-chosen-avatar")[0].alt;

        try {
            const registerResult = await firebaseInstance.createUserWithEmailAndPassword(registerFormEmailAddress, registerFormPassword);

            const userFormData = {
                "firebaseUserId": registerResult.user.uid,
            }

            const userResponseStream = await fetch("https://localhost:44389/api/UserModels/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userFormData)
            });

            const userResponseData = await userResponseStream.json();

            if (userResponseStream.status !== 200 && userResponseData.errors) {
                let firebaseDeletedUser = await firebaseInstance.firebaseAuth.currentUser.delete();

                let count = 0;
                const userErrors = userResponseData.errors;
                //Should match model properties
                if (userErrors.UserModelId) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("register-validation", "alert", "alert-danger");
                    newElement.innerHTML = userErrors.UserModelId;
                    document.getElementById("register_form").append(newElement);
                    count++;
                }

                if (userErrors.FireBaseUserId) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("register-validation", "alert", "alert-danger");
                    newElement.innerHTML = userErrors.FireBaseUserId;
                    document.getElementById("register_form").append(newElement);
                    count++;
                }

                if (count === 0) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("register-validation", "alert", "alert-danger");
                    newElement.innerHTML = userErrors.toString();
                    document.getElementById("register_form").append(newElement);
                }

                count = 0;

                return null;
            }

            const profileFormData = {
                "UserId": userResponseData.uid,
                "ProfileUsername": registerFormUsername,
                "ProfileAvatar": registerFormAvatar,
                "ProfileTypeOfWriter": registerFormProfession,
                "ProfileDescription": registerFormDescription
            }

            const profileResponseStream = await fetch("https://localhost:44389/api/ProfileModels", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profileFormData)
            })

            const profileResponseData = await profileResponseStream.json();

            if (profileResponseStream.status !== 200 && profileResponseData.errors) {
                let firebaseDeletedUser = await firebaseInstance.firebaseAuth.currentUser.delete();

                let count = 0;
                const profileErrors = profileResponseData.errors;
                //Should match model properties
                if (profileErrors.ProfileModelId) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("register-validation", "alert", "alert-danger");
                    newElement.innerHTML = profileErrors.ProfileModelId;
                    document.getElementById("register_form").append(newElement);
                    count++;
                }

                if (profileErrors.TimeOfCreation) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("register-validation", "alert", "alert-danger");
                    newElement.innerHTML = profileErrors.TimeOfCreation;
                    document.getElementById("register_form").append(newElement);
                    count++;
                }

                if (profileErrors.ProfileUsername) {
                    let usernameElement = document.getElementById("register-validation-username");
                    usernameElement.innerHTML = profileErrors.ProfileUsername;
                    usernameElement.style.display = "inline-block";
                    count++;
                }

                if (profileErrors.ProfileAvatar) {
                    let avatarElement = document.getElementById("register-validation-avatar");
                    avatarElement.innerHTML = profileErrors.ProfileAvatar;
                    avatarElemetn.style.display = "inline-block";
                    count++;
                }

                if (profileErrors.ProfileTypeOfWriter) {
                    let writerElement = document.getElementById("register-validation-profession");
                    writerElement.innerHTML = profileErrors.ProfileTypeOfWriter;
                    writerElement.style.display = "inline-block";
                    count++;
                }

                if (profileErrors.ProfileDescription) {
                    let descriptionElement = document.getElementById("register-validation-description");
                    descriptionElement.innerHTML = profileErrors.ProfileDescription;
                    descriptionElement.style.display = "inline-block";
                    count++;
                }

                if (profileErrors.UserId) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("register-validation", "alert", "alert-danger");
                    newElement.innerHTML = profileErrors.UserId;
                    document.getElementById("register_form").append(newElement);
                    count++;
                }

                if (count === 0) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("register-validation", "alert", "alert-danger");
                    newElement.innerHTML = profileErrors.toString();
                    document.getElementById("register_form").append(newElement);
                }

                count = 0;

                return null;
            }

            window.location.href = "https://localhost:44389/Login";
        } catch (error) {
            let newElement = document.createElement("p");
            newElement.classList.add("register-validation", "alert", "alert-danger");
            newElement.innerHTML = "Make sure fields are filled out properly.";
            document.getElementById("register_form").append(newElement);

            let firebaseDeletedUser = await firebaseInstance.firebaseAuth.currentUser.delete();
            return null;
        }

        return "Success";
    }
}