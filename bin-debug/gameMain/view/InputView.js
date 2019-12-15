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
var InputPopView = (function (_super) {
    __extends(InputPopView, _super);
    function InputPopView() {
        var _this = _super.call(this) || this;
        _this.skinName = "InputViewSkin";
        return _this;
    }
    InputPopView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    InputPopView.prototype.init = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.handleBtn);
        this.initView();
        this.addEvent();
    };
    InputPopView.prototype.addEvent = function () {
        this.handleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
    };
    InputPopView.prototype.initView = function () {
        //设置卡卷icon
    };
    InputPopView.prototype.closeViewHandle = function () {
        adapter.UIWindow.getInstance().removeView(this);
    };
    return InputPopView;
}(eui.Component));
__reflect(InputPopView.prototype, "InputPopView");
//# sourceMappingURL=InputView.js.map