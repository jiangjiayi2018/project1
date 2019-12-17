var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ShowTipPop = (function (_super) {
    __extends(ShowTipPop, _super);
    function ShowTipPop() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShowTipPopSkin";
        return _this;
    }
    ShowTipPop.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.tipGroup.visible = false;
        this.tipGroup.y = this.height * 0.5;
    };
    ShowTipPop.prototype.showTip = function (str) {
        var _this = this;
        this.tipText.text = str;
        this.tipGroup.visible = true;
        adapter.tween(this.tipGroup).by({ y: -450, alpha: -1 }, 2000).then(function () {
            _this.closeViewHandle();
        });
    };
    ShowTipPop.prototype.closeViewHandle = function () {
        adapter.UIWindow.getInstance().removeView(this);
    };
    return ShowTipPop;
}(eui.Component));
__reflect(ShowTipPop.prototype, "ShowTipPop");
//# sourceMappingURL=ShowTipPop.js.map