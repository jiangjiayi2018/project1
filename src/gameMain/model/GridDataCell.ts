class GridDataCell {

    public gridId: number;
    public posX: number;
    public posY: number;
    public gridEvent: GridEvent;
    public extra: number;

    public constructor(obj: any){
        this.gridId = obj.gridId;
        this.posX = (adapter.UIWindow.getInstance().width * obj.posX)/540;
        this.posY = obj.posY;
        this.gridEvent = obj.gridEvent ? obj.gridEvent : GridEvent.NONE;
        this.extra = obj.extra ? obj.extra : 0;
    }
}

const enum GridEvent{
    /**没有事件*/
    NONE,
    /**前进n格*/
    FORWARD,
    /**再投一次*/
    AGAIN,
    /**礼品事件*/
    GIFT
}