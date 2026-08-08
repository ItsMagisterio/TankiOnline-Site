(function () {
    "use strict";

    var browser = navigator.sayswho && navigator.sayswho[0];
    var userAgent = navigator.userAgent || "";
    var isChrome = /Chrome\/(\d+)/.exec(userAgent);
    var isFirefox = /Firefox\/(\d+)/.exec(userAgent);
    var supportsModernBrowser =
        (isChrome && parseInt(isChrome[1], 10) > 55) ||
        (isFirefox && parseInt(isFirefox[1], 10) > 52);
    var supportsHtml5Game = !!(
        supportsModernBrowser &&
        window.innerWidth > 1366 &&
        (!window.isAvailableOS || window.isAvailableOS())
    );
    var clusterName = window.cluster || "eu";
    var redirectUrl = supportsHtml5Game
        ? (clusterName !== "us"
            ? "https://" + document.location.host + "/play/" + document.location.hash
            : "https://" + document.location.host +
              "/play/?config-template=https://c{server}.us.tankionline.com/config.xml" +
              "&resources=https://s.us.tankionline.com&server=1" +
              document.location.hash)
        : false;

    window.TNKHTML5Redirect = false;
    window.TNKHTML5 = {
        _domains: window.HTML5Domains || [],
        _percentage: window.HTML5Percentage || 0,
        _URL: redirectUrl,
        _isLanding: null,

        init: function () {
            var html5Cookie = this.checkHTML5Cookie();
            var flashCookie = this.checkFlashCookie();
            var visitCookie = this.checkVisitCookie();
            var shouldRedirect = !flashCookie && !(visitCookie && !html5Cookie);

            if (window.globalLang === "fa") {
                this.prepareURL();
                this.updateLink();
                Cookie.write("TNK_HTML5", true, 31536000, "/", ".tankionline.com");
                return;
            }

            if (shouldRedirect && this.checkBrowserCompatibility() && this.checkWindowWidth() &&
                (this.checkDomain() || html5Cookie || this.checkPercentage())) {
                this.prepareURL();
                this.updateLink();
                Cookie.write("TNK_HTML5", true, 31536000, "/", ".tankionline.com");
            } else {
                Cookie.write("TNK_Flash", true, 31536000, "/", ".tankionline.com");
            }
        },

        checkIfLanding: function () {
            return document.location.pathname.indexOf("/start") !== -1;
        },

        prepareURL: function () {
            if (typeof window.selectProperServer !== "function" || !this._URL) {
                return;
            }
            window.selectProperServer();
        },

        updateLink: function () {
            window.TNKHTML5Redirect = this._URL;
            var fightLink = document.getElementById("fight");
            if (fightLink && this._URL) {
                fightLink.href = this._URL;
            }
        },

        checkDomain: function () {
            return this._domains.indexOf(document.location.hostname) > -1;
        },

        checkBrowserCompatibility: function () {
            return !!supportsModernBrowser;
        },

        checkPercentage: function () {
            return parseInt(100 * Math.random(), 10) <= this._percentage;
        },

        checkHTML5Cookie: function () {
            return Cookie.read("TNK_HTML5");
        },

        checkFlashCookie: function () {
            return Cookie.read("TNK_Flash");
        },

        checkVisitCookie: function () {
            return Cookie.read("TNK_visit");
        },

        checkWindowWidth: function () {
            return window.innerWidth > 1366;
        }
    };

    var Cookie = {
        isSupported: function () {
            return !!navigator.cookieEnabled;
        },

        exists: function (name) {
            return document.cookie.indexOf(name + "=") + 1;
        },

        write: function (name, value, expires, path, domain, secure) {
            if (!this.isSupported()) {
                return false;
            }
            if (expires instanceof Date) {
                expires = expires.toGMTString();
            } else if (typeof expires === "number") {
                expires = new Date(+new Date() + 1000 * expires).toGMTString();
            }
            var cookie = [name + "=" + encodeURIComponent(value)];
            var attributes = { expires: expires, path: path, domain: domain };
            for (var key in attributes) {
                if (attributes[key]) {
                    cookie.push(key + "=" + attributes[key]);
                }
            }
            if (secure) {
                cookie.push("secure");
            }
            document.cookie = cookie.join(";");
            return true;
        },

        read: function (name) {
            var position = this.exists(name);
            if (!position) {
                return "";
            }
            var end = document.cookie.indexOf(";", position);
            return decodeURIComponent(document.cookie.substring(
                position + name.length,
                (end + 1 || document.cookie.length + 1) - 1
            ));
        }
    };

    window.TNKHTML5.init();
}());