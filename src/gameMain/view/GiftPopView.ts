/**
 * 获得礼品弹框显示界面
 */
class GiftPopView extends eui.Component {
    public openBtn: eui.Image;

    public constructor() {
        super();
        this.skinName = "GiftPop";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init(): void {
        adapter.DisplayUtil.addClickAniForBtn(this.openBtn);
        this.initView();
        this.addEvent();
    }

    private addEvent(): void {
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openwHandle, this);
    }

    private initView(): void {

    }

    private async openwHandle(): Promise<void> {
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openwHandle, this);
        adapter.SoundManager.playSoundAsync(sound.openGift);
        GameMainHttpManage.reportData(DataReportType.OPEN_GIFT);
        let openResult = await GameMainHttpManage.getGift();
        /**刷新列表数量*/
        GameMainHttpManage.getGiftList();
        //判断是卡卷还是门票；
        let type: GiftType = openResult && openResult.type;
        switch (type) {
            case GiftType.CARD_GIFT:
                {
                    GameMainController.getInstance().showCardGiftView(openResult.msg);
                    break;
                }

            case GiftType.TICKET_GIFT:
                {
                    GameMainController.getInstance().showTickGiftView(openResult.msg);
                    break;
                }
        }
        this.closeView();
    }

    private closeView(): void {
        adapter.UIWindow.getInstance().removeView(this);
    }
}

/**礼物类型*/
const enum GiftType {
    /**门票*/
    TICKET_GIFT = 1,
    /**卡卷*/
    CARD_GIFT = 2
}

