function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        distancedn: document.querySelector("#distancedn").value
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

    function setDistanceDn(result) {
        document.querySelector("#distancedn").value = result.distancedn || 900;
    }

    let getdistancedn = browser.storage.sync.get("distancedn");
    getdistancedn.then(setDistanceDn);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
