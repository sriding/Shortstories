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
        } catch(error) {
            return error;
        }

        return "Success";
    }
}