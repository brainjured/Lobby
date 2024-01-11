const loadGames = () => {
    let tr = "";
    const tbody = document.getElementById("tbody");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../methods/get-games.php', true);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.response;
            if (data.empty === "empty") {
                console.log("record not found");
            } else {
                for (var i in data) {
                    tr += `
                    <tr>
                        <td>
                            <div id="line">
                                <span id="text">
                                    ${i}. 
                                    <span id="player">${data[i].initiator} </span>
                                    <span id="status">${data[i].status} </span>
                                    <form action="../methods/join-game.php" method="POST">
                                    <input type="submit" id="join" value="join">
                                    <input type="hidden" name="id" value="${data[i].id}">
                                    </form>
                                </span>
                            </div>
                        </td>
                    </tr>
                    `;
                }
            }
            tbody.innerHTML = tr;
        } else {
            console.log("problem");
        }
    }
    xhr.send();
};

loadGames();