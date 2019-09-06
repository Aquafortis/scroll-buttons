/*! @preserve
 * Copyright (c) 2019 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        appear: document.querySelector("#appear").value,
        distanceup: document.querySelector("#distanceup").value,
        distancedn: document.querySelector("#distancedn").value,
        buttons: document.querySelector("#buttons").value
    });
}

function restoreOptions() {

    function setOptions(res) {
        document.querySelector("#appear").value = res.appear || 300;
        document.querySelector("#distanceup").value = res.distanceup || 900;
        document.querySelector("#distancedn").value = res.distancedn || 900;
        document.querySelector("#buttons").value = res.buttons || "Show";
    }

    let list = [
        "appear",
        "distanceup",
        "distancedn",
        "buttons"
    ];

    let getoptions = browser.storage.sync.get(list);
    getoptions.then(setOptions);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
