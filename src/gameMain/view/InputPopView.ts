class InputPopView extends eui.Component {
    public backBtn: eui.Image;
    public nameInput: eui.EditableText;
    public phoneInput: eui.EditableText;
    public mailInput: eui.EditableText;
    public handleBtn: eui.Image;

    public constructor() {
        super();
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
        //设置卡卷icon
    }

    private submitHandle(): void {
        let nameText = this.nameInput.text;
        let phone = this.phoneInput.text;
        let maile = this.mailInput.text;
        if (!nameText || !phone || !maile) {
            alert("表单信息不全*************");
            return;
        }
        //向后台发送表单提交数据
        this.closeViewHandle();
    }

    private closeViewHandle(): void {
        adapter.UIWindow.getInstance().removeView(this);
    }
}

