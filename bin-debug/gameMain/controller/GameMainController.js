var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GameMainController = (function () {
    function GameMainController() {
        /**登录游戏之后获得的用户信息*/
        this.userInfo = null;
        /**当前所在的格子id*/
        this.curGridId = 50;
        /**格子相关数据*/
        this.gridDataArr = [];
        /**礼物列表数据*/
        this.giftListData = [];
    }
    GameMainController.getInstance = function () {
        if (!GameMainController._instance) {
            GameMainController._instance = new GameMainController();
        }
        return GameMainController._instance;
    };
    /**登录游戏之后获得的用户信息*/
    GameMainController.prototype.setUserInfo = function (obj) {
        this.userInfo = obj;
        this.curGridId = Number(obj.data.mark);
        localStorage.setItem('uid', obj.data.uid);
    };
    /**显示游戏主界面*/
    GameMainController.prototype.showMainView = function () {
        adapter.UIWindow.getInstance().addView(new GameMainSceneView());
        if (this.isShowRulePop()) {
            this.showRulePopView();
        }
        GameMainHttpManage.getGiftList();
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
    GameMainController.prototype.showCardGiftView = function (cardId) {
        adapter.UIWindow.getInstance().addView(new CardGiftView(cardId));
    };
    /**显示门票弹框*/
    GameMainController.prototype.showTickGiftView = function (userGiftId) {
        adapter.UIWindow.getInstance().addView(new TicketGiftView(userGiftId));
    };
    /**显示表单信息弹框*/
    GameMainController.prototype.showInputView = function (userGiftId) {
        adapter.UIWindow.getInstance().addView(new InputPopView(userGiftId));
    };
    /**显示礼品列表弹框*/
    GameMainController.prototype.showGiftListView = function () {
        GameMainHttpManage.getGiftList().then(function () {
            adapter.UIWindow.getInstance().addView(new GiftListView());
        });
    };
    /**显示提示信息*/
    GameMainController.prototype.showTip = function (str) {
        var view = new ShowTipPop();
        adapter.UIWindow.getInstance().addView(view);
        view.showTip(str);
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
    /**领取卡卷流程操作*/
    GameMainController.prototype.getCardGift = function (userGiftId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameMainHttpManage.getCardData(userGiftId)];
                    case 1:
                        result = _a.sent();
                        //调用微信sdk
                        if (result) {
                            wx.addCard({
                                cardList: [result.data.cardInfo],
                                success: function (res) {
                                    //通知后台领取卡卷成功
                                    GameMainHttpManage.exchangeGift({ userGiftId: result.data.userGiftId });
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GameMainController._instance = null;
    return GameMainController;
}());
__reflect(GameMainController.prototype, "GameMainController");
//# sourceMappingURL=GameMainController.js.map