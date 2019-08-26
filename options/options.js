function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        appear: document.querySelector("#appear").value,
        distanceup: document.querySelector("#distanceup").value,
        distancedn: document.querySelector("#distancedn").value
    });
}

function restoreOptions() {

    function setAppear(result) {
        document.querySelector("#appear").value = result.appear || 300;
    }

    function setDistanceUp(result) {
        document.querySelector("#distanceup").value = result.distanceup || 900;
    }

    function setDistanceDn(result) {
        document.querySelector("#distancedn").value = result.distancedn || 900;
    }

    let getappear = browser.storage.sync.get("appear");
    getappear.then(setAppear);

    let getdistanceup = browser.storage.sync.get("distanceup");
    getdistanceup.then(setDistanceUp);

    let getdistancedn = browser.storage.sync.get("distancedn");
    getdistancedn.then(setDistanceDn);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
