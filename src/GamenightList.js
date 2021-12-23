import Gamenight from "./Gamenight.js";
import * as form from "./form"

class GamenightList {
    constructor() {
        this.gamenights = [];
    }

    async init() {
        this.gamenights = await this.getUserGamenights();
    }

    async getUserGamenights() {
        const userGamenights = await fetch('https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/gamenights')
            .then(response => response.json())
            .then(data => {
                data.forEach((element, index) => {
                    data[index] = new Gamenight(element);
                })
                return data;
            });
        return userGamenights;
    }

    async showUserGamenights() {
        this.gamenights.forEach(element => {
            document.getElementById("gamenightContainer").insertAdjacentHTML('beforeend', element.getTileHtml())
        });
    }

}

export default GamenightList;