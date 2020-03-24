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
            console.log("Logging out of firebase...");
            window.localStorage.clear();
            location.reload();
        })
            .catch((err) => {
                console.log(err);
        })
    }

    async signInWithEmailAndPassword(email, password) {
        try {
            const loginResult = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
            return loginResult;
        } catch (err) {
            console.log(err);
        }
    }

    async createUserWithEmailAndPassword(email, password) {
        try {
            const registerResult = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
            return registerResult;
        } catch (err) {
            console.log(err);
        } 
    }

    async changeEmail(newEmail) {
        try {
            const changeResult = await this.firebaseAuth.currentUser.updateEmail(newEmail);
            return changeResult;
        } catch (err) {
            console.log(err);
        }
    }

    async changePassword(newPassword) {
        try {
            const changeResult = await this.firebaseAuth.currentUser.updatePassword(newPassword);
            return changeResult;
        } catch (err) {
            console.log(err);
        }
    }

    onAuthStateChanged() {
        this.firebaseAuth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log("user signed in");
                // ...
            } else {
                // User is signed out.
                // ...
                console.log("user signed out");
            }
        });
    }
}