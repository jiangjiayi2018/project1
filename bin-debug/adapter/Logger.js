/**
 * Logger.ts
 * created by Jacob on 2017-06-20
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var adapter;
(function (adapter) {
    var LogerLevel;
    (function (LogerLevel) {
        LogerLevel[LogerLevel["DEBUG"] = 0] = "DEBUG";
        LogerLevel[LogerLevel["INFO"] = 1] = "INFO";
        LogerLevel[LogerLevel["WARN"] = 2] = "WARN";
        LogerLevel[LogerLevel["ERROR"] = 3] = "ERROR";
    })(LogerLevel = adapter.LogerLevel || (adapter.LogerLevel = {}));
    var Logger = (function () {
        function Logger() {
        }
        Logger.debug = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.debug.apply(console, [message].concat(optionalParams));
        };
        Logger.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.info.apply(console, [message].concat(optionalParams));
        };
        Logger.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.warn.apply(console, [message].concat(optionalParams));
        };
        Logger.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.error.apply(console, [message].concat(optionalParams));
        };
        return Logger;
    }());
    adapter.Logger = Logger;
    __reflect(Logger.prototype, "adapter.Logger");
})(adapter || (adapter = {}));
//# sourceMappingURL=Logger.js.map