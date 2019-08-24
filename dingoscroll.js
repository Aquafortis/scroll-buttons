/*! @preserve
 * Copyright (c) 2019 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
// Scroll buttons
function dingoScrollButtons() {
    "use strict";
    let slide1 = browser.runtime.getURL("dingoup.png");
    let image1 = document.createElement("img");
    image1.setAttribute("src", slide1);
    image1.setAttribute("id", "dingoup");
    document.documentElement.appendChild(image1);

    let slide2 = browser.runtime.getURL("dingodn.png");
    let image2 = document.createElement("img");
    image2.setAttribute("src", slide2);
    image2.setAttribute("id", "dingodn");
    document.documentElement.appendChild(image2);

    const dingoup = document.getElementById("dingoup");
    const dingodn = document.getElementById("dingodn");

    function showHide(value) {
        if (window.pageYOffset > value) {
            dingoup.style.display = "block";
            dingodn.style.display = "block";
        } else {
            dingoup.style.display = "none";
            dingodn.style.display = "none";
        }
    }

    function scrollToTop(distance, time) {
        let scrollTop = window.setInterval(() => {
            let position = window.pageYOffset;
            if (position > 0) {
                window.scrollTo(0, (position - distance));
            } else {
                window.clearInterval(scrollTop);
            }
        }, time);
    }

    function scrollToBottom(distance, time) {
        let scrollBottom = window.setInterval(() => {
            let height = document.documentElement.scrollHeight;
            let outer = window.outerHeight;
            let position = window.pageYOffset;
            if (position < (height - outer)) {
                window.scrollTo(0, (position + distance));
            } else {
                window.clearInterval(scrollBottom);
            }
        }, time);
    }

    function gotAppear(item) {
        let appear = 300;
        if (item.appear) {
            appear = parseInt(item.appear);
        }
        //console.log("Appear: ", appear);
        window.addEventListener("scroll", () => {
            showHide(appear);
        });
    }
    let getappear = browser.storage.sync.get("appear");
    getappear.then(gotAppear);

    function gotDistanceUp(item) {
        let distance = 900;
        if (item.distanceup) {
            distance = parseInt(item.distanceup);
        }
        //console.log("Up: ", distance);
        dingoup.addEventListener("click", () => {
            scrollToTop(distance, 10);
        });
    }
    let getdistanceup = browser.storage.sync.get("distanceup");
    getdistanceup.then(gotDistanceUp);

    function gotDistanceDn(item) {
        let distance = 900;
        if (item.distancedn) {
            distance = parseInt(item.distancedn);
        }
        //console.log("Down: ", distance);
        dingodn.addEventListener("click", () => {
            scrollToBottom(distance, 10);
        });
    }
    let getdistancedn = browser.storage.sync.get("distancedn");
    getdistancedn.then(gotDistanceDn);
}
dingoScrollButtons();
