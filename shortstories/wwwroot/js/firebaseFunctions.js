const firebaseCreateUserWithEmailAndPassword = () => {
    const registerFormEmailAddress = document.getElementById("register_form_email_address").value;
    const registerFormPassword = document.getElementById("register_form_password").value;

    auth.createUserWithEmailAndPassword(registerFormEmailAddress, registerFormPassword)
        .then((user) => {
            console.log("It worked.", user);
        })
        .catch(function (error) {
            // Handle Errors here.
            console.log("There was an error", error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
}


const firebaseSignInWithEmailAndPassword = () => {
    const inputFormEmailAddress = document.getElementById("input_form_email_address").value;
    const inputFormPassword = document.getElementById("input_form_password").value;

    auth.signInWithEmailAndPassword(inputFormEmailAddress, inputFormPassword)
        .then((user) => {
           console.log("It was success", user.user);
        })
        .catch(function (error) {
        // Handle Errors here.
        console.log("There was an error", error);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

}

const firebaseAuthStateChanged = () => {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            // User is signed out.
            // ...
        }
    });
}

const firebaseChangeEmailAddress = () => {
    let user = auth.currentUser;
    console.log(user);

    let newEmail = document.getElementById("firebase_email").value;

    user.updateEmail(newEmail).then(function () {
        // Update successful.
        console.log("Email has been updated.");
    }).catch(function (error) {
        // An error happened.
        console.log("Email update failed - ", error);
    });
}
