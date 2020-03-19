class Profile {
    profileViewId = null;
    followButton = null;
    unfollowButton = null;

    constructor() {
        this.profileViewId = document.getElementById("profile-view-page") || null;
        this.followButton = document.getElementById("profile-follow-button") || null;
        this.unfollowButton = document.getElementById("profile-unfollow-button") || null;
    }

    get profileViewId() {
        return profileViewId;
    }

    displayProfileAvatar() {
        const profileAvatar = document.getElementById("profile-view-user-avatar");
        profileAvatar.src = "/images/" + profileAvatar.alt + ".png";
    }

    followButtonAddEventListeners() {
        this.followButton.addEventListener("click", (e) => {
            this.sendFollowRequest(e.target.value).then(() => {
                console.log("Follower request complete.");
            });
        })
    }

    hideButtons() {
        this.followButton.style.display = "none";
        this.unfollowButton.style.display = "none";
    }

    async sendFollowRequest(followerId) {
        const followerRequest = await fetch("https://localhost:44389/api/followersmodels", {
            method: "POST",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "FollowersId": followerId,
                "ProfileId": window.localStorage.getItem("pid")
            })
        })

        const followerRequestResult = await followerRequest.text();

        window.location.reload();
    }

    async checkIfUserIsAFriend() {
        const myProfileId = window.localStorage.getItem("pid");
        const userProfileId = this.followButton.value || this.unfollowButton.value;
        const checkIfFriendStream = await fetch("https://localhost:44389/api/followersmodels/" + myProfileId + "/" + userProfileId, {
            method: "GET",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t"),
                "Content-Type": "application/json"
            },
        })

        const checkIfFriend = await checkIfFriendStream.text();

        if (checkIfFriend === "friend") {
            this.followButton.classList.add("profile-hide-button");
            this.unfollowButton.classList.remove("profile-hide-button");
        } else {
            return;
        }
    }
}