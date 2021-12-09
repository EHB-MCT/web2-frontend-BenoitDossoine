import Gamenight from "./Gamenight.js";
import "../node_modules/@fortawesome/fontawesome-free/js/brands.js";
import "../node_modules/@fortawesome/fontawesome-free/js/solid.js";
import "../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js";

// let loader = document.getElementById("loader");
// setTimeout(() => {
//     loader.classList.add("loaded");
//     setTimeout(() => {
//         loader.remove();
//     }, 1100);
// }, Math.random() * (4000 - 2000) + 2000);

window.onload = function () {
    console.log("Window loaded!");

    //Add eventlisteners to buttons on homepage
    document.getElementById("addGameNight").addEventListener("click", (e) => {
        document.getElementById("gamenightOverview").style.display = "none";
        document.getElementById("gamenightMaker").style.display = "flex";

        let tabNumber = 0;

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


        showTabs(0);
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

function makeGamenight() {
    let gamenight = retrieveFormData();
    console.log(gamenight);

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

    return new Gamenight(name, amountOfPlayers, duration, chosenCategories, location, time, date);


}