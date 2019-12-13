/**
 * EventDispatcher.ts
 * created by Jacob on 2017-06-20
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var adapter;
(function (adapter) {
    /**
     * class EventDispatcher, adapter the event
     */
    var EventDispatcher = (function () {
        /**
         * constructor
         */
        function EventDispatcher() {
            this.listenersMap = {};
        }
        /**
         * Add a listener to the listener list which listen to the event code.
         * @param code event code.
         * @param listener the listener listen to the event code.
         */
        EventDispatcher.prototype.addListener = function (code, listener) {
            if (!listener) {
                adapter.Logger.warn(EventDispatcher.LOG_TAG, "Add a null or undefined listener to the list!");
                return;
            }
            var listeners = this.listenersMap[code];
            if (!listeners) {
                this.listenersMap[code] = new Array();
                listeners = this.listenersMap[code];
            }
            if (listeners.indexOf(listener) >= 0) {
                adapter.Logger.warn(EventDispatcher.LOG_TAG, "Add a exist listener to the list!");
                return;
            }
            listeners.push(listener);
        };
        /**
         * Remove a listener from the listener list which listen to the event code.
         * @param code event code.
         * @param listener the listener listen to the event code.
         */
        EventDispatcher.prototype.removeListener = function (code, listener) {
            if (!listener) {
                adapter.Logger.warn(EventDispatcher.LOG_TAG, "Remove a null or undefined listener to the list!");
                return;
            }
            var listeners = this.listenersMap[code];
            if (!listeners) {
                adapter.Logger.warn(EventDispatcher.LOG_TAG, "Remove a listener from a list which is not exist!");
                return;
            }
            var idx = listeners.indexOf(listener);
            if (idx < 0) {
                adapter.Logger.warn(EventDispatcher.LOG_TAG, "Remove a listener which is not exist in the list!");
                return;
            }
            listeners.splice(idx, 1);
        };
        /**
         * Dispatch event.
         * @param code event code.
         * @param data event data.
         * @param src event src, default is null.
         */
        EventDispatcher.prototype.dispatch = function (code, data, src) {
            if (src === void 0) { src = null; }
            var listeners = this.listenersMap[code];
            if (!listeners) {
                adapter.Logger.warn(EventDispatcher.LOG_TAG, "Dispatch event failed, list is not exist!");
                return;
            }
            for (var i = 0, n = listeners.length; i < n; i++) {
                listeners[i].handleEvent(code, data, src);
            }
        };
        EventDispatcher.LOG_TAG = "EventDispatcher";
        return EventDispatcher;
    }());
    adapter.EventDispatcher = EventDispatcher;
    __reflect(EventDispatcher.prototype, "adapter.EventDispatcher");
})(adapter || (adapter = {}));
//# sourceMappingURL=EventDispatcher.js.map