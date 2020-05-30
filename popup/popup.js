/*! @preserve
 * Copyright (c) 2020 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
        distancedn: document.querySelector("#distancedn").value,
        buttons: document.querySelector("#buttons").value
    });
    setTimeout(() => {
        window.close();
    }, 100);
}

const options = document.getElementById("options");
options.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
    setTimeout(() => {
        window.close();
    }, 100);
});

function restoreOptions() {
    let keys = [
        "distancedn",
        "buttons"
    ];
    chrome.storage.sync.get(keys, function(data) {
        document.querySelector("#distancedn").value = data.distancedn || 900;
        document.querySelector("#buttons").value = data.buttons || "Show";
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
