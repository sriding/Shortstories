class Register {
    constructor() {
    }

    addFormEventListener = () => {
        const formElement = document.getElementById("register_form");

        formElement == null ? "" :
            formElement.addEventListener("submit", this.submitRegisterForm, true);
    }

    submitRegisterForm = async (event) => {
        event.preventDefault();

        const registerFormUsername = document.getElementById("register_form_username").value;
        const registerFormPassword = document.getElementById("register_form_password").value;
        const registerFormEmailAddress = document.getElementById("register_form_email_address").value;
        const registerFormProfession = document.getElementById("register_form_profession").value;
        const registerFormDescription = document.getElementById("register_form_description").value;

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