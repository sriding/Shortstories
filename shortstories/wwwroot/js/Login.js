class Login {
    constructor() {

    }

    addFormEventListener = () => {
        let formElement = document.getElementById("login_form");

        formElement == null ? "" :
            formElement.addEventListener("submit", this.submitLoginForm, true);
    }

    submitLoginForm = async (event) => {
        console.log("submitting the form works.");
        event.preventDefault();
        Array.from(document.getElementsByClassName("login-validation")).forEach((element) => {
            element.style.display = "none";
        })

        const loginFormEmailAddress = document.getElementById("login_form_email_address").value;
        const loginFormPassword = document.getElementById("login_form_password").value;
        console.log("email: ", loginFormEmailAddress);
        console.log("password: ", loginFormPassword);

        try {
            const loginResult = await firebaseInstance.signInWithEmailAndPassword(loginFormEmailAddress, loginFormPassword);

            firebaseInstance.firebaseAuth.currentUser.getIdToken(true).then(async (token) => {
                const loginStream = await fetch(window.location.origin + "/api/usermodels/login/" + `${loginResult.user.uid}`, {
                    method: "GET",
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                window.localStorage.setItem("t", token);
                window.localStorage.setItem("fid", loginResult.user.uid);

                const loginResponse = await loginStream.json();

                if (loginStream.status !== 200 && loginResponse.errors) {
                    let newElement = document.createElement("p");
                    newElement.classList.add("login-validation", "alert", "alert-danger");
                    newElement.innerHTML = loginResponse.errors.toString();
                    document.getElementById("login_form").append(newElement);
                    return null;
                }

                window.localStorage.setItem("uid", loginResponse.uid);

                const profileStream = await fetch(window.location.origin + "/api/profilemodels/id/" + `${loginResponse.uid}`, {
                    method: "GET",
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + token
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

                return window.location.href = "/";  
            })
        } catch (error) {
            let newElement = document.createElement("p");
            newElement.classList.add("login-validation", "alert", "alert-danger");
            newElement.innerHTML = "Make sure fields are filled out properly.";
            document.getElementById("login_form").append(newElement);

            return null;
        }
    }
}