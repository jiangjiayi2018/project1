var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GiftListDataCell = (function () {
    function GiftListDataCell(obj) {
        this.userGiftId = obj.userGiftId;
        this.imgIcon = obj.image;
        this.desc = obj.name;
        this.timeText = obj.addTime.split(" ")[0];
        this.giftType = obj.type;
        this.status = obj.status;
    }
    return GiftListDataCell;
}());
__reflect(GiftListDataCell.prototype, "GiftListDataCell");
/**门票界面显示需要的数据*/
var TickeViewData = (function () {
    function TickeViewData(obj) {
        this.imgPath = obj.giftInfo.image;
        this.userGiftId = obj.userGiftId;
        this.desc = obj.giftInfo.name;
    }
    return TickeViewData;
}());
__reflect(TickeViewData.prototype, "TickeViewData");
//# sourceMappingURL=GiftListDataCell.js.map