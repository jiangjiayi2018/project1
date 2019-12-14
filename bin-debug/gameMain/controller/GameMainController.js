var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMainController = (function () {
    function GameMainController() {
        this.gridDataArr = [];
    }
    GameMainController.getInstance = function () {
        if (!GameMainController._instance) {
            GameMainController._instance = new GameMainController();
        }
        return GameMainController._instance;
    };
    /**初始化格子所需的数据*/
    GameMainController.prototype.initGridData = function () {
        var gridObj = RES.getRes("grid_json");
        for (var gridId in gridObj) {
            if (gridObj.hasOwnProperty(gridId)) {
                this.gridDataArr[gridId] = new GridDataCell(gridObj[gridId]);
            }
        }
    };
    /**获取船只的行走路径*/
    GameMainController.prototype.getPathArr = function (curGridId, gridNum) {
        // let gridNum = adapter.Util.random(1, 7);
        var tempArr = [];
        for (var i = 0; i < gridNum; ++i) {
            var gridId = curGridId - 1;
            if (gridId < 0) {
                gridId = this.gridDataArr.length - 1;
            }
            tempArr.push(gridId);
            curGridId = gridId;
        }
        return tempArr;
    };
    GameMainController._instance = null;
    return GameMainController;
}());
__reflect(GameMainController.prototype, "GameMainController");
//# sourceMappingURL=GameMainController.js.map