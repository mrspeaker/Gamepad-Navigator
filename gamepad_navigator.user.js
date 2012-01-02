// Gamepad navigator
// version 0.1
// http://www.mrspeaker.net/
//
// ===== INSTRUCTIONS =====
//
// ==UserScript==
// @name           Gamepad navigator POC
// @namespace      http://www.mrspeaker.net/
// @description    Navigate web pages with your gamepad... only works with Firefox and NES Retrolink gamepad for now!
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
//
// @include        http://*
// @include        https://*
// ==/UserScript==

GM_addStyle("a:focus { background-color: #ff0; !important }");

(function() {
    // These buttons are for a NES retrolink gamepad.
    // Should really be using input.js or something to support more devices.
    var axisX = 4,
        axisY = 5,
        buttonGo = [1, 2],
        buttonBack = [8],
        buttonForward = [9],
        gamepad = null;

    function onX(isRight) {
        var links = $("a"),
            indx = links.index($("a:focus").first());
        links.eq((indx + isRight) % links.length).focus();
    }

    function onY(isUp) {
        var page = $("html, body");
        page.stop();
        if(isUp === 0) {
            setLink();
            return;
        };
        page.animate({ scrollTop: isUp > 0 ? $(document).height() : 0 }, "slow");
    }

    function onFire() {
        var url = $("a:focus").first().attr("href");
        if(url) window.location = url;
    }

    function setLink() {
        var top = $(window).scrollTop(),
            bottom = top + $(window).height(),
            isInView = function(el) {
                var $el = $(el),
                    elTop = !$el.length ? false : $el.offset().top;
                return elTop !== false && elTop >= top && elTop <= bottom;
            };

        if(isInView($("a:focus").first())) {
            return;
        }

        $("a").each(function(i, el) {
            if(isInView(this)) {
                $(this).focus();
                return false;
            }
        });
    }

    // Sorry - no chrome just yet: need to poll instead of catch events
    if(navigator.webkitGamepads) {
        for(var i = 0; i < navigator.webkitGamepads.length; i++) {
            if(navigator.webkitGamepads[i]) {
                gamepad = i;
                break;
            }
        }

        // (function poll(timestep) {
        //    (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(poll)
        // })(0);

        return;
    }

    window.addEventListener("MozGamepadConnected", function(e) {
        gamepad = e.gamepad.index;
    }, false);

    window.addEventListener("MozGamepadAxisMove", function(e) {
        var value = Math.abs(e.value) > 0.1 ? (e.value < 1 ? -1 : 1) : 0;
        e.axis === axisX && onX(value);
        e.axis === axisY && onY(value);
    }, false);

    window.addEventListener("MozGamepadButtonDown", function(e) {
        var contains = function(num){ return num === e.button; }
        buttonGo.some(contains) && onFire();
        buttonBack.some(contains) && window.history.back();
        buttonForward.some(contains) && window.history.forward();
    }, false);
})();
