class GameMainController {
    private static _instance: GameMainController = null;

    private constructor() { }

    public static getInstance(): GameMainController {
        if (!GameMainController._instance) {
            GameMainController._instance = new GameMainController();
        }
        return GameMainController._instance;
    }

    /**登录游戏之后获得的用户信息*/
    public userInfo: any = null;

    /**当前所在的格子id*/
    public curGridId: number = 50;
    /**格子相关数据*/
    public gridDataArr: GridDataCell[] = [];
    /**礼物列表数据*/
    public giftListData: GiftListDataCell[] = [];

    /**游戏id  游戏结束和抽奖接口需要提交*/
    public gameId: number;

    /**登录游戏之后获得的用户信息*/
    public setUserInfo(obj: any): void {
        this.userInfo = obj;
        this.curGridId = Number(obj.data.mark);
        localStorage.setItem('uid', obj.data.uid);
    }

    /**显示游戏主界面*/
    public showMainView(): void {
        adapter.UIWindow.getInstance().addView(new GameMainSceneView());
        if (this.isShowRulePop()) {
            this.showRulePopView();
        }
        GameMainHttpManage.getGiftList();
    }

    /**显示规则弹框*/
    public showRulePopView(): void {
        adapter.UIWindow.getInstance().addView(new RulePopView(), adapter.LayerType.TIP);
    }

    /**显示礼物事件弹框*/
    public showGiftPopView(): void {
        adapter.UIWindow.getInstance().addView(new GiftPopView());
    }

    /**显示卡卷弹框*/
    public showCardGiftView(cardId: number): void {
        adapter.UIWindow.getInstance().addView(new CardGiftView(cardId));
    }

    /**显示门票弹框*/
    public showTickGiftView(userGiftId: number): void {
        adapter.UIWindow.getInstance().addView(new TicketGiftView(userGiftId));
    }

    /**显示表单信息弹框*/
    public showInputView(userGiftId: number): void {
        adapter.UIWindow.getInstance().addView(new InputPopView(userGiftId));
    }


    /**显示礼品列表弹框*/
    public showGiftListView(): void {
        GameMainHttpManage.getGiftList().then(() => {
            adapter.UIWindow.getInstance().addView(new GiftListView());
        });
    }

    /**显示提示信息*/
    public showTip(str: string): void {
        let view = new ShowTipPop();
        adapter.UIWindow.getInstance().addView(view);
        view.showTip(str);
    }


    /**判断是否需要显示规则弹框*/
    private isShowRulePop(): boolean {
        let alreadyShow = egret.localStorage.getItem("alreadyShowRuelPop");
        return !alreadyShow;
    }

    /**初始化格子所需的数据*/
    public initGridData(): void {
        let gridObj = RES.getRes("grid_json");
        for (let gridId in gridObj) {
            if (gridObj.hasOwnProperty(gridId)) {
                this.gridDataArr[gridId] = new GridDataCell(gridObj[gridId]);
            }
        }
    }

    /**获取船只的行走路径*/
    public getPathArr(curGridId: number, gridNum): number[] {
        // let gridNum = adapter.Util.random(1, 7);
        let tempArr = [];
        for (let i = 0; i < gridNum; ++i) {
            let gridId = curGridId - 1;
            if (gridId < 0) {
                gridId = this.gridDataArr.length - 1;
            }
            tempArr.push(gridId);
            curGridId = gridId;
        }
        return tempArr;
    }

    /**领取卡卷流程操作*/
    public async getCardGift(userGiftId: number): Promise<void> {
        let result = await GameMainHttpManage.getCardData(userGiftId);
        //调用微信sdk
        if (result) {
            wx.addCard({
                cardList: [result.data.cardInfo],
                success: (res) => {
                    //通知后台领取卡卷成功
                    GameMainHttpManage.exchangeGift({ userGiftId: result.data.userGiftId });
                }
            });
        }


    }
}