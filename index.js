let loader = document.getElementById("loader");
setTimeout(() => {
    loader.classList.add("loaded");
    setTimeout(() => {
        loader.remove();
    }, 1100);
}, Math.random() * (4000 - 2000) + 2000);
