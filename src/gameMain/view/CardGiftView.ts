/**
 * 获得卡卷弹框显示界面
 */
class CardGiftView extends eui.Component {
    public cardIcon: eui.Image;
    public handleBtn: eui.Image;

    private cardId: number;

    public constructor(cardId: number) {
        super();
        this.cardId = cardId;
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
        this.cardIcon.source = `other_5${this.cardId}_png`;
    }

    private closeViewHandle(): void {
        adapter.UIWindow.getInstance().removeView(this);
    }
}

