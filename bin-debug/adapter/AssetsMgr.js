var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var adapter;
(function (adapter) {
    /**
     * 资源管理
     * @author wx771720[outlook.com]
     */
    var AssetsMgr = (function () {
        function AssetsMgr() {
        }
        AssetsMgr.loadConfig = function (url, resourceRoot) {
            return RES.loadConfig(url, resourceRoot);
        };
        AssetsMgr.loadGroup = function (name, priority, reporter) {
            return RES.loadGroup(name, priority, reporter).catch(function (error) { adapter.Logger.error("AssetsMgr", "loadGroup error : " + error.message); });
        };
        AssetsMgr.isGroupLoaded = function (name) {
            return RES.isGroupLoaded(name);
        };
        AssetsMgr.getGroupByName = function (name) {
            return RES.getGroupByName(name);
        };
        AssetsMgr.createGroup = function (name, keys, override) {
            return RES.createGroup(name, keys, override);
        };
        AssetsMgr.hasRes = function (key) {
            return RES.hasRes(key);
        };
        AssetsMgr.getRes = function (key) {
            return RES.getRes(key);
        };
        AssetsMgr.getResAsync = function (key) {
            return RES.getResAsync(key).catch(function (error) { adapter.Logger.error("AssetsMgr", "getResAsync error : " + error.message); });
        };
        AssetsMgr.getResByUrl = function (url, compFunc, thisObject, type) {
            RES.getResByUrl(url, compFunc, thisObject, type);
        };
        AssetsMgr.destroyRes = function (name, force) {
            return RES.destroyRes(name, force);
        };
        AssetsMgr.addEventListener = function (type, listener, thisObject, useCapture, priority) {
            RES.addEventListener(type, listener, thisObject, useCapture, priority);
        };
        AssetsMgr.removeEventListener = function (type, listener, thisObject, useCapture) {
            RES.removeEventListener(type, listener, thisObject, useCapture);
        };
        AssetsMgr.getResourceInfo = function (path) {
            return RES.getResourceInfo(path);
        };
        return AssetsMgr;
    }());
    adapter.AssetsMgr = AssetsMgr;
    __reflect(AssetsMgr.prototype, "adapter.AssetsMgr");
})(adapter || (adapter = {}));
//# sourceMappingURL=AssetsMgr.js.map