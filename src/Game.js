class Game {
    constructor(game) {
        this.id = game._id;
        this.name = game.name;
        this.imgUrl = game.imgUrl;
        this.minPlayers = game.minPlayers;
        this.maxPlayers = game.maxPlayers;
        this.playTime = game.playTime;
        this.description = game.description;
        this.categoryIds = game.categories;
        this.categories = [];
        this.htmlString = "";
    }

    getCategories() {
        for (let categoryId of this.categoryIds) {
            console.log(categoryId)
        }
    }

    getHtmlString() {
        this.htmlString = `<article class="game" data-id="${this.id}">
        <div class="gameImgContainer">
            <img src="${this.imgUrl}" alt="" class="gameImg">
        </div>
        <div class="gameStats">
            <h1>${this.name}</h1>
            <p>${this.description}</p>
            <div class="gamePlayers">
                <h2>Players:</h2>
                <p>${this.minPlayers} to ${this.maxPlayers} players</p>
            </div>
            <div class="gameDuration">
                <h2>Duration:</h2>
                <p>${this.playTime} min</p>
            </div>
        </div>
    </article>`;
        return this.htmlString;
    }
}

export default Game;