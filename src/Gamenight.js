class Gamenight {
    constructor(gamenightName, playerAmount, duration, categories, location, time, date) {
        this.name = gamenightName;
        this.playerAmount = playerAmount;
        this.duration = duration;
        this.categories = categories;
        this.location = location;
        this.time = time;
        this.date = date;
        this.games = [];
    }

    async buildGamenight() {
        let boardgames = await this.getBoardgames();
        console.log(boardgames);
    }

    //get all boardgames
    async getBoardgames() {
        let boardgames = await fetch("./boardgames.json")
            .then(response => response.json());

        let chosenBoardgames = [];
        for (let boardgame in boardgames) {
            for (let category of boardgames[boardgame].categories) {
                if (this.categories.includes(category)) {
                    chosenBoardgames.push(boardgames[boardgame]);
                    break;
                }
            }
        }

        return chosenBoardgames;
    }
}

export default Gamenight;