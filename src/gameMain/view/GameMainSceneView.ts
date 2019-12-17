
/**游戏主玩法界面*/
class GameMainSceneView extends eui.Component implements adapter.EventListener {
    public bgGroup: eui.Group;
    public childBgGroup1: eui.Group;
    public childBgGroup2: eui.Group;
    public boat: eui.Image;
    public playDiceBtn: eui.Image;
    public diceGroup: eui.Group;
    public ruleIcon: eui.Image;
    public listGroup: eui.Group;
    public listCount: eui.Label;


    /**骰子动画*/
    private ani: adapter.ArmatureAnimation = null;

    // /**当前所在的格子id*/
    // public _curGridId: number = 50;
    /**船当前所在的格子所属的容器ID号：1,2*/
    // public curBoatForGroup: eui.Group = null;
    /**放置两个背景图容器的数组*/
    private groupArr: eui.Group[] = null;

    /**当前所在的格子id*/
    public get curGridId(): number {
        return GameMainController.getInstance().curGridId;
    }

    public set curGridId(val) {
        GameMainController.getInstance().curGridId = val;
    }

    public constructor() {
        super();
        this.skinName = "MainScene";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init(): void {
        this.initData();
        this.initView();
        this.addEvent();
    }

    private addEvent(): void {
        this.addSomeEvent();
        adapter.EventDispatcher.getInstance().addListener(EventId.GET_GIFT_LIST_SUCCESS, this);
    }

    private removeEvent(): void{
        adapter.EventDispatcher.getInstance().removeListener(EventId.GET_GIFT_LIST_SUCCESS, this);
    }

    public handleEvent(code: number, data: any, src: any): void{
        switch (code) {
            case EventId.GET_GIFT_LIST_SUCCESS:
                {
                    this.listCount.text = `X${GameMainController.getInstance().giftListData.length}`;
                }
                break;
        }
    }

    private initData(): void {
        GameMainController.getInstance().initGridData();
        // this.curBoatForGroup = this.childBgGroup1;
        this.groupArr = [this.childBgGroup1, this.childBgGroup2];
    }

    private initView(): void {
        this.initStaticView();
        this.initBg();
        this.setStateView();
    }

    private initStaticView(): void {
        this.diceGroup.visible = false;
        adapter.DisplayUtil.addClickAniForBtn(this.playDiceBtn, 0.8, 0.8);
    }

    private initBg(): void {
        this.setGroupPos();
        this.addImgToGroup(this.childBgGroup1);
        this.addImgToGroup(this.childBgGroup2);
        this.addGiftBoxToGroup(this.childBgGroup1);
        this.addGiftBoxToGroup(this.childBgGroup2);
    }

    /**设置界面的元素位置状态*/
    private setStateView(): void {
        this.testBgGroup();
        this.setBoat();
    }

    /**设置各个容器的y值*/
    private setGroupPos(): void {
        let posY = 0;
        for (let i = 0, leng = this.groupArr.length; i < leng; ++i) {
            let group = this.groupArr[i];
            group.y = posY;
            posY += group.height;
        }
        this.bgGroup.height = posY;
    }

    private addImgToGroup(group: eui.Group): void {
        let imgHeightArr: number[] = [1030, 1030, 1268, 1025];
        let posY = 0;
        for (let i = 0; i < 4; ++i) {
            let img = new eui.Image(`mainBg_${i + 1}_png`);
            img.y = posY;
            img.left = 0;
            img.right = 0;
            group.addChild(img);
            posY += imgHeightArr[i];
        }
    }

    /**添加礼品盒icon到背景上*/
    private addGiftBoxToGroup(group: eui.Group): void {
        let gridDataArr = GameMainController.getInstance().gridDataArr;
        for (let i = 0, leng = gridDataArr.length; i < leng; ++i) {
            let gridData = gridDataArr[i];
            if (gridData.gridEvent === GridEvent.GIFT) {
                let img = new eui.Image("other_13_png");
                img.x = gridData.posX;
                img.y = gridData.posY;
                img.width = img.height = 50;
                img.anchorOffsetX = img.anchorOffsetY = img.width * 0.5;
                group.addChild(img);
            }
        }
    }

    /**检测背容器里面的背景图的位置是否需要调整*/
    private testBgGroup(): void {
        let curGridPosY = this.getGridPos(this.curGridId).y;
        let midY = adapter.UIWindow.getInstance().height * 0.5;
        this.bgGroup.y = -(curGridPosY - midY);
        if (curGridPosY - midY < 200) {
            let tempVal = -this.bgGroup.y;
            this.groupArr.push(this.groupArr.pop());
            this.setGroupPos();
            this.bgGroup.y = -(tempVal + this.groupArr[0].height);
        }
    }

    /**初始化船的位置*/
    private setBoat(): void {
        this.boat.x = GameMainController.getInstance().gridDataArr[this.curGridId].posX;
        this.boat.y = adapter.UIWindow.getInstance().height * 0.5;
        this.setBoatDiect();
    }


    /**设置船的方向*/
    private setBoatDiect(): void {
        let curGridId = this.curGridId;
        let gridDataArr = GameMainController.getInstance().gridDataArr;
        let nextGridId: number = curGridId - 1;;
        if (nextGridId < 0) {
            nextGridId = gridDataArr.length - 1;
        }
        this.boat.scaleX = this.getGridPos(curGridId).x < this.getGridPos(nextGridId).x ? 1 : -1;
    }

    /**船只移动*/
    private async boatMove(pathArr: number[]): Promise<void> {
        pathArr.unshift(this.curGridId);
        for (let i = 1, leng = pathArr.length; i < leng; ++i) {
            await this.boatMoveOneCell(pathArr[i - 1], pathArr[i]);
            this.curGridId = pathArr[i];
            this.setBoatDiect();
            // if (pathArr[i - 1] < pathArr[i]) {
            //     this.curBoatForGroup = this.getOtherGroup(this.curBoatForGroup);
            // }
        }
        this.testBgGroup();
        //触发可能的事件
        this.triggerEventHandle();

    }

    /**船移动一格*/
    private async boatMoveOneCell(fromGridId: number, toGridId: number): Promise<void> {
        let fromPos = this.getGridPos(fromGridId);
        let toPos = this.getGridPos(toGridId);
        if (fromGridId < toGridId) {
            let y = -(4353 - toPos.y);
            toPos = new egret.Point(toPos.x, y);
        }
        adapter.tween(this.boat).by({ x: toPos.x - fromPos.x }, 500);
        adapter.tween(this.bgGroup).by({ y: -(toPos.y - fromPos.y) }, 500);
        await adapter.Scheduler.waitForTime(500);
    }

    /**手动点击之后投骰子的操作*/
    private async clickBtnHandle(): Promise<void> {
        GameMainHttpManage.reportData(DataReportType.CLICK_DICE);
        this.cancelEvent();
        let result = await GameMainHttpManage.requestStartGame();
        if (result) {
            let pathArr = GameMainController.getInstance().getPathArr(this.curGridId, adapter.Util.random(1, 7));
            this.excutePlayCycle(pathArr);
        } else {
            this.addSomeEvent();
        }
    }




    /**船只移动之后出发的事件*/
    private async triggerEventHandle(): Promise<void> {
        let contrl = GameMainController.getInstance();
        let eventId = contrl.gridDataArr[this.curGridId].gridEvent;

        //移动结束之后上报给后台
        if (eventId !== GridEvent.FORWARD) {
            GameMainHttpManage.requestEndGame(eventId === GridEvent.AGAIN ? 1 : 0);
        }

        switch (eventId) {
            case GridEvent.FORWARD:
                {
                    await adapter.Scheduler.waitForTime(1000);
                    let gridNum = contrl.gridDataArr[this.curGridId].extra;
                    let pathArr = contrl.getPathArr(this.curGridId, gridNum);
                    this.boatMove(pathArr)
                    break;
                }

            case GridEvent.AGAIN:
                {
                    await adapter.Scheduler.waitForTime(1000);
                    this.clickBtnHandle();
                    break;
                }

            case GridEvent.GIFT:
                {
                    //todo
                    GameMainController.getInstance().showGiftPopView();
                    this.addSomeEvent();
                    break;
                }

            default:
                {
                    this.addSomeEvent();
                }
                break;
        }
    }


    /**触发一次投骰子的周期*/
    private async excutePlayCycle(pathArr: number[]): Promise<void> {

        await this.showGridAni(pathArr.length);
        await adapter.Scheduler.waitForTime(100);
        await this.boatMove(pathArr);
    }



    /**显示投骰子动画*/
    private async showGridAni(num: number): Promise<void> {
        let ani = this.ani;
        if (!this.ani) {
            ani = this.ani = new adapter.ArmatureAnimation();
            await ani.initWithName("ss1");
            ani.x = this.width * 0.5;
            ani.y = this.height * 0.5 + 150;
        }
        this.diceGroup.visible = true;
        this.diceGroup.addChild(ani);
        ani.setAnimation(0, num + "", 1);
        await ani.waitEvent(adapter.ArmatureAnimation.EVENT_COMPLETE);
        await adapter.Scheduler.waitForTime(350);
        this.diceGroup.removeChild(ani);
        this.diceGroup.visible = false;
    }

    /**投骰子周期结束添加按钮的点击事件监听*/
    private addSomeEvent(): void {
        this.playDiceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnHandle, this);
        this.ruleIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRulePop, this);
        this.listGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGiftListView, this);
    }

    /**投骰子周期中取消按钮的点击事件监听*/
    private cancelEvent(): void {
        this.playDiceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnHandle, this);
        this.ruleIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showRulePop, this);
        this.listGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showGiftListView, this);
    }

    /**显示规则弹框*/
    private showRulePop(): void {
        GameMainController.getInstance().showRulePopView();
    }

    /**显示礼品列表弹框*/
    private showGiftListView(): void {
        GameMainController.getInstance().showGiftListView();
    }



    /**获取另外一个容器*/
    private getOtherGroup(group: eui.Group): eui.Group {
        return group === this.childBgGroup1 ? this.childBgGroup2 : this.childBgGroup1;
    }

    // /**获取格子坐标在当前bgGroup容器里面的坐标值*/
    // private getGridLocalPos(gridId: number, parentGroup: eui.Group): egret.Point {
    //     let gridPos = this.getGridPos(gridId);
    //     let tempPos = parentGroup.localToGlobal(gridPos.x, gridPos.y);
    //     let tempPos1 = this.bgGroup.globalToLocal(tempPos.x, tempPos.y);
    //     return tempPos1;
    // }


    /**获取格子的坐标值*/
    private getGridPos(gridId: number): egret.Point {
        let gridData = GameMainController.getInstance().gridDataArr[gridId];
        return new egret.Point(gridData.posX, gridData.posY);
    }






}