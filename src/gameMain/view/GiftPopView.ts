
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

    private openwHandle(): void {
        //判断是卡卷还是门票；
        let type: GiftType;
        switch (type) {
            case GiftType.CARD_GIFT:
                {
                    GameMainController.getInstance().showCardGiftView();
                    break;
                }

            case GiftType.TICKET_GIFT:
                {
                    GameMainController.getInstance().showTickGiftView();
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
    /**卡卷*/
    CARD_GIFT,
    /**门票*/
    TICKET_GIFT
}

