/**
 * 领取门票收集表单数据界面
 */
class InputPopView extends eui.Component {
    public backBtn: eui.Image;
    public nameInput: eui.EditableText;
    public phoneInput: eui.EditableText;
    public mailInput: eui.EditableText;
    public handleBtn: eui.Image;

    private userGiftId: number;

    public constructor(userGiftId: number) {
        super();
        this.userGiftId = userGiftId;
        this.skinName = "InputViewSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init(): void {
        adapter.DisplayUtil.addClickAniForBtn(this.backBtn);
        adapter.DisplayUtil.addClickAniForBtn(this.handleBtn);
        this.initView();
        this.addEvent();
    }

    private addEvent(): void {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
        this.handleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandle, this);
    }

    private initView(): void {
    }

    private submitHandle(): void {
        let data = {
            name: this.nameInput.text,
            phone: this.phoneInput.text,
            mail: this.mailInput.text,
            userGiftId: this.userGiftId
        }
        if (!data.name || !data.phone || !data.mail) {
            GameMainController.getInstance().showTip("提交信息不全！");
            return;
        }

        //向后台发送表单提交数据
        GameMainHttpManage.exchangeGift(data);
        this.closeViewHandle();
    }

    private closeViewHandle(): void {
        adapter.UIWindow.getInstance().removeView(this);
    }
}

