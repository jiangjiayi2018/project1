/**
 * 游戏规则弹框界面
 */
class RulePopView extends eui.Component {
    public textScrol: eui.Scroller;
    public textGroup: eui.Group;
    public closeBtn: eui.Image;


    public constructor() {
        super();
        this.skinName = "RulePop";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init(): void {
        egret.localStorage.setItem("alreadyShowRuelPop", "1");
        adapter.DisplayUtil.addClickAniForBtn(this.closeBtn);
        this.initView();
        this.addEvent();
    }

    private addEvent(): void {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
    }

    private initView(): void {
        let strArr: string[] = ["让他看见我突然jerk他微软条件为看见他渴望我让他问题",
        "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
        "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
        "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
        "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
        "让他看见我突然jerk他微软条件为看见他渴望我让他问题"
        ];
        for(let i = 0, leng = strArr.length; i < leng; ++i){
            let lab = new eui.Label(strArr[i]);
            lab.size = 26;
            lab.width = 400;
            this.textGroup.addChild(lab);
        }
    }

    private closeViewHandle(): void {
        adapter.UIWindow.getInstance().removeView(this, adapter.LayerType.TIP);
    }
}

