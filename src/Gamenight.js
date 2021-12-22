class Gamenight {
    constructor(gamenight) {
        this.id = gamenight._id;
        this.name = gamenight.name;
        this.playerAmount = gamenight.amountOfPlayers;
        this.duration = gamenight.duration;
        this.categories = gamenight.categories;
        this.location = gamenight.location;
        this.time = gamenight.time;
        this.date = gamenight.date;
        this.games = gamenight.games;
        this.color = this.getRandomColor();
    }

    getTileHtml() {
        const htmlString =
            `<li class="hex-grid__item" id="${this.id}">
                <div class="hex-grid__content hex-gamenight ${this.color}">
                    <h3>${this.name}</h3>
                    <div class="homeGameNightInfo">
                        <p>${this.date}</p>
                        <p>${this.location}</p>
                        <p>${this.time}</p>
                    </div>
                </div>
            </li>`
        return htmlString;
    }

    getRandomColor() {
        let tileColors = ['stone', 'water', 'sand', 'forest'];
        return tileColors[Math.floor(Math.random() * tileColors.length)];
    }

    buildGamenight() {
        console.log(this.name, this.duration);
    }
}

export default Gamenight;