class CardGiftView extends eui.Component {
    public cardIcon: eui.Image;
    public handleBtn: eui.Image;

    private cardType: number;

    public constructor(cardType: number) {
        super();
        this.cardType = cardType;
        this.skinName = "CardGift";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init(): void {
        adapter.DisplayUtil.addClickAniForBtn(this.handleBtn);
        this.initView();
        this.addEvent();
    }

    private addEvent(): void {
        this.handleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
    }

    private initView(): void {
        //设置卡卷icon
    }

    private closeViewHandle(): void {
        adapter.UIWindow.getInstance().removeView(this);
    }
}

