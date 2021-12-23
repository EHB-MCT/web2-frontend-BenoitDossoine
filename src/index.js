'use strict';
import Gamenight from "./Gamenight.js";
import Game from "./Game.js";
import Library from "./Library.js";

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

    initGamenights();
    form.init();
}

async function initGamenights() {
    const userGamenights = await getUserGamenights();
    showUserGamenights(userGamenights);
}

async function getUserGamenights() {
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

async function showUserGamenights(userGamenights) {
    userGamenights.forEach(element => {
        document.getElementById("gamenightContainer").insertAdjacentHTML('beforeend', element.getTileHtml())
    });
}