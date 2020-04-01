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
            });
        })
    }

    unfollowButtonAddEventListners() {
        this.unfollowButton.addEventListener("click", (e) => {
            this.removeFollow(e.target.value);
        })
    }

    hideButtons() {
        this.followButton.style.display = "none";
        this.unfollowButton.style.display = "none";
    }

    async sendFollowRequest(followerId) {
        const followerRequest = await fetch(window.location.origin + "/api/followersmodels", {
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

    async removeFollow(followerId) {
        const removeRequest = await fetch(window.location.origin + "/api/followersmodels/" + window.localStorage.getItem("uid") + "/" + followerId, {
            method: "DELETE",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t"),
                "Content-Type": "application/json"
            },
        })

        const removeRequestResponse = await removeRequest.json();

        window.location.reload();
    }

    async checkIfUserIsAFriend() {
        const myProfileId = window.localStorage.getItem("pid");
        const userProfileId = this.followButton.value || this.unfollowButton.value;
        if (myProfileId === userProfileId) {
            this.hideButtons();
            return null;
        }

        const checkIfFriendStream = await fetch(window.location.origin + "/api/followersmodels/" + myProfileId + "/" + userProfileId, {
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
            return null;
        }
    }
}