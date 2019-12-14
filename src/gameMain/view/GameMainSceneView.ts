
/**游戏主玩法界面*/
class GameMainSceneView extends eui.Component {
    public bgGroup: eui.Group;
    public childBgGroup1: eui.Group;
    public childBgGroup2: eui.Group;
    public boat: eui.Image;
    public playDiceBtn: eui.Image;


    /**当前所在的格子id*/
    public curGridId: number = 50;
    /**船当前所在的格子所属的容器ID号：1,2*/
    // public curBoatForGroup: eui.Group = null;
    /**放置两个背景图容器的数组*/
    private groupArr: eui.Group[] = null;

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
        this.playDiceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnHandle, this);
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
        adapter.DisplayUtil.addClickAniForBtn(this.playDiceBtn);
    }

    private initBg(): void {
        this.setGroupPos();
        this.addImgToGroup(this.childBgGroup1);
        this.addImgToGroup(this.childBgGroup2);
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
    private clickBtnHandle(): void {
        let pathArr = GameMainController.getInstance().getPathArr(this.curGridId, adapter.Util.random(1, 7));
        this.excutePlayCycle(pathArr);
    }


    /**船只移动之后出发的事件*/
    private triggerEventHandle(): void {
        let contrl = GameMainController.getInstance();
        let eventId = contrl.gridDataArr[this.curGridId].gridEvent;
        switch (eventId) {
            case GridEvent.FORWARD:
                {
                    let gridNum = contrl.gridDataArr[this.curGridId].extra;
                    let pathArr = contrl.getPathArr(this.curGridId, gridNum);
                    this.excutePlayCycle(pathArr);
                    break;
                }

            case GridEvent.AGAIN:
                {
                    this.clickBtnHandle();
                    break;
                }

            case GridEvent.GIFT:
                {
                    //todo
                    break;
                }

            default:
                break;
        }
    }


    /**触发一次投骰子的周期*/
    private async excutePlayCycle(pathArr: number[]): Promise<void> {
        await this.showGridAni(pathArr.length);
        await adapter.Scheduler.waitForTime(100);
        this.boatMove(pathArr);
    }

    /**显示投骰子动画*/
    private async showGridAni(num: number): Promise<void> {
        // let ani = new adapter.ArmatureAnimation();
        // await ani.initWithName("baoxiang");
        // // await ani.initWithName("ss1");
        // ani.x = this.width * 0.5;
        // ani.y = this.height * 0.5;
        // this.addChild(ani);
        // ani.setAnimation(0, "box_open", 1);
        // // ani.setAnimation(0, num + "", 1);
        // await ani.waitEvent(adapter.ArmatureAnimation.EVENT_COMPLETE);
        // // this.removeChild(ani);
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