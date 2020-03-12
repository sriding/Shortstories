class Profile {
    constructor() {

    }

    followButtonAddEventListeners() {
        document.getElementById("profile-follow-button").addEventListener("click", (e) => {
            this.sendFollowRequest(e.target.value).then(() => {
                console.log("Follower request complete.");
            });
        })
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

        console.log(followerRequestResult);
    }
}