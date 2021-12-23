class Game {
    constructor(game) {
        this.id = game._id;
        this.name = game.name;
        this.imgUrl = game.imgUrl;
        this.minPlayers = game.minPlayers;
        this.maxPlayers = game.maxPlayers;
        this.playTime = game.playtime;
        this.description = game.description;
        this.categoryIds = game.categories;
        this.categories = [];
        this.htmlString = "";
        this.shortHtmlString = "";
    }

    // Html for library page
    getHtmlString() {
        this.htmlString = `<article class="game" data-id="${this.id}">
        <div class="gameImgContainer">
            <img src="${this.imgUrl}" alt="" class="gameImg">
        </div>
        <div class="gameStats">
            <h1>${this.name}</h1>
            <p>${this.description.substring(0,250)}...</p> <a>See more</a>
            <div class="gamePlayers">
                <h2>Players:</h2>
                <p>${this.minPlayers} to ${this.maxPlayers} players</p>
            </div>
            <div class="gameDuration">
                <h2>Duration:</h2>
                <p>${this.playTime} min</p>
            </div>
        </div>
        <button class="hexagon deleteLibraryGame" data-id="${this.id}"><i class="fas fa-trash"></i></button>
    </article>`;
        return this.htmlString;
    }

}

export default Game;