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
/**游戏主玩法界面*/
var GameMainSceneView = (function (_super) {
    __extends(GameMainSceneView, _super);
    function GameMainSceneView() {
        var _this = _super.call(this) || this;
        /**当前所在的格子id*/
        _this.curGridId = 50;
        /**船当前所在的格子所属的容器ID号：1,2*/
        // public curBoatForGroup: eui.Group = null;
        /**放置两个背景图容器的数组*/
        _this.groupArr = null;
        _this.skinName = "MainScene";
        return _this;
    }
    GameMainSceneView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GameMainSceneView.prototype.init = function () {
        this.initData();
        this.initView();
        this.addEvent();
    };
    GameMainSceneView.prototype.addEvent = function () {
        this.playDiceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnHandle, this);
    };
    GameMainSceneView.prototype.initData = function () {
        GameMainController.getInstance().initGridData();
        // this.curBoatForGroup = this.childBgGroup1;
        this.groupArr = [this.childBgGroup1, this.childBgGroup2];
    };
    GameMainSceneView.prototype.initView = function () {
        this.initStaticView();
        this.initBg();
        this.setStateView();
    };
    GameMainSceneView.prototype.initStaticView = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.playDiceBtn);
    };
    GameMainSceneView.prototype.initBg = function () {
        this.setGroupPos();
        this.addImgToGroup(this.childBgGroup1);
        this.addImgToGroup(this.childBgGroup2);
    };
    /**设置界面的元素位置状态*/
    GameMainSceneView.prototype.setStateView = function () {
        this.testBgGroup();
        this.setBoat();
    };
    /**设置各个容器的y值*/
    GameMainSceneView.prototype.setGroupPos = function () {
        var posY = 0;
        for (var i = 0, leng = this.groupArr.length; i < leng; ++i) {
            var group = this.groupArr[i];
            group.y = posY;
            posY += group.height;
        }
        this.bgGroup.height = posY;
    };
    GameMainSceneView.prototype.addImgToGroup = function (group) {
        var imgHeightArr = [1030, 1030, 1268, 1025];
        var posY = 0;
        for (var i = 0; i < 4; ++i) {
            var img = new eui.Image("mainBg_" + (i + 1) + "_png");
            img.y = posY;
            img.left = 0;
            img.right = 0;
            group.addChild(img);
            posY += imgHeightArr[i];
        }
    };
    /**检测背容器里面的背景图的位置是否需要调整*/
    GameMainSceneView.prototype.testBgGroup = function () {
        var curGridPosY = this.getGridPos(this.curGridId).y;
        var midY = adapter.UIWindow.getInstance().height * 0.5;
        this.bgGroup.y = -(curGridPosY - midY);
        if (curGridPosY - midY < 200) {
            var tempVal = -this.bgGroup.y;
            this.groupArr.push(this.groupArr.pop());
            this.setGroupPos();
            this.bgGroup.y = -(tempVal + this.groupArr[0].height);
        }
    };
    /**初始化船的位置*/
    GameMainSceneView.prototype.setBoat = function () {
        this.boat.x = GameMainController.getInstance().gridDataArr[this.curGridId].posX;
        this.boat.y = adapter.UIWindow.getInstance().height * 0.5;
        this.setBoatDiect();
    };
    /**设置船的方向*/
    GameMainSceneView.prototype.setBoatDiect = function () {
        var curGridId = this.curGridId;
        var gridDataArr = GameMainController.getInstance().gridDataArr;
        var nextGridId = curGridId - 1;
        ;
        if (nextGridId < 0) {
            nextGridId = gridDataArr.length - 1;
        }
        this.boat.scaleX = this.getGridPos(curGridId).x < this.getGridPos(nextGridId).x ? 1 : -1;
    };
    /**船只移动*/
    GameMainSceneView.prototype.boatMove = function (pathArr) {
        return __awaiter(this, void 0, void 0, function () {
            var i, leng;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pathArr.unshift(this.curGridId);
                        i = 1, leng = pathArr.length;
                        _a.label = 1;
                    case 1:
                        if (!(i < leng)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.boatMoveOneCell(pathArr[i - 1], pathArr[i])];
                    case 2:
                        _a.sent();
                        this.curGridId = pathArr[i];
                        this.setBoatDiect();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4:
                        this.testBgGroup();
                        //触发可能的事件
                        this.triggerEventHandle();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**船移动一格*/
    GameMainSceneView.prototype.boatMoveOneCell = function (fromGridId, toGridId) {
        return __awaiter(this, void 0, void 0, function () {
            var fromPos, toPos, y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromPos = this.getGridPos(fromGridId);
                        toPos = this.getGridPos(toGridId);
                        if (fromGridId < toGridId) {
                            y = -(4353 - toPos.y);
                            toPos = new egret.Point(toPos.x, y);
                        }
                        adapter.tween(this.boat).by({ x: toPos.x - fromPos.x }, 500);
                        adapter.tween(this.bgGroup).by({ y: -(toPos.y - fromPos.y) }, 500);
                        return [4 /*yield*/, adapter.Scheduler.waitForTime(500)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**手动点击之后投骰子的操作*/
    GameMainSceneView.prototype.clickBtnHandle = function () {
        var pathArr = GameMainController.getInstance().getPathArr(this.curGridId, adapter.Util.random(1, 7));
        this.excutePlayCycle(pathArr);
    };
    /**船只移动之后出发的事件*/
    GameMainSceneView.prototype.triggerEventHandle = function () {
        var contrl = GameMainController.getInstance();
        var eventId = contrl.gridDataArr[this.curGridId].gridEvent;
        switch (eventId) {
            case 1 /* FORWARD */:
                {
                    var gridNum = contrl.gridDataArr[this.curGridId].extra;
                    var pathArr = contrl.getPathArr(this.curGridId, gridNum);
                    this.excutePlayCycle(pathArr);
                    break;
                }
            case 2 /* AGAIN */:
                {
                    this.clickBtnHandle();
                    break;
                }
            case 3 /* GIFT */:
                {
                    //todo
                    break;
                }
            default:
                break;
        }
    };
    /**触发一次投骰子的周期*/
    GameMainSceneView.prototype.excutePlayCycle = function (pathArr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showGridAni(pathArr.length)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, adapter.Scheduler.waitForTime(100)];
                    case 2:
                        _a.sent();
                        this.boatMove(pathArr);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**显示投骰子动画*/
    GameMainSceneView.prototype.showGridAni = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**获取另外一个容器*/
    GameMainSceneView.prototype.getOtherGroup = function (group) {
        return group === this.childBgGroup1 ? this.childBgGroup2 : this.childBgGroup1;
    };
    // /**获取格子坐标在当前bgGroup容器里面的坐标值*/
    // private getGridLocalPos(gridId: number, parentGroup: eui.Group): egret.Point {
    //     let gridPos = this.getGridPos(gridId);
    //     let tempPos = parentGroup.localToGlobal(gridPos.x, gridPos.y);
    //     let tempPos1 = this.bgGroup.globalToLocal(tempPos.x, tempPos.y);
    //     return tempPos1;
    // }
    /**获取格子的坐标值*/
    GameMainSceneView.prototype.getGridPos = function (gridId) {
        var gridData = GameMainController.getInstance().gridDataArr[gridId];
        return new egret.Point(gridData.posX, gridData.posY);
    };
    return GameMainSceneView;
}(eui.Component));
__reflect(GameMainSceneView.prototype, "GameMainSceneView");
//# sourceMappingURL=GameMainSceneView.js.map