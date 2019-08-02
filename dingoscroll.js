/*! @preserve
 * Copyright (c) 2019 Aquafortis
 * Licensed under MPL-2.0 (https://github.com/Aquafortis/scroll-buttons)
 */
window.addEventListener("load", () => {
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

    let dingoup = document.getElementById("dingoup");
    let dingodn = document.getElementById("dingodn");

    window.onscroll = function() {
        showHide();
    };

    function showHide() {
        if (window.pageYOffset > 300) {
            dingoup.style.display = "block";
            dingodn.style.display = "block";
        } else {
            dingoup.style.display = "none";
            dingodn.style.display = "none";
        }
    }

    function scrollToTop(distance, time) {
        var scrollTo = window.setInterval(() => {
            var position = window.pageYOffset;
            if (position > 0) {
                window.scrollTo(0, position - distance);
            } else {
                window.clearInterval(scrollTo);
            }
        }, time);
    }

    function scrollToBottom(distance, time) {
        var scrollTo = window.setInterval(() => {
            var height = document.documentElement.scrollHeight;
            var outer = window.outerHeight;
            var position = window.pageYOffset;
            if (position < height - outer) {
                window.scrollTo(0, position + distance);
            } else {
                window.clearInterval(scrollTo);
            }
        }, time);
    }

    dingoup.addEventListener("click", () => {
        scrollToTop(600, 10);
    });

    dingodn.addEventListener("click", () => {
        scrollToBottom(600, 10);
    });

});
