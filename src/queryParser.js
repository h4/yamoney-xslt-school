(function(window, document, undefined) {
    "use strict";

    var QueryParser = function() {

    };

    /**
     * Returned object that represented querystring
     *
     * @param {String} qs
     * @returns {{}}
     */
    QueryParser.prototype.parse = function(qs) {
        qs = qs.indexOf('?') === 0 ? qs.slice(1) : qs;
        var params = qs.split("&");
        var res = {};
        var kvArr;
        var k;
        var v;

        if (qs.length === 0) {
            return res;
        }

        for (var i = 0, l = params.length; i < l; i++) {
            kvArr = params[i].split('=');
            k = decodeURIComponent(kvArr[0]);
            v = kvArr[1] ? decodeURIComponent(kvArr[1]) : '';

            res[k] = v;
        }

        return res;
    };

    /**
     * Build querystring from object
     *
     * @param {String} [url]
     * @param {Object} obj
     */
    QueryParser.prototype.buildQuery = function(url, obj) {
        var res = '';
        var tmpArr = [];

        if (arguments.length > 1) {
            res = url + '?';
        } else {
            obj = url;
        }

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                tmpArr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
            }
        }

        res += tmpArr.join('&');

        return res;
    };

    window.queryParser = new QueryParser();
})(window, document, undefined);
