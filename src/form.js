"use strict";

const {
    default: Gamenight
} = require('./Gamenight');

let tabNumber;
//reset function otherwise the form retains the info from last time
function reset(categories) {
    tabNumber = 0;
    //Reset the amount of players
    document.getElementById("numberContainer").innerHTML = '<div class="hexagon"></div><div class="hexagon"></div>';
    document.getElementById("playersInput").value = 2;

    document.getElementById("timeInput").value = 60;
    document.getElementById("timeContainer").getElementsByTagName("span")[0].innerHTML = '60';

    let categoryCheckboxes = document.getElementsByClassName("formCategory")
    for (let checkbox of categoryCheckboxes) {
        checkbox.checked = false;
    }

    fillFormCategories(categories);

    document.getElementById("gamenightName").value = "";
    document.getElementById("gamenightLocation").value = "";
    document.getElementById("gamenightTime").value = "";
    document.getElementById("gamenightDate").value = "";
}

function init() {
    //Set event listeners of form
    document.getElementById("addPlayerButton").addEventListener("click", function (e) {
        e.preventDefault();
        addPlayer();
    });
    document.getElementById("removePlayerButton").addEventListener("click", function (e) {
        e.preventDefault();
        removePlayer();
    });
    document.getElementById("addTimeButton").addEventListener("click", function (e) {
        e.preventDefault();
        addTime();
    });
    document.getElementById("removeTimeButton").addEventListener("click", function (e) {
        e.preventDefault();
        removeTime();
    });
    document.getElementById("formPrevious").addEventListener("click", function (e) {
        e.preventDefault();
        tabNumber--;
        showTabs(tabNumber);
    })
    document.getElementById("formNext").addEventListener("click", function (e) {
        e.preventDefault();
        tabNumber++;
        showTabs(tabNumber);
    })
    document.getElementById("formSubmit").addEventListener("click", async function (e) {
        e.preventDefault();
        let newGamenight = await makeGamenight();

        // Only do the following if we get a correct response back from the backend
        if (newGamenight) {
            document.getElementById("gamenights").style.display = "block";
            document.getElementById("gamenightMaker").style.display = "none";
            document.getElementById("gamenights").innerHTML = newGamenight.getGamenightHtml();
            document.getElementById("gamenightContainer").insertAdjacentHTML("beforeend", newGamenight.getTileHtml());
        }
    })
}

// function to only display the boardgame categories present in the library on the form
// getCategoryIcon gives the correct icon for each category, based on the category name 
function fillFormCategories(categories) {
    document.getElementById("categoryContainer").innerHTML = "";
    for (let category of categories) {
        const html = `<input type="checkbox" name="${category.name.toLowerCase()}" id="${category.name.toLowerCase()}" class="formCategory" value="${category._id}">
        <label for="${category.name.toLowerCase()}" class="hexagon">${getCategoryIcon(category.name)}
            <p style="font-size:${category.name.length>11?20:30}px">${category.name}</p>
        </label>`
        document.getElementById("categoryContainer").insertAdjacentHTML('beforeend', html);
    }
}

function addPlayer() {
    if (document.getElementById("playersInput").value < 8) {
        document.getElementById("playersInput").value++;
        document.getElementById("numberContainer").insertAdjacentHTML('beforeend', '<div class="hexagon"></div>');
    }
}

function removePlayer() {
    if (document.getElementById("playersInput").value > 2) {
        document.getElementById("playersInput").value--;
        document.getElementById("numberContainer").removeChild(document.getElementById("numberContainer").lastChild);
    }
}

function addTime() {
    document.getElementById("timeInput").value = parseInt(document.getElementById("timeInput").value) + 30;
    document.getElementById("timeContainer").getElementsByTagName("span")[0].innerHTML = document.getElementById("timeInput").value;
}

function removeTime() {
    if (document.getElementById('timeInput').value > 30) {
        document.getElementById("timeInput").value = parseInt(document.getElementById("timeInput").value) - 30;
        document.getElementById("timeContainer").getElementsByTagName("span")[0].innerHTML = document.getElementById("timeInput").value;
    }
}

// function to show the different steps of the form
function showTabs(n) {
    const tabs = document.getElementsByClassName("tab");

    for (let tab of tabs) {
        tab.style.display = "none";
    }
    document.getElementsByClassName("tab")[n].style.display = "block";

    if (n == 0) {
        // on first step, disable the 'back' button
        document.getElementById("formPrevious").disabled = true;
    } else {
        document.getElementsByClassName("tab")[n - 1].style.display = "none";
        document.getElementById("formPrevious").disabled = false;
    }

    if (n == document.getElementsByClassName("tab").length - 1) {
        // on last step, remove 'next' button and replace by 'submit' button
        document.getElementById("formNext").style.display = "none";
        document.getElementById("formSubmit").style.display = "block";
    } else {
        document.getElementsByClassName("tab")[n + 1].style.display = "none";
        document.getElementById("formNext").style.display = "block";
        document.getElementById("formSubmit").style.display = "none";
    }
}

async function makeGamenight() {
    let gamenight = retrieveFormData();
    gamenight.ownerId = "61b25e0da1a92d69d4d3fca5";
    let response = await fetch('https://web2-gamenightapp-api.herokuapp.com/gamenights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gamenight)
    });

    if (response.status == "204") {
        // this means we got back an empty boardgame collection for the selected parameters
        alert('There are no games in your library that fit your parameters.');
    } else if (response.status == "400") {
        // missing form elements
        alert('Please fill in the form correctly.');
    } else if (response.ok) {
        gamenight = await response.json();
        const builtGamenight = new Gamenight(gamenight);
        return builtGamenight;
    }
}

function retrieveFormData() {
    let amountOfPlayers = document.getElementById("playersInput").value;
    let duration = document.getElementById("timeInput").value;
    let allCategories = document.getElementsByClassName("formCategory");
    let chosenCategories = [];

    for (let category of allCategories) {
        if (category.checked) {
            chosenCategories.push(category.value);
        };
    }

    let name = document.getElementById("gamenightName").value;
    let location = document.getElementById("gamenightLocation").value;
    let time = document.getElementById("gamenightTime").value;
    let date = document.getElementById("gamenightDate").value;

    return {
        name: name,
        location: location,
        time: time,
        date: date,
        amountOfPlayers: amountOfPlayers,
        duration: duration,
        categories: chosenCategories
    }
}

// function to get the correct icon for the correct category
function getCategoryIcon(category) {
    let icon = '';
    switch (category) {
        case "Adventure":
            icon = '<i class="fas fa-binoculars"></i>'
            break;
        case "Fantasy":
            icon = '<i class="fas fa-dragon"></i>'
            break;
        case "Combat":
            icon = '<i class="fas fa-fist-raised"></i>'
            break;
        case "Horror":
            icon = '<i class="fas fa-ghost"></i>'
            break;
        case "Competitive":
            icon = '<i class="fas fa-trophy"></i>'
            break;
        case "Cooperation":
            icon = '<i class="fas fa-users"></i>'
            break;
        default:
            icon = `<i>${category.charAt(0)}</i>`
    }
    return icon;
}

module.exports = {
    init,
    reset,
    showTabs
}