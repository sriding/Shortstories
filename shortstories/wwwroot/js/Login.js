class Login {
    constructor() {

    }

    static addFormEventListener = () => {
        const formElement = document.getElementById("login_form");

        formElement == null ? "" :
            formElement.addEventListener("submit", this.submitLoginForm, true);
    }

    static submitLoginForm = async (event) => {
        event.preventDefault();

        const loginFormEmailAddress = document.getElementById("login_form_email_address").value;
        const loginFormPassword = document.getElementById("login_form_password").value;

        try {
            const firebaseResult = await auth.signInWithEmailAndPassword(loginFormEmailAddress, loginFormPassword);
            window.localStorage.setItem("t", firebaseResult.user.ma);
            window.localStorage.setItem("fid", firebaseResult.user.uid);

            const loginStream = await fetch("https://localhost:44389/api/usermodels/login/" + `${firebaseResult.user.uid}`, {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + firebaseResult.user.ma
                }
            });

            const loginJson = await loginStream.text();

            window.localStorage.setItem("uid", loginJson);

            console.log("Confirmed logged in.");
        } catch (error) {
            console.log("Log in went wrong.");
            console.log(error);
            return error;
        }

        return "Success";
    }
}