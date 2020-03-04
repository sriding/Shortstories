class Home {
    constructor() { }

    static getUsersData = async () => {
        const userDataStream = await fetch("https://localhost:44389/api/ProfileModels/stevetorn", {
            method: "GET",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t")
            }
        })

        const userData = userDataStream.json();
        return userData;
    }
}
