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
/**
 * 获得卡卷弹框显示界面
 */
var CardGiftView = (function (_super) {
    __extends(CardGiftView, _super);
    function CardGiftView(cardId) {
        var _this = _super.call(this) || this;
        _this.cardId = cardId;
        _this.skinName = "CardGift";
        return _this;
    }
    CardGiftView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    CardGiftView.prototype.init = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.handleBtn);
        this.initView();
        this.addEvent();
    };
    CardGiftView.prototype.addEvent = function () {
        this.handleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
    };
    CardGiftView.prototype.initView = function () {
        //设置卡卷icon
        this.cardIcon.source = "other_5" + this.cardId + "_png";
    };
    CardGiftView.prototype.closeViewHandle = function () {
        adapter.UIWindow.getInstance().removeView(this);
    };
    return CardGiftView;
}(eui.Component));
__reflect(CardGiftView.prototype, "CardGiftView");
//# sourceMappingURL=CardGiftView.js.map