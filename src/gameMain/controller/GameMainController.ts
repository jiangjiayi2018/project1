class GameMainController {
    private static _instance: GameMainController = null;

    private constructor() { }

    public static getInstance(): GameMainController {
        if (!GameMainController._instance) {
            GameMainController._instance = new GameMainController();
        }
        return GameMainController._instance;
    }


    /**格子相关数据*/
    public gridDataArr: GridDataCell[] = [];
    /**礼物列表数据*/
    public giftListData: GiftListDataCell[] = [];
    /**礼品列表弹框对象引用*/
    private giftListView: GiftListView = null;

    /**显示游戏主界面*/
    public showMainView(): void {
        adapter.UIWindow.getInstance().addView(new GameMainSceneView());
        if (this.isShowRulePop()) {
            this.showRulePopView();
        }
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
    public showCardGiftView(): void {
        adapter.UIWindow.getInstance().addView(new CardGiftView());
    }

    /**显示门票弹框*/
    public showTickGiftView(): void {
        adapter.UIWindow.getInstance().addView(new TicketGiftView());
    }

    /**显示表单信息弹框*/
    public showInputView(): void {
        adapter.UIWindow.getInstance().addView(new InputPopView());
    }

    
    /**显示礼品列表弹框*/
    public showGiftListView(): void {
        //请求列表数据
        let view = this.giftListView = new GiftListView();
        adapter.UIWindow.getInstance().addView(view);
    }

    /**关闭礼品列表弹框*/
    public closeGiftListView(): void {
        let view = this.giftListView;
        if (view) {
            adapter.UIWindow.getInstance().removeView(view);
            this.giftListView = null;
        }
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
}