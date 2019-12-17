class ShowTipPop extends eui.Component {
    public tipGroup: eui.Group;
    public tipText: eui.Label;


    public constructor() {
        super();
        this.skinName = "ShowTipPopSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.tipGroup.visible = false;
        this.tipGroup.y = this.height * 0.5;
    }


    public showTip(str: string): void {
        this.tipText.text = str;
        this.tipGroup.visible = true;
        adapter.tween(this.tipGroup).by({y: -450, alpha: -1}, 2000).then(() => {
            this.closeViewHandle();
        });
    }

    private closeViewHandle(): void {
        adapter.UIWindow.getInstance().removeView(this);
    }
}

