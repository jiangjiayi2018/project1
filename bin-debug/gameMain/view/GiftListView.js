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
 * 礼品列表显示界面
 */
var GiftListView = (function (_super) {
    __extends(GiftListView, _super);
    function GiftListView() {
        var _this = _super.call(this) || this;
        _this.arrayCollection = new eui.ArrayCollection();
        _this.skinName = "GiftList";
        return _this;
    }
    GiftListView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GiftListView.prototype.init = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.backBtn);
        this.initView();
        this.addEvent();
    };
    GiftListView.prototype.addEvent = function () {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
        adapter.EventDispatcher.getInstance().addListener(1 /* GET_GIFT_CLOSE_VIEW */, this);
    };
    GiftListView.prototype.removeEvent = function () {
        adapter.EventDispatcher.getInstance().removeListener(1 /* GET_GIFT_CLOSE_VIEW */, this);
    };
    GiftListView.prototype.handleEvent = function (code, data, src) {
        switch (code) {
            case 1 /* GET_GIFT_CLOSE_VIEW */:
                {
                    this.closeViewHandle();
                }
                break;
        }
    };
    GiftListView.prototype.initView = function () {
        this.scr.verticalScrollBar.autoVisibility = false;
        this.scr.verticalScrollBar.visible = false;
        this.contentList.itemRenderer = GiftListItemView;
        this.contentList.dataProvider = this.arrayCollection;
        this.arrayCollection.source = GameMainController.getInstance().giftListData;
    };
    GiftListView.prototype.closeViewHandle = function () {
        this.removeEvent();
        adapter.UIWindow.getInstance().removeView(this);
    };
    return GiftListView;
}(eui.Component));
__reflect(GiftListView.prototype, "GiftListView", ["adapter.EventListener"]);
var GiftListItemView = (function (_super) {
    __extends(GiftListItemView, _super);
    function GiftListItemView() {
        var _this = _super.call(this) || this;
        _this.skinName = "GiftListItem";
        _this.addEvent();
        return _this;
    }
    GiftListItemView.prototype.addEvent = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.getBtn, 0.8, 0.8);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getBtnHandle, this);
    };
    GiftListItemView.prototype.dataChanged = function () {
        var _this = this;
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        RES.getResByUrl(data.imgIcon).then(function (res) {
            _this.iconImg.source = res;
        });
        this.desc.text = data.desc;
        this.timeText.text = data.timeText;
        this.getBtn.source = data.status === 0 ? "other_22_png" : "other_29_png";
    };
    GiftListItemView.prototype.getBtnHandle = function () {
        var data = this.data;
        if (data.status !== 0) {
            alert("此奖品已领取");
            return;
        }
        switch (data.giftType) {
            case 2 /* CARD_GIFT */:
                {
                    //领取卡卷
                    GameMainController.getInstance().getCardGift(data.userGiftId);
                    break;
                }
            case 1 /* TICKET_GIFT */:
                {
                    GameMainController.getInstance().showInputView(data.userGiftId);
                    break;
                }
        }
        adapter.EventDispatcher.getInstance().dispatch(1 /* GET_GIFT_CLOSE_VIEW */, null);
    };
    return GiftListItemView;
}(eui.ItemRenderer));
__reflect(GiftListItemView.prototype, "GiftListItemView");
//# sourceMappingURL=GiftListView.js.map