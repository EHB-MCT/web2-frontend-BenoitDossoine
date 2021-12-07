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
        console.log("Game night added!")
    })
}