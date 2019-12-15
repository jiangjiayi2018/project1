
class TicketGiftView extends eui.Component {
    public ticketImg: eui.Image;
    public tickText: eui.Label;
    public handleBtn: eui.Image;


    private tickMsg: {imgPath: string, desc: string};

    public constructor(tickMsg:any) {
        super();
        this.tickMsg = tickMsg;
        this.skinName = "TicketGift";
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
        this.handleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.handleBtnHandle, this);
    }

    private initView(): void {
        RES.getResByUrl(this.tickMsg.imgPath).then((res) => {
            this.ticketImg.source = res;
        });
        this.tickText.text = this.tickMsg.desc;
    }

    private handleBtnHandle(): void {
        GameMainController.getInstance().showInputView();
        adapter.UIWindow.getInstance().removeView(this);
    }
}

