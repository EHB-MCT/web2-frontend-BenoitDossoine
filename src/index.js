'use strict';
import GamenightList from "./GamenightList";
import Library from "./Library.js";
import Gamenight from "./Gamenight";

import * as form from "./form"

import "../node_modules/@fortawesome/fontawesome-free/js/brands.js";
import "../node_modules/@fortawesome/fontawesome-free/js/solid.js";
import "../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js";

const lodash = require('lodash');

// let loader = document.getElementById("loader");
// setTimeout(() => {
//     loader.classList.add("loaded");
//     setTimeout(() => {
//         loader.remove();
//     }, 1100);
// }, Math.random() * (4000 - 2000) + 2000);

window.onload = async function () {
    console.log("Window loaded!");
    //Add eventlisteners to buttons on homepage
    document.getElementById("addGameNight").addEventListener("click", (e) => {
        document.getElementById("gamenightOverview").style.display = "none";
        document.getElementById("gamenightMaker").style.display = "flex";
        form.reset(library.libraryCategories);
        form.showTabs(0);
    })

    document.getElementById("gamenightsLink").addEventListener("click", function (e) {
        document.getElementById("gamenightOverview").style.display = "block";
        document.getElementById("gamenightMaker").style.display = "none";
        document.getElementById("library").style.display = "none";
        document.getElementById("gamenights").style.display = "none";
        initGamenightTiles();
    })

    document.getElementById("libraryLink").addEventListener("click", function (e) {
        document.getElementById("gamenightOverview").style.display = "none";
        document.getElementById("gamenightMaker").style.display = "none";
        document.getElementById("library").style.display = "block";
        document.getElementById("gamenights").style.display = "none";
    })

    document.getElementById("newGame").addEventListener("click", function (e) {
        document.getElementById("newGameForm").style.display = "grid";
        document.getElementById("libraryContainer").style.display = "none";
    })

    document.getElementById("newGameSearch").addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchString = document.getElementById("newGameSearchInput").value;
        await library.retrieveNewGames(searchString);
    })

    document.getElementById("exitNewGameForm").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("newGameSearchInput").value = "";
        document.getElementById("newGameResults").innerHTML = "";
        document.getElementById("newGameForm").style.display = "none";
        document.getElementById("libraryContainer").style.display = "grid";
    })

    const library = new Library;
    await library.getUserBoardgames();
    await library.showUserBoardgames();
    await library.getCategories();

    const gamenightList = new GamenightList;
    await gamenightList.init();
    await gamenightList.showUserGamenights();
    initGamenightTiles();

    form.init();
    console.log("Page fully loaded")
    removeLoader();
}

function initGamenightTiles() {
    document.getElementById("gamenightContainer").addEventListener("click", async function (e) {
        e.preventDefault();
        let tile = e.target.closest(".gamenightTile");
        if (tile) {
            const gamenightId = tile.getAttribute("id");
            let gamenight = await fetch(`https://web2-gamenightapp-api.herokuapp.com/user/61b25e0da1a92d69d4d3fca5/gamenights/${gamenightId}`)
                .then(response => response.json())
                .then(data => new Gamenight(data));

            document.getElementById("gamenights").style.display = "block";
            document.getElementById("gamenightOverview").style.display = "none";
            document.getElementById("gamenights").innerHTML = gamenight.getGamenightHtml();
        }

    })
}

function removeLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("loaded");
    setTimeout(() => {
        loader.remove();
    }, 1100);
}