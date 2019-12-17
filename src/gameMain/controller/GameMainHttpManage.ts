class GameMainHttpManage {

    /**开始游戏请求*/
    public static async getUserInfo(): Promise<boolean> {
        let res = await service.get('/user/info');
        if (res.status === 1001) {
            // window.location.href = service.BASE_URL + "/auth/login?returnUrl=" + service.LOCAL_URL;
            GameMainController.getInstance().showTip(res.msg);
            return false;
        } else if (res.status === 200) {
            GameMainController.getInstance().setUserInfo(res);
            return true;
        }
    }

    /**开始游戏请求*/
    public static async requestStartGame(): Promise<boolean> {
        let res = await service.get('/game/start');
        if (res.status === 200) {
            GameMainController.getInstance().gameId = res.data.id;
            return true;
        } else if (res.status === 1005) {
            GameMainController.getInstance().showTip("游戏当前次数已用尽");
        } else {
            GameMainController.getInstance().showTip("当前系统发生故障");
        }
        return false;
    }

    /**一次投骰子周期游戏结束请求*/
    public static async requestEndGame(isAdd: number = 0): Promise<boolean> {
        let param = {
            id: GameMainController.getInstance().gameId,
            isAdd: isAdd,
            mark: GameMainController.getInstance().curGridId + "",
        }
        let res = await service.get('/game/end', param);
        if (res.status === 200) {
            return true;
        } else {
            GameMainController.getInstance().showTip("游戏结束接口出错");
        }
        return false;
    }

    /**获得礼物请求*/
    public static async getGift(): Promise<{ type: GiftType, msg: any }> {
        let param = {
            id: GameMainController.getInstance().gameId
        }
        let res = await service.get('/gift/lottery', param);

        if (res.status === 200) {
            let result = {
                type: res.data.giftInfo.type,
                msg: null
            }
            if (result.type === GiftType.TICKET_GIFT) {
                result.msg = res.data.userGiftId;
            } else {
                result.msg = res.data.giftInfo.giftId;
            }
            return result;

        } else if (res.status === 2003) {
            GameMainController.getInstance().showTip("谢谢参与");
        } else {
            GameMainController.getInstance().showTip("游戏结束接口出错");
        }
        return null;
    }

    /**请求礼品列表数据*/
    public static async getGiftList(): Promise<void> {
        let res = await service.get('/gift/list');
        if (res.status === 200) {
            let list = res.data.list;
            let tempArr = [];
            for (let i = 0, leng = list.length; i < leng; ++i) {
                tempArr.push(new GiftListDataCell(list[i]));
            }
            GameMainController.getInstance().giftListData = tempArr;
            adapter.EventDispatcher.getInstance().dispatch(EventId.GET_GIFT_LIST_SUCCESS, null);
        } else {
            GameMainController.getInstance().showTip("用户奖品列表接口出错");
        }
    }

    /**兑换奖品*/
    public static async exchangeGift(data: any): Promise<boolean> {
        let param = {};
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
        let res = await service.get('/gift/success', param);
        if (res.status === 200) {
            GameMainController.getInstance().showTip("信息提交成功！");
            return true;
        } else {
            GameMainController.getInstance().showTip("兑换奖品接口出错");
        }
        return false;
    }

    /**吊起微信卡卷SDK之前请求后台的接口数据*/
    public static async getCardData(userGiftId: number): Promise<any> {
        let param = {
            userGiftId: userGiftId
        }
        let res = await service.get('/gift/get', param);
        if (res.status === 200) {
            return res;
        } else {
            GameMainController.getInstance().showTip("获取卡卷数据接口出错");
        }
        return null;
    }

    /**数据上报*/
    public static async reportData(type: DataReportType): Promise<void> {
        let param = {
            uid: GameMainController.getInstance().userInfo.data.uid,
            act: type
        }
        let res = await service.get('/event/do', param);
        if (res.status === 200) {
        } else {
        }
    }


}