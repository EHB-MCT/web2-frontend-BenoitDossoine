import Library from "./Library";
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

    // Html for homepage
    getTileHtml() {
        const htmlString =
            `<li class="hex-grid__item gamenightTile" id="${this.id}">
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

    // Html for gamenight details
    getGamenightHtml() {
        const htmlString =
            `<article class="gamenightCard">
        <h1>${this.name}</h1>
        <div class="gamenightCardPractical">
        <div class="gamenightCardTime">
                <div class="hexagon">
                        <i class="fas fa-clock"></i>
                </div>
            <p>
                ${this.date}
                ${this.time}
            </p>
        </div>
        <div class="gamenightCardAddress">
                <div class="hexagon">
                        <i class="fas fa-map-marker"></i>
                </div>
            <p>
                ${this.location}
            </p>
        </div>
        </div>
        <div class="gamenightCardGuests">
            <p>Players</p>
            <div>` +
            this.showPlayers() +
            `</div>
        </div>
        <h2>Games</h2>
        <div class="gamenightCardGames">` +
            this.showGames() + `
        </div>
    </article>`
        return htmlString;
    }

    // Gives the tiles a random color on the homepage
    getRandomColor() {
        let tileColors = ['stone', 'water', 'sand', 'forest'];
        return tileColors[Math.floor(Math.random() * tileColors.length)];
    }

    //Show an amount of hexagons corresponding to the amount of players
    showPlayers() {
        let htmlString = '<div class="hexagon"><i class="fa fa-user"></i></div>'.repeat(this.playerAmount);
        return htmlString;
    }

    showGames() {
        let htmlString = ''
        for (let game of this.games) {
            htmlString += ` <div class="gamenightGame">
            <div class="gamenightImgContainer">
                <img src="${game.imgUrl}" alt="Image of ${game.name}">
            </div>
            <div>
                <h3>${game.name}</h3>
                <dl>
                    <dt>Players</dt>
                    <dd>${game.minPlayers} - ${game.maxPlayers}</dd>
                    <dt>Duration</dt>
                    <dd>${game.playtime} min</dd>
                </dl>
            </div>
        </div>`
        }
        return htmlString
    }
}

export default Gamenight;