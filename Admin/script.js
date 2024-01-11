const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
let tr1 = "";
let tr2 = "";
const loadUsers = (e) => {
    e.preventDefault();
    let tr = "";
    const tbody = document.getElementById("tbody");
    const tbody0 = document.getElementById("tbody0");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './get-users.php', true);
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
                        <td>${data[i].id}</td>
                        <td>${data[i].nick}</td>
                        <td>${data[i].login}</td>
                        <td>${data[i].score}</td>
                        <td>${data[i].games_played}</td>
                    </tr>`;
                }
                tr1 = `
                <tr>
                    <td>ID:</td>
                    <td>NickName:</td>
                    <td>Login:</td>
                    <td>Score:</td>
                    <td>Games:</td>
                </tr>`;
            }
            tbody0.innerHTML = tr1;
            tbody.innerHTML = tr;
        } else {
            console.log("problem");
        }
    }
    xhr.send();
};

const loadGames = (e) => {
    e.preventDefault();
    let tr = "";
    const tbody = document.getElementById("tbody");
    const tbody0 = document.getElementById("tbody0");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './get-games.php', true);
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
                        <td>${data[i].id}</td>
                        <td>${data[i].status}</td>
                        <td>${data[i].initiator}</td>
                    </tr>`;
                }
                tr2 = `
                <tr>
                    <td>ID:</td>
                    <td>Status:</td>
                    <td>Initiator:</td>
                </tr>`;
            }
            tbody0.innerHTML = tr2;
            tbody.innerHTML = tr;
        } else {
            console.log("problem");
        }
    }
    xhr.send();
};
btn.addEventListener('click', loadUsers);
btn1.addEventListener('click', loadGames);