class Firebase {
    firebaseConfig;
    firebaseAuth;

    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyDce1gieOtJHvS4a3wOF1__2z6jXbnA_NI",
            authDomain: "shortstories-auth.firebaseapp.com",
            databaseURL: "https://shortstories-auth.firebaseio.com",
            projectId: "shortstories-auth",
            storageBucket: "shortstories-auth.appspot.com",
            messagingSenderId: "1087906798602",
            appId: "1:1087906798602:web:f007252c9ae7bb835393f3",
            measurementId: "G-XD67708PJ3"
        }
    }

    initialize() {
        //firebase is brought in from scripts on layout page
        firebase.initializeApp(this.firebaseConfig);
        firebase.analytics();

        this.firebaseAuth = firebase.auth();
    }

    firebaseLogout() {
        this.firebaseAuth.signOut().then(() => {
            window.localStorage.clear();
            location.reload();
        }).catch((err) => {
            return null;
        })
    }

    async signInWithEmailAndPassword(email, password) {
        try {
            const loginResult = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
            return loginResult;
        } catch (err) {
            //this method is used on the login page and on the settings page
            if (err.code.includes("email") === true) {
                const userValidationElement = document.getElementById("login-validation-email") || null;
                const currentLoginValidationElement = document.getElementById("current-login-validation-email") || null;
                if (userValidationElement !== null) {
                    userValidationElement.style.display = "inline-block";
                    userValidationElement.innerHTML = err.message;
                } else {
                    settingsValidationElement.style.display = "inline-block";
                    settingsValidationElement.innerHTML = err.message;
                }
            } else {
                const userValidationElement = document.getElementById("login-validation-password") || null;
                const settingsValidationElement = document.getElementById("current-login-validation-password") || null;
                if (userValidationElement !== null) {
                    userValidationElement.style.display = "inline-block";
                    userValidationElement.innerHTML = err.message;
                } else {
                    settingsValidationElement.style.display = "inline-block";
                    settingsValidationElement.innerHTML = err.message;
                }
            }

            return null;
        }
    }

    async createUserWithEmailAndPassword(email, password) {
        try {
            const registerResult = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
            return registerResult;
        } catch (err) {
            //this method is used on register page
            if (err.code.includes("email") === true) {
                const userValidationElement = document.getElementById("register-validation-email");
                userValidationElement.style.display = "inline-block";
                userValidationElement.innerHTML = err.message;
            } else {
                const userValidationElement = document.getElementById("register-validation-password");
                userValidationElement.style.display = "inline-block";
                userValidationElement.innerHTML = err.message;
            }

            return null;
        } 
    }

    async changeEmail(newEmail) {
        try {
            const changeResult = await this.firebaseAuth.currentUser.updateEmail(newEmail);
            return changeResult;
        } catch (err) {
            //This method is used on the settings page
            const emailValidationElement = document.getElementById("settings-validation-email");
            emailValidationElement.style.display = "inline-block";
            emailValidationElement.innerHTML = err.message;

            return null;
        }
    }

    async changePassword(newPassword) {
        try {
            const changeResult = await this.firebaseAuth.currentUser.updatePassword(newPassword);
            return changeResult;
        } catch (err) {
            //This method is used on the settings page
            const passwordValidationElement = document.getElementById("settings-validation-password");
            passwordValidationElement.style.display = "inline-block";
            passwordValidationElement.innerHTML = err.message;

            return null;
        }
    }

    onAuthStateChanged() {
        this.firebaseAuth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // ...
            } else {
                // User is signed out.
            }
        });
    }
}