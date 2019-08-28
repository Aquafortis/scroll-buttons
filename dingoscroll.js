/*! @preserve
 * Copyright (c) 2019 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
// Scroll buttons
function dingoScrollButtons() {
    "use strict";
    let btn1 = browser.runtime.getURL("images/dingoup.png");
    let image1 = document.createElement("img");
    image1.setAttribute("id", "dingoup");
    image1.setAttribute("src", btn1);
    document.documentElement.appendChild(image1);

    let btn2 = browser.runtime.getURL("images/dingostop.png");
    let image2 = document.createElement("img");
    image2.setAttribute("id", "dingostop");
    image2.setAttribute("src", btn2);
    document.documentElement.appendChild(image2);

    let btn3 = browser.runtime.getURL("images/dingodn.png");
    let image3 = document.createElement("img");
    image3.setAttribute("id", "dingodn");
    image3.setAttribute("src", btn3);
    document.documentElement.appendChild(image3);

    const dingoup = document.getElementById("dingoup");
    const dingostop = document.getElementById("dingostop");
    const dingodn = document.getElementById("dingodn");

    function showHide(appear, buttons) {
        if (window.pageYOffset > appear && buttons == "Show") {
            dingoup.style.display = "block";
            dingostop.style.display = "block";
            dingodn.style.display = "block";
        } else {
            dingoup.style.display = "none";
            dingostop.style.display = "none";
            dingodn.style.display = "none";
        }
    }

    function scrollToTop(distance, time) {
        let stopClicked = false;

        function clickHandler() {
            stopClicked = true;
        }
        dingostop.addEventListener("click", clickHandler);
        dingodn.addEventListener("click", clickHandler);
        window.addEventListener("wheel", clickHandler);
        let scrollTop = window.setInterval(() => {
            let position = window.pageYOffset;
            if (position > 0 && stopClicked == false) {
                window.scrollTo(0, (position - distance));
            } else {
                window.clearInterval(scrollTop);
            }
        }, time);
    }

    function scrollToBottom(distance, time) {
        let stopClicked = false;

        function clickHandler() {
            stopClicked = true;
        }
        dingostop.addEventListener("click", clickHandler);
        dingoup.addEventListener("click", clickHandler);
        window.addEventListener("wheel", clickHandler);
        let scrollBottom = window.setInterval(() => {
            let height = document.documentElement.scrollHeight;
            let outer = window.outerHeight;
            let position = window.pageYOffset;
            if (position < height - outer && stopClicked == false) {
                window.scrollTo(0, (position + distance));
            } else {
                window.clearInterval(scrollBottom);
            }
        }, time);
    }

    function gotAppear(key, value) {
        let appear = 300;
        let buttons = "Show";
        if (key.appear || key.buttons) {
            appear = parseInt(key.appear);
            buttons = key.buttons;
        }
        window.addEventListener("scroll", () => {
            showHide(appear, buttons);
        });
    }
    let getappear = browser.storage.sync.get(["appear", "buttons"]);
    getappear.then(gotAppear);

    function gotDistanceUp(item) {
        let distance = 900;
        if (item.distanceup) {
            distance = parseInt(item.distanceup);
        }
        dingoup.addEventListener("click", () => {
            setTimeout(function() {
                scrollToTop(distance, 10);
            }, 100);
        });
    }
    let getdistanceup = browser.storage.sync.get("distanceup");
    getdistanceup.then(gotDistanceUp);

    function gotDistanceDn(item) {
        let distance = 900;
        if (item.distancedn) {
            distance = parseInt(item.distancedn);
        }
        dingodn.addEventListener("click", () => {
            setTimeout(function() {
                scrollToBottom(distance, 10);
            }, 100);
        });
    }
    let getdistancedn = browser.storage.sync.get("distancedn");
    getdistancedn.then(gotDistanceDn);
}
dingoScrollButtons();
