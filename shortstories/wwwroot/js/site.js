// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const practiceGetRequest = async () => {
    const requestInJSONFormat = await fetch("https://localhost:44389/api/UserModels/Admin");
    const request = await requestInJSONFormat.json();
    return console.log(request);
}

const submittingRegisterForm = async () => {
    const registerFormData = {
        registerFormUsername: document.getElementById("register_form_username").value,
        registerFormPassword: document.getElementById("register_form_password").value,
        registerFormEmailAddress: document.getElementById("register_form_email_address").value,
        registerFormProfession: document.getElementById("register_form_profession").value,
        registerFormDescription: document.getElementById("register_form_description").value
    };

    console.log(registerFormData);
    /*const responseStream = await fetch("https://localhost:44389/api/UserModels", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
    });*/
}