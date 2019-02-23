function tweet(status) {
    var param = {
        tweet:
            {
                status: status
            }
    };
    var url = "http://localhost:3000/tweets";
    fetch(url, {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.arrayBuffer())
        .then((data) => {
            console.log(data);
        });
}
