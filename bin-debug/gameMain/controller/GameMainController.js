var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMainController = (function () {
    function GameMainController() {
        /**格子相关数据*/
        this.gridDataArr = [];
        /**礼物列表数据*/
        this.giftListData = [];
        /**礼品列表弹框对象引用*/
        this.giftListView = null;
    }
    GameMainController.getInstance = function () {
        if (!GameMainController._instance) {
            GameMainController._instance = new GameMainController();
        }
        return GameMainController._instance;
    };
    /**显示游戏主界面*/
    GameMainController.prototype.showMainView = function () {
        adapter.UIWindow.getInstance().addView(new GameMainSceneView());
        if (this.isShowRulePop()) {
            this.showRulePopView();
        }
    };
    /**显示规则弹框*/
    GameMainController.prototype.showRulePopView = function () {
        adapter.UIWindow.getInstance().addView(new RulePopView(), 1 /* TIP */);
    };
    /**显示礼物事件弹框*/
    GameMainController.prototype.showGiftPopView = function () {
        adapter.UIWindow.getInstance().addView(new GiftPopView());
    };
    /**显示卡卷弹框*/
    GameMainController.prototype.showCardGiftView = function () {
        // adapter.UIWindow.getInstance().addView(new CardGiftView());
    };
    /**显示门票弹框*/
    GameMainController.prototype.showTickGiftView = function () {
        // adapter.UIWindow.getInstance().addView(new TicketGiftView());
    };
    /**显示表单信息弹框*/
    GameMainController.prototype.showInputView = function () {
        adapter.UIWindow.getInstance().addView(new InputPopView());
    };
    /**显示礼品列表弹框*/
    GameMainController.prototype.showGiftListView = function () {
        //请求列表数据
        var view = this.giftListView = new GiftListView();
        adapter.UIWindow.getInstance().addView(view);
    };
    /**关闭礼品列表弹框*/
    GameMainController.prototype.closeGiftListView = function () {
        var view = this.giftListView;
        if (view) {
            adapter.UIWindow.getInstance().removeView(view);
            this.giftListView = null;
        }
    };
    /**判断是否需要显示规则弹框*/
    GameMainController.prototype.isShowRulePop = function () {
        var alreadyShow = egret.localStorage.getItem("alreadyShowRuelPop");
        return !alreadyShow;
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