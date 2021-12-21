import Game from './Game.js';

class Library {
    constructor() {
        this.libraryBoardgames = [];
    }

    async getUserBoardgames() {
        this.libraryBoardgames = await fetch('https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/boardgames')
            .then(response => response.json())
            .then(data => data.map(boardgame => new Game(boardgame)));
    }

    async showUserBoardgames() {
        document.getElementById("libraryContainer").innerHTML = "";
        this.libraryBoardgames.forEach(element => {
            document.getElementById("libraryContainer").insertAdjacentHTML('beforeend', element.getHtmlString());
        })
    }

    async retrieveNewGames(searchString) {
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
                const check = await this.checkGameInLibrary(game.id);
                let htmlString = `<div class="newGame" data-id="${game.id}">
                <div class="newGameImgContainer">
                    <img src="${game.images.small}"
                        alt="" class="newGameImg">
                </div>
                <div class="newGameName">
                    <p>${game.name}</p>
                </div>
                <div class="newGameAdd">
                    <button class="hexagon addGameBtn ${check?'addedGame':''}" data-id="${game.id}">${check?'<i class="fas fa-check"></i>':'<i class="fas fa-plus"></i>'}</button>
                </div>
            </div>`;
                resultContainer.insertAdjacentHTML("beforeend", htmlString);
            }
            await this.initAddBtns(searchResult);
        }
    }

    async initAddBtns(searchResult) {
        let newGameContainer = document.getElementById("newGameResults");
        newGameContainer.addEventListener("click", async (e) => {
            e.preventDefault();
            let btn = e.target.closest(".addGameBtn");
            if (btn) {
                let gameId = btn.getAttribute("data-id");
                if (!await this.checkGameInLibrary(gameId)) {
                    let game = searchResult.filter(game => game.id == gameId)[0];
                    let body = {
                        boardgame: game
                    };
                    await fetch('https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/boardgames', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
                    await this.getUserBoardgames();
                    console.log(this.libraryBoardgames);
                    await this.showUserBoardgames();
                }
            }
        });

    }

    async checkGameInLibrary(gameId) {
        return this.libraryBoardgames.some(game => game.id == gameId);
    }
}

export default Library;