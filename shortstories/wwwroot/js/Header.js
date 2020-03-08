class Header {
    IsAuthorized = false;

    constructor() {
    }

    get IsAuthorizedState() {
        return this.IsAuthorized;
    }

    set IsAuthorized(value) {
        this.checkAuthorizationState() == true ? this.IsAuthorized = true : this.IsAuthorized = false;
    }

    async checkAuthorizationState() {
        const userId = window.localStorage.getItem("uid");
        const firebaseId = window.localStorage.getItem("fid");

        const authStatusStream = await fetch(`https://localhost:44389/api/usermodels/${firebaseId}/${userId}`, {
            method: "GET",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t")
            }
        });

        const username = await authStatusStream.text();

        return username;
    }

    logoutEventListener() {
        document.getElementById("header-logout").addEventListener("click", () => {
            //Instance created in page load function.
            firebaseInstance.firebaseLogout();
        })
    }
}