var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GridDataCell = (function () {
    function GridDataCell(obj) {
        this.gridId = obj.gridId;
        this.posX = (adapter.UIWindow.getInstance().width * obj.posX) / 540;
        this.posY = obj.posY;
        this.gridEvent = obj.gridEvent ? obj.gridEvent : 0 /* NONE */;
        this.extra = obj.extra ? obj.extra : 0;
    }
    return GridDataCell;
}());
__reflect(GridDataCell.prototype, "GridDataCell");
//# sourceMappingURL=GridDataCell.js.map