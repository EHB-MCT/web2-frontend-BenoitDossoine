import Game from './Game.js';
const lodash = require('lodash');

class Library {
    constructor() {
        this.libraryBoardgames = [];
        this.libraryCategories = [];
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
        this.initBtns();
    }

    async getCategories() {
        for (let boardgame of this.libraryBoardgames) {
            this.libraryCategories = lodash.flatten(lodash.concat([this.libraryCategories], boardgame.categoryIds));
        }
        this.libraryCategories = lodash.uniq(this.libraryCategories)
        let allCategories = await fetch('https://web2-gamenightapp-api.herokuapp.com/categories')
            .then(response => response.json())
        this.libraryCategories = allCategories.filter(category => this.libraryCategories.some(categoryId => categoryId == category._id));
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

            //Limit the results to 6 boardgames
            searchResult = searchResult.splice(0, 6);

            for (let game of searchResult) {
                //Check if the game is already present in the library
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

    // add an event listener to all the add buttons of the games retrieved
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
                    game = await fetch('https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/boardgames', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        })
                        .then(response => response.json())
                        .then(data => this.libraryBoardgames.push(new Game(data)));
                    await this.showUserBoardgames();
                    await this.getCategories();
                    btn.classList.add("addedGame");
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                }
            }
        });

    }

    async checkGameInLibrary(gameId) {
        return this.libraryBoardgames.some(game => game.id == gameId);
    }

    // init the delete buttons
    async initBtns() {
        const boardgamesContainer = document.getElementById("libraryContainer");
        boardgamesContainer.addEventListener("click", async (e) => {
            e.preventDefault();
            const deleteBtn = e.target.closest(".deleteLibraryGame");
            if (deleteBtn) {
                let gameId = deleteBtn.getAttribute("data-id");
                await fetch(`https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/boardgames/${gameId}`, {
                    method: 'DELETE'
                });

                this.libraryBoardgames = this.libraryBoardgames.filter(boardgame => boardgame.id != gameId);
                await this.showUserBoardgames();
            }

            const infoBtn = e.target.closest(".gameInfoLink")
            const lessBtn = e.target.closest(".lessInfo")

            if (infoBtn) {
                let id = infoBtn.getAttribute("data-id");
                document.getElementById(`info${id}`).innerHTML = this.libraryBoardgames.filter(boardgame => boardgame.id == id)[0].description;
                infoBtn.style.display = "none";
                document.getElementById(`less${id}`).style.display = "block";
            }

            if (lessBtn) {
                let id = lessBtn.getAttribute("data-id");
                document.getElementById(`info${id}`).innerHTML = this.libraryBoardgames.filter(boardgame => boardgame.id == id)[0].description.substring(0, 250) + "...";

                lessBtn.style.display = "none";
                document.getElementById(`more${id}`).style.display = "block";
            }

        })
    }
}
export default Library;