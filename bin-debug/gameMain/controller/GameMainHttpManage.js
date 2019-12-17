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
var GameMainHttpManage = (function () {
    function GameMainHttpManage() {
    }
    /**开始游戏请求*/
    GameMainHttpManage.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.get('/user/info')];
                    case 1:
                        res = _a.sent();
                        if (res.status === 1001) {
                            // window.location.href = service.BASE_URL + "/auth/login?returnUrl=" + service.LOCAL_URL;
                            GameMainController.getInstance().showTip(res.msg);
                            return [2 /*return*/, false];
                        }
                        else if (res.status === 200) {
                            GameMainController.getInstance().setUserInfo(res);
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**开始游戏请求*/
    GameMainHttpManage.requestStartGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.get('/game/start')];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            GameMainController.getInstance().gameId = res.data.id;
                            return [2 /*return*/, true];
                        }
                        else if (res.status === 1005) {
                            GameMainController.getInstance().showTip("游戏当前次数已用尽");
                        }
                        else {
                            GameMainController.getInstance().showTip("当前系统发生故障");
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**一次投骰子周期游戏结束请求*/
    GameMainHttpManage.requestEndGame = function (isAdd) {
        if (isAdd === void 0) { isAdd = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var param, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            id: GameMainController.getInstance().gameId,
                            isAdd: isAdd,
                            mark: GameMainController.getInstance().curGridId + "",
                        };
                        return [4 /*yield*/, service.get('/game/end', param)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            return [2 /*return*/, true];
                        }
                        else {
                            GameMainController.getInstance().showTip("游戏结束接口出错");
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**获得礼物请求*/
    GameMainHttpManage.getGift = function () {
        return __awaiter(this, void 0, void 0, function () {
            var param, res, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            id: GameMainController.getInstance().gameId
                        };
                        return [4 /*yield*/, service.get('/gift/lottery', param)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            result = {
                                type: res.data.giftInfo.type,
                                msg: null
                            };
                            if (result.type === 1 /* TICKET_GIFT */) {
                                result.msg = res.data.userGiftId;
                            }
                            else {
                                result.msg = res.data.giftInfo.giftId;
                            }
                            return [2 /*return*/, result];
                        }
                        else if (res.status === 2003) {
                            GameMainController.getInstance().showTip("谢谢参与");
                        }
                        else {
                            GameMainController.getInstance().showTip("游戏结束接口出错");
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**请求礼品列表数据*/
    GameMainHttpManage.getGiftList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, list, tempArr, i, leng;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.get('/gift/list')];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            list = res.data.list;
                            tempArr = [];
                            for (i = 0, leng = list.length; i < leng; ++i) {
                                tempArr.push(new GiftListDataCell(list[i]));
                            }
                            GameMainController.getInstance().giftListData = tempArr;
                            adapter.EventDispatcher.getInstance().dispatch(0 /* GET_GIFT_LIST_SUCCESS */, null);
                        }
                        else {
                            GameMainController.getInstance().showTip("用户奖品列表接口出错");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**兑换奖品*/
    GameMainHttpManage.exchangeGift = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var param, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {};
                        if (data.name) {
                            param["name"] = data.name;
                        }
                        if (data.phone) {
                            param["mobile"] = data.phone;
                        }
                        if (data.mail) {
                            param["email"] = data.mail;
                        }
                        if (data.userGiftId) {
                            param["userGiftId"] = data.userGiftId;
                        }
                        return [4 /*yield*/, service.get('/gift/success', param)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            GameMainController.getInstance().showTip("信息提交成功！");
                            return [2 /*return*/, true];
                        }
                        else {
                            GameMainController.getInstance().showTip("兑换奖品接口出错");
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    /**吊起微信卡卷SDK之前请求后台的接口数据*/
    GameMainHttpManage.getCardData = function (userGiftId) {
        return __awaiter(this, void 0, void 0, function () {
            var param, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            userGiftId: userGiftId
                        };
                        return [4 /*yield*/, service.get('/gift/get', param)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                            return [2 /*return*/, res];
                        }
                        else {
                            GameMainController.getInstance().showTip("获取卡卷数据接口出错");
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**数据上报*/
    GameMainHttpManage.reportData = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var param, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = {
                            uid: GameMainController.getInstance().userInfo.data.uid,
                            act: type
                        };
                        return [4 /*yield*/, service.get('/event/do', param)];
                    case 1:
                        res = _a.sent();
                        if (res.status === 200) {
                        }
                        else {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return GameMainHttpManage;
}());
__reflect(GameMainHttpManage.prototype, "GameMainHttpManage");
//# sourceMappingURL=GameMainHttpManage.js.map