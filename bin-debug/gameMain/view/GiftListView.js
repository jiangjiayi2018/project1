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
    };
    GiftListView.prototype.initView = function () {
        this.contentList.itemRenderer = GiftListItemView;
        this.contentList.dataProvider = this.arrayCollection;
        this.arrayCollection.source = GameMainController.getInstance().giftListData;
    };
    GiftListView.prototype.closeViewHandle = function () {
        GameMainController.getInstance().closeGiftListView();
    };
    return GiftListView;
}(eui.Component));
__reflect(GiftListView.prototype, "GiftListView");
var GiftListItemView = (function (_super) {
    __extends(GiftListItemView, _super);
    function GiftListItemView() {
        var _this = _super.call(this) || this;
        _this.skinName = "GiftListItem";
        return _this;
    }
    GiftListItemView.prototype.addEvent = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.getBtn);
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
    };
    GiftListItemView.prototype.getBtnHandle = function () {
        var data = this.data;
        switch (data.giftType) {
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
        GameMainController.getInstance().closeGiftListView();
    };
    return GiftListItemView;
}(eui.ItemRenderer));
__reflect(GiftListItemView.prototype, "GiftListItemView");
//# sourceMappingURL=GiftListView.js.map