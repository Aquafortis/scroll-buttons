/*! @preserve
 * Copyright (c) 2019 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
// Scroll buttons
// Scroll to bottom does not work well with Options format
// Would need to use jQuery scroll type
function addElements() {
    "use strict";
    let head = document.getElementsByTagName("head")[0];
    let style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = browser.runtime.getURL("dingoscroll.css");
    head.appendChild(style);

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

}
window.addEventListener("load", () => {
    addElements();
});

window.addEventListener("load", () => {
    "use strict";
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

    function scrollToTop(distanceup, timeup) {
        let scrollTop = window.setInterval(() => {
            let positionup = window.pageYOffset;
            if (positionup > 0) {
                window.scrollTo(0, (positionup - distanceup));
            } else {
                window.clearInterval(scrollTop);
            }
        }, timeup);
    }

    // Does not work well with Options format
    function scrollToBottom(distancedn, timedn) {
        let scrollBottom = window.setInterval(() => {
            let heightdn = document.documentElement.scrollHeight;
            let outerdn = window.outerHeight;
            let positiondn = window.pageYOffset;
            if (positiondn < (heightdn - outerdn)) {
                window.scrollTo(0, (positiondn + distancedn));
            } else {
                window.clearInterval(scrollBottom);
            }
        }, timedn);
    }

    function gotAppear(item) {
        let appear = 300;
        if (item.appear) {
            appear = item.appear;
        }
        console.log("Appear: ", appear);
        window.addEventListener("scroll", () => {
            showHide(appear);
        });
    }
    let getappear = browser.storage.sync.get("appear");
    getappear.then(gotAppear);

    function gotDistanceUp(item) {
        let distanceup = 900;
        if (item.distanceup) {
            distanceup = item.distanceup;
        }
        console.log("Up: ", distanceup);
        dingoup.addEventListener("click", () => {
            scrollToTop(distanceup, 10);
        });
    }
    let getdistanceup = browser.storage.sync.get("distanceup");
    getdistanceup.then(gotDistanceUp);

    /*
    function gotDistanceDn(item) {
        let distancedn = 900;
        if (item.distancedn) {
            distancedn = item.distancedn;
        }
        console.log("Down: ", distancedn);
        dingodn.addEventListener("click", () => {
            scrollToBottom(distancedn, 10);
        });
    }
    let getdistancedn = browser.storage.sync.get("distancedn");
    getdistancedn.then(gotDistanceDn);
    */

    dingodn.addEventListener("click", () => {
        scrollToBottom(900, 10);
    });

});
