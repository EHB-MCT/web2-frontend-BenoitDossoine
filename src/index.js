'use strict';
import Gamenight from "./Gamenight.js";
import Game from "./Game.js";
import "../node_modules/@fortawesome/fontawesome-free/js/brands.js";
import "../node_modules/@fortawesome/fontawesome-free/js/solid.js";
import "../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js";


// let loader = document.getElementById("loader");
// setTimeout(() => {
//     loader.classList.add("loaded");
//     setTimeout(() => {
//         loader.remove();
//     }, 1100);
// }, Math.random() * (4000 - 2000) + 2000);

window.onload = function () {
    console.log("Window loaded!");

    //Add eventlisteners to buttons on homepage
    document.getElementById("addGameNight").addEventListener("click", (e) => {
        document.getElementById("gamenightOverview").style.display = "none";
        document.getElementById("gamenightMaker").style.display = "flex";

        let tabNumber = 0;

        //Set event listeners of form
        document.getElementById("addPlayerButton").addEventListener("click", function (e) {
            e.preventDefault();
            addPlayer();
        });
        document.getElementById("removePlayerButton").addEventListener("click", function (e) {
            e.preventDefault();
            removePlayer();
        });
        document.getElementById("addTimeButton").addEventListener("click", function (e) {
            e.preventDefault();
            addTime();
        });
        document.getElementById("removeTimeButton").addEventListener("click", function (e) {
            e.preventDefault();
            removeTime();
        });
        document.getElementById("formPrevious").addEventListener("click", function (e) {
            e.preventDefault();
            tabNumber--;
            showTabs(tabNumber);
        })
        document.getElementById("formNext").addEventListener("click", function (e) {
            e.preventDefault();
            tabNumber++;
            showTabs(tabNumber);
        })
        document.getElementById("formSubmit").addEventListener("click", function (e) {
            e.preventDefault();
            makeGamenight();
        })

        showTabs(0);
    })

    document.getElementById("gamenightsLink").addEventListener("click", function (e) {
        document.getElementById("gamenightOverview").style.display = "block";
        document.getElementById("gamenightMaker").style.display = "none";
        document.getElementById("library").style.display = "none";
    })

    document.getElementById("libraryLink").addEventListener("click", function (e) {
        document.getElementById("gamenightOverview").style.display = "none";
        document.getElementById("gamenightMaker").style.display = "none";
        document.getElementById("library").style.display = "block";
    })

    document.getElementById("newGame").addEventListener("click", function (e) {
        document.getElementById("newGameForm").style.display = "grid";
        document.getElementById("libraryContainer").style.display = "none";
    })

    document.getElementById("newGameSearch").addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchString = document.getElementById("newGameSearchInput").value;
        await retrieveNewGames(searchString);
    })

    document.getElementById("exitNewGameForm").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("newGameSearchInput").value = "";
        document.getElementById("newGameResults").innerHTML = "";
        document.getElementById("newGameForm").style.display = "none";
        document.getElementById("libraryContainer").style.display = "grid";
    })

    initLibrary();
}

function addPlayer() {
    if (document.getElementById("playersInput").value < 8) {
        document.getElementById("playersInput").value++;
        document.getElementById("numberContainer").insertAdjacentHTML('beforeend', '<div class="hexagon"></div>');
    }
}

function removePlayer() {
    if (document.getElementById("playersInput").value > 2) {
        document.getElementById("playersInput").value--;
        document.getElementById("numberContainer").removeChild(document.getElementById("numberContainer").lastChild);
    }
}

function addTime() {
    document.getElementById("timeInput").value = parseInt(document.getElementById("timeInput").value) + 30;
    document.getElementById("timeContainer").getElementsByTagName("span")[0].innerHTML = document.getElementById("timeInput").value;
}

function removeTime() {
    if (document.getElementById('timeInput').value > 30) {
        document.getElementById("timeInput").value = parseInt(document.getElementById("timeInput").value) - 30;
        document.getElementById("timeContainer").getElementsByTagName("span")[0].innerHTML = document.getElementById("timeInput").value;
    }
}

function showTabs(n) {
    document.getElementsByClassName("tab")[n].style.display = "block";

    if (n == 0) {
        document.getElementById("formPrevious").disabled = true;
    } else {
        document.getElementsByClassName("tab")[n - 1].style.display = "none";
        document.getElementById("formPrevious").disabled = false;
    }

    if (n == document.getElementsByClassName("tab").length - 1) {
        document.getElementById("formNext").style.display = "none";
        document.getElementById("formSubmit").style.display = "block";
    } else {
        document.getElementsByClassName("tab")[n + 1].style.display = "none";
        document.getElementById("formNext").style.display = "block";
        document.getElementById("formSubmit").style.display = "none";
    }
}

function makeGamenight() {
    let gamenight = retrieveFormData();
    gamenight.buildGamenight();

}

function retrieveFormData() {
    let amountOfPlayers = document.getElementById("playersInput").value;
    let duration = document.getElementById("timeInput").value;
    let allCategories = document.getElementsByClassName("formCategory");
    let chosenCategories = [];

    for (let category of allCategories) {
        if (category.checked) {
            chosenCategories.push(category.id);
        };
    }

    let name = document.getElementById("gamenightName").value;
    let location = document.getElementById("gamenightLocation").value;
    let time = document.getElementById("gamenightTime").value;
    let date = document.getElementById("gamenightDate").value;

    return new Gamenight(name, amountOfPlayers, duration, chosenCategories, location, time, date);
}

async function retrieveNewGames(searchString) {
    console.log(searchString);
    const resultContainer = document.getElementById("newGameResults");
    resultContainer.innerHTML = "";
    if (searchString == "") {
        resultContainer.innerHTML = '<p>Start typing to get results</p>';
    } else {
        const base_url = "https://api.boardgameatlas.com/api/search?pretty=true&client_id=gFnN3Fklrw&name="
        let searchResult = await fetch(base_url + searchString)
            .then(response => response.json())
            .then(data => data.games);
        searchResult = searchResult.splice(0, 6);
        for (let game of searchResult) {
            let htmlString = `<div class="newGame" data-id="${game.id}">
            <div class="newGameImgContainer">
                <img src="${game.images.small}"
                    alt="" class="newGameImg">
            </div>
            <div class="newGameName">
                <p>${game.name}</p>
            </div>
            <div class="newGameAdd">
                <button class="hexagon addGameBtn" data-id="${game.id}"><i class="fas fa-plus"></i></button>
            </div>
        </div>`;
            resultContainer.insertAdjacentHTML("beforeend", htmlString);
        }
        initAddBtns(searchResult);
    }

}

function initAddBtns(searchResult) {

    let addBtns = document.getElementsByClassName("addGameBtn");
    for (let addBtn of addBtns) {
        addBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            let gameId = addBtn.getAttribute("data-id");
            let game = searchResult.filter(game => game.id == gameId)[0];
            let body = {
                boardgame: game
            };
            console.log(game)
            const result = await fetch('https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/boardgames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            console.log(result);
        })
    }
}
async function initLibrary() {
    const userBoardgames = await getGames();
    showGames(userBoardgames);
}

async function getGames() {
    const userBoardgamesId = await fetch('https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/boardgames')
        .then(response => response.json());
    let userBoardgames = [];
    for (let userBoardgameId of userBoardgamesId) {
        const userBoardgame = new Game(await fetch(`https://web2-gamenightapp-api.herokuapp.com/boardgames/${userBoardgameId}`)
            .then(response => response.json()));
        userBoardgame.getHtmlString();
        userBoardgames.push(userBoardgame);
    }
    return userBoardgames;
}

async function showGames(userBoardgames) {
    userBoardgames.forEach(element => {
        document.getElementById("libraryContainer").insertAdjacentHTML('beforeend', element.htmlString);
    })
}