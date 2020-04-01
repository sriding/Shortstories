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
            return null;
        }

        const authStatusStream = await fetch(window.location.origin + `/api/usermodels/${firebaseId}/${userId}`, {
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
        const avatarUrlStream = await fetch(window.location.origin + "/api/profilemodels/avatar/" + window.localStorage.getItem("pid"), {
            method: "GET"
        });

        const avatarResponse = await avatarUrlStream.json();

        return avatarResponse.pAvatar;
    }

    setAvatar() {
        this.getAvatarUrl().then((url) => {
            document.getElementById("header-avatar-image").src = "/images/" + url + ".png";
        });
    }

    async getProfileUsername() {
        try {
            const usernameStream = await fetch(window.location.origin + "/api/profilemodels/username/" + window.localStorage.getItem("pid"), {
                method: "GET",
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("t")
                }
            })

            const username = await usernameStream.json();

            if (username == null || username == undefined) {
                window.location.href = "/";
            }

            return username.pUsername;
        } catch (err) {
            return null;
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

    static toggleHiddenMobileNavbarItems() {
        const navbarItems = Array.from(document.getElementsByClassName("navbar-hidden-on-mobile"));
        navbarItems.forEach((navbarItem) => {
            if (navbarItem.style.display === "none") {
                navbarItem.style.display = "block";
            } else {
                navbarItem.style.display = "none"
            }
        })
    }
}