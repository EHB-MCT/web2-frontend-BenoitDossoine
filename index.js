let loader = document.getElementById("loader");
setTimeout(() => {
    loader.classList.add("loaded");
    setTimeout(() => {
        loader.remove();
    }, 1100);
}, Math.random() * (4000 - 2000) + 2000);

window.onload = function () {
    console.log("Window loaded!");

    //Add eventlisteners to buttons on homepage
    document.getElementById("addGameNight").addEventListener("click", (e) => {
        document.getElementById("gamenightOverview").style.display = "none";
        document.getElementById("gamenightMaker").style.display = "flex";

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