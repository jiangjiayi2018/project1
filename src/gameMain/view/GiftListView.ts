
class GiftListView extends eui.Component {
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
    }

    private initView(): void {
        this.contentList.itemRenderer = GiftListItemView;
        this.contentList.dataProvider = this.arrayCollection;
        this.arrayCollection.source = GameMainController.getInstance().giftListData;
    }

    private closeViewHandle(): void {
        GameMainController.getInstance().closeGiftListView();
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
    }

    private addEvent(): void {
        adapter.DisplayUtil.addClickAniForBtn(this.getBtn);
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
    }

    private getBtnHandle(): void {
        let data: GiftListDataCell = this.data;
        switch (data.giftType) {
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
        GameMainController.getInstance().closeGiftListView();
    }

}

