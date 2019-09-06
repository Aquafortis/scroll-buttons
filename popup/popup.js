/*! @preserve
 * Copyright (c) 2019 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        distancedn: document.querySelector("#distancedn").value,
        buttons: document.querySelector("#buttons").value
    });
    setTimeout(function() {
        window.close();
    }, 100);
}

let options = document.getElementById("options");
options.addEventListener("click", () => {
    browser.runtime.openOptionsPage();
});

function restoreOptions() {

    function setOptions(res) {
        document.querySelector("#distancedn").value = res.distancedn || 900;
        document.querySelector("#buttons").value = res.buttons || "Show";
    }

    let list = [
        "distancedn",
        "buttons"
    ];

    let getoptions = browser.storage.sync.get(list);
    getoptions.then(setOptions);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
