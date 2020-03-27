class Login {
    constructor() {

    }

    addFormEventListener = () => {
        const formElement = document.getElementById("login_form");

        formElement == null ? "" :
            formElement.addEventListener("submit", this.submitLoginForm, true);
    }

    submitLoginForm = async (event) => {
        event.preventDefault();

        const loginFormEmailAddress = document.getElementById("login_form_email_address").value;
        const loginFormPassword = document.getElementById("login_form_password").value;

        try {
            const loginResult = await firebaseInstance.signInWithEmailAndPassword(loginFormEmailAddress, loginFormPassword);
            window.localStorage.setItem("t", loginResult.user.ma);
            window.localStorage.setItem("fid", loginResult.user.uid);

            const loginStream = await fetch("https://localhost:44389/api/usermodels/login/" + `${loginResult.user.uid}`, {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + loginResult.user.ma
                }
            });

            const loginText = await loginStream.text();

            window.localStorage.setItem("uid", loginText);

            const profileStream = await fetch("https://localhost:44389/api/profilemodels/id/" + `${loginText}`, {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + loginResult.user.ma
                }
            });

            const profileText = await profileStream.text();

            window.localStorage.setItem("pid", profileText);

            return window.location.href = "https://localhost:44389/";
        } catch (error) {
            return error;
        }
    }
}