"use strict";
let tabNumber;
//reset function otherwise the form retains the info from last time
function reset() {
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
    document.getElementById("formSubmit").addEventListener("click", function (e) {
        e.preventDefault();
        makeGamenight();
    })
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

function showTabs(n) {
    const tabs = document.getElementsByClassName("tab");
    for (let tab of tabs) {
        tab.style.display = "none";
    }
    document.getElementsByClassName("tab")[n].style.display = "block";

    if (n == 0) {
        document.getElementById("formPrevious").disabled = true;
    } else {
        document.getElementsByClassName("tab")[n - 1].style.display = "none";
        document.getElementById("formPrevious").disabled = false;
    }

    if (n == document.getElementsByClassName("tab").length - 1) {
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
    console.log(gamenight);
    let response = await fetch('https://web2-gamenightapp-api.herokuapp.com/gamenights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gamenight)
    });
    let result = await response.json();
}

function retrieveFormData() {
    let amountOfPlayers = document.getElementById("playersInput").value;
    let duration = document.getElementById("timeInput").value;
    let allCategories = document.getElementsByClassName("formCategory");
    let chosenCategories = [];

    for (let category of allCategories) {
        if (category.checked) {
            chosenCategories.push(category.id);
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

module.exports = {
    reset,
    init,
    showTabs
}