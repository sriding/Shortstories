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
        Array.from(document.getElementsByClassName("login-validation")).forEach((element) => {
            element.style.display = "none";
        })

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

            const loginResponse = await loginStream.json();

            if (loginStream.status !== 200 && loginResponse.errors) {
                let newElement = document.createElement("p");
                newElement.classList.add("login-validation", "alert", "alert-danger");
                newElement.innerHTML = loginResponse.errors.toString();
                document.getElementById("login_form").append(newElement);
                return null;
            }

            window.localStorage.setItem("uid", loginResponse.uid);

            const profileStream = await fetch("https://localhost:44389/api/profilemodels/id/" + `${loginResponse.uid}`, {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + loginResult.user.ma
                }
            });

            const profileResponse = await profileStream.json();

            if (profileStream.status !== 200 && profileResponse.errors) {
                let newElement = document.createElement("p");
                newElement.classList.add("login-validation", "alert", "alert-danger");
                newElement.innerHTML = profileResponse.errors.toString();
                document.getElementById("login_form").append(newElement);
                return null;
            }

            window.localStorage.setItem("pid", profileResponse.pid);

            return window.location.href = "https://localhost:44389/";
        } catch (error) {
            let newElement = document.createElement("p");
            newElement.classList.add("login-validation", "alert", "alert-danger");
            newElement.innerHTML = "Make sure fields are filled out properly.";
            document.getElementById("login_form").append(newElement);

            return null;
        }
    }
}