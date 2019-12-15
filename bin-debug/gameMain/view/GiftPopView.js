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
var GiftPopView = (function (_super) {
    __extends(GiftPopView, _super);
    function GiftPopView() {
        var _this = _super.call(this) || this;
        _this.skinName = "GiftPop";
        return _this;
    }
    GiftPopView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GiftPopView.prototype.init = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.openBtn);
        this.initView();
        this.addEvent();
    };
    GiftPopView.prototype.addEvent = function () {
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openwHandle, this);
    };
    GiftPopView.prototype.initView = function () {
    };
    GiftPopView.prototype.openwHandle = function () {
        //判断是卡卷还是门票；
        var type;
        switch (type) {
            case 0 /* CARD_GIFT */:
                {
                    GameMainController.getInstance().showCardGiftView();
                    break;
                }
            case 1 /* TICKET_GIFT */:
                {
                    GameMainController.getInstance().showTickGiftView();
                    break;
                }
        }
        this.closeView();
    };
    GiftPopView.prototype.closeView = function () {
        adapter.UIWindow.getInstance().removeView(this);
    };
    return GiftPopView;
}(eui.Component));
__reflect(GiftPopView.prototype, "GiftPopView");
//# sourceMappingURL=GiftPopView.js.map