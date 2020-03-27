class Header {
    IsAuthorized = false;

    constructor() {
    }

    get IsAuthorizedState() {
        return this.IsAuthorized;
    }

    set IsAuthorized(value) {
        if (this.checkAuthorizationState() == true) {
            this.IsAuthorized = true;
        } else {
            this.IsAuthorized = false;
        } 
    }

    async checkAuthorizationState() {
        const userId = window.localStorage.getItem("uid");
        const firebaseId = window.localStorage.getItem("fid");

        if (userId === null && firebaseId === null) {
            return;
        }

        const authStatusStream = await fetch(`https://localhost:44389/api/usermodels/${firebaseId}/${userId}`, {
            method: "GET",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t")
            }
        });

        if (authStatusStream.status === 401) {
            window.localStorage.clear();
        }

        const username = await authStatusStream.text();

        return username;
    }

    async getAvatarUrl() {
        const avatarUrlStream = await fetch("https://localhost:44389/api/profilemodels/avatar/" + window.localStorage.getItem("pid"), {
            method: "GET"
        });

        const avatarUrl = await avatarUrlStream.text();

        return avatarUrl;
    }

    setAvatar() {
        this.getAvatarUrl().then((url) => {
            document.getElementById("header-avatar-image").src = "/images/" + url + ".png";
        });
    }

    async getProfileUsername() {
        try {
            const usernameStream = await fetch("https://localhost:44389/api/profilemodels/username/" + window.localStorage.getItem("pid"), {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t")
                }
            })

            const username = await usernameStream.text();

            if (username == null || username == undefined) {
                window.location.href = "https://localhost:44389/";
            }

            return username;
        } catch (err) {
        }
    }

    setProfileLink() {
        this.getProfileUsername().then((username) => {
            document.getElementById("header-avatar-link").setAttribute("href", "/profile/getprofile/" + username);
            document.getElementById("header-username").setAttribute("href", "/profile/getprofile/" + username);
        })
    }

    setSettingsLink() {
        document.getElementById("header-settings-link").setAttribute("href", "/settings/getsettings/" + window.localStorage.getItem("pid"));
    }

    logoutEventListener() {
        document.getElementById("header-logout").addEventListener("click", () => {
            //Instance created in page load function.
            firebaseInstance.firebaseLogout();
        })
    }
}