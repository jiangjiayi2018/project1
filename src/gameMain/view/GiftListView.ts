/**
 * 礼品列表显示界面
 */
class GiftListView extends eui.Component implements adapter.EventListener {
    public backBtn: eui.Image;
    public contentList: eui.List;

    private arrayCollection: eui.ArrayCollection = new eui.ArrayCollection();

    public constructor() {
        super();
        this.skinName = "GiftList";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.init();
    }

    private init(): void {
        adapter.DisplayUtil.addClickAniForBtn(this.backBtn);
        this.initView();
        this.addEvent();
    }

    private addEvent(): void {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
        adapter.EventDispatcher.getInstance().addListener(EventId.GET_GIFT_CLOSE_VIEW, this);
    }

    private removeEvent(): void{
        adapter.EventDispatcher.getInstance().removeListener(EventId.GET_GIFT_CLOSE_VIEW, this);
    }

    public handleEvent(code: number, data: any, src: any): void {
        switch (code) {
            case EventId.GET_GIFT_CLOSE_VIEW:
                {
                    this.closeViewHandle();
                }
                break;
        }
    }

    private initView(): void {
        this.contentList.itemRenderer = GiftListItemView;
        this.contentList.dataProvider = this.arrayCollection;
        this.arrayCollection.source = GameMainController.getInstance().giftListData;
    }

    private closeViewHandle(): void {
        this.removeEvent();
        adapter.UIWindow.getInstance().removeView(this);
    }
}

class GiftListItemView extends eui.ItemRenderer {
    public iconImg: eui.Image;
    public getBtn: eui.Image;
    public desc: eui.Label;
    public timeText: eui.Label;


    public constructor() {
        super();
        this.skinName = "GiftListItem";
        this.addEvent();
    }

    private addEvent(): void {
        adapter.DisplayUtil.addClickAniForBtn(this.getBtn, 0.8, 0.8);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getBtnHandle, this);
    }


    public dataChanged(): void {
        super.dataChanged();
        let data: GiftListDataCell = this.data;
        RES.getResByUrl(data.imgIcon).then((res) => {
            this.iconImg.source = res;
        });
        this.desc.text = data.desc;
        this.timeText.text = data.timeText;
        this.getBtn.source = data.status === 0 ? "other_22_png" : "other_29_png";
    }

    private getBtnHandle(): void {
        let data: GiftListDataCell = this.data;
        if (data.status !== 0) {
            alert("此奖品已领取");
            return;
        }
        switch (data.giftType) {
            case GiftType.CARD_GIFT:
                {
                    //领取卡卷
                    GameMainController.getInstance().getCardGift(data.userGiftId);
                    break;
                }

            case GiftType.TICKET_GIFT:
                {
                    GameMainController.getInstance().showInputView(data.userGiftId);
                    break;
                }
        }
        adapter.EventDispatcher.getInstance().dispatch(EventId.GET_GIFT_CLOSE_VIEW, null);
    }

}

