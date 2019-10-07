/*! @preserve
 * Copyright (c) 2019 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        appear: document.querySelector("#appear").value,
        distanceup: document.querySelector("#distanceup").value,
        distancedn: document.querySelector("#distancedn").value,
        buttons: document.querySelector("#buttons").value
    });
}

function restoreOptions() {
    let keys = [
        "appear",
        "distanceup",
        "distancedn",
        "buttons"
    ];
    chrome.storage.sync.get(keys, function(data) {
        document.querySelector("#appear").value = data.appear || 300;
        document.querySelector("#distanceup").value = data.distanceup || 900;
        document.querySelector("#distancedn").value = data.distancedn || 900;
        document.querySelector("#buttons").value = data.buttons || "Show";
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
