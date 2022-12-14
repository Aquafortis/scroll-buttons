/*! @preserve
 * Copyright (c) 2023 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
function dingoScrollButtons() {
    "use strict";
    let btn1 = chrome.runtime.getURL("images/dingoup.png");
    let image1 = document.createElement("img");
    image1.setAttribute("id", "dingoup");
    image1.setAttribute("src", btn1);
    document.documentElement.appendChild(image1);

    let btn2 = chrome.runtime.getURL("images/dingostop.png");
    let image2 = document.createElement("img");
    image2.setAttribute("id", "dingostop");
    image2.setAttribute("src", btn2);
    document.documentElement.appendChild(image2);

    let btn3 = chrome.runtime.getURL("images/dingodn.png");
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

    chrome.storage.sync.get(["appear", "buttons"], function(data) {
        let appear = 300;
        let buttons = "Show";
        if (data.appear || data.buttons) {
            appear = parseInt(data.appear);
            buttons = data.buttons;
        }
        window.addEventListener("scroll", () => {
            showHide(appear, buttons);
        });
    });

    chrome.storage.sync.get(["distanceup"], function(data) {
        let distance = 900;
        if (data.distanceup) {
            distance = parseInt(data.distanceup);
        }
        dingoup.addEventListener("click", () => {
            setTimeout(() => {
                scrollToTop(distance, 10);
            }, 100);
        });
    });

    chrome.storage.sync.get(["distancedn"], function(data) {
        let distance = 900;
        if (data.distancedn) {
            distance = parseInt(data.distancedn);
        }
        dingodn.addEventListener("click", () => {
            setTimeout(() => {
                scrollToBottom(distance, 10);
            }, 100);
        });
    });
}
dingoScrollButtons();
