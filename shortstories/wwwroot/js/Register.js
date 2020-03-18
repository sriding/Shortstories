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

            const profileFormData = {
                "UserId": userResponseData,
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

            window.location.href = "https://localhost:44389/Login";
        } catch (error) {
            return error;
        }

        return "Success";
    }
}