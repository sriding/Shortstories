class Home {
    constructor() { }

    static getUsersData = async () => {
        const userDataStream = await fetch("https://localhost:44389/api/UserModels/", {
            method: "GET",
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + window.localStorage.getItem("t")
            }
        })

        console.log(userDataStream);
    }
}
