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
var TicketGiftView = (function (_super) {
    __extends(TicketGiftView, _super);
    function TicketGiftView(tickMsg) {
        var _this = _super.call(this) || this;
        _this.tickMsg = tickMsg;
        _this.skinName = "TicketGift";
        return _this;
    }
    TicketGiftView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    TicketGiftView.prototype.init = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.handleBtn);
        this.initView();
        this.addEvent();
    };
    TicketGiftView.prototype.addEvent = function () {
        this.handleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBtnHandle, this);
    };
    TicketGiftView.prototype.initView = function () {
        var _this = this;
        RES.getResByUrl(this.tickMsg.imgPath).then(function (res) {
            _this.ticketImg.source = res;
        });
        this.tickText.text = this.tickMsg.desc;
    };
    TicketGiftView.prototype.handleBtnHandle = function () {
        GameMainController.getInstance().showInputView();
        adapter.UIWindow.getInstance().removeView(this);
    };
    return TicketGiftView;
}(eui.Component));
__reflect(TicketGiftView.prototype, "TicketGiftView");
//# sourceMappingURL=TicketGiftView.js.map