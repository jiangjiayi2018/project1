class GameMainHttpManage {

    /**开始游戏请求*/
    public static async requestStartGame(): Promise<boolean> {
        let res = await service.get('/game/start');
        if (res.status === 200) {
            GameMainController.getInstance().gameId = res.data.id;
            return true;
        } else if (res.status === 1005) {
            alert("游戏当前次数已用尽");
        } else {
            alert("当前系统发生故障");
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
            alert("游戏结束接口出错");
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
            alert("谢谢参与");
        } else {
            alert("游戏结束接口出错");
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
            console.error("用户奖品列表接口出错");
        }
    }

    /**兑换奖品*/
    public static async exchangeGift(data: any): Promise<boolean> {
        let param = {
            name: data.name,
            mobile: data.phone,
            email: data.mail,
            userGiftId: data.userGiftId
        }
        let res = await service.get('/gift/success', param);
        if (res.status === 200) {
            return true;
        } else {
            alert("兑换奖品接口出错");
        }
        return false;
    }

    /**吊起微信卡卷SDK之前请求后台的接口数据*/
    public static async getCardData(): Promise<any> {
        let res = await service.get('/gift/get');
        if (res.status === 200) {
            return res;
        } else {
            alert("获取卡卷数据接口出错");
        }
        return null;
    }


}