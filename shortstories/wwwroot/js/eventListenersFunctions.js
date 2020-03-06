const formEventListerner = () => {
    const formElement = document.getElementById("firebase_form");

    formElement == null ?  "" : 
    document.getElementById("firebase_form").addEventListener("submit", (event) => {
        event.preventDefault();
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
    })
};

const test = () => {
    console.log(test);
}