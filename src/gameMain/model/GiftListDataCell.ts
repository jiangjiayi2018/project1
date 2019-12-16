class GiftListDataCell {

    public userGiftId: number;
    public imgIcon: string;
    public desc: string;
    public timeText: string;
    public giftType: GiftType;
    /**是否已经提交表单 0表示未提交表单；2表示已提交表单*/
    public status: number;

    public constructor(obj: any) {
        this.userGiftId = obj.userGiftId;
        this.imgIcon = obj.image;
        this.desc = obj.name;
        this.timeText = obj.addTime.split(" ")[0];
        this.giftType = obj.type;
        this.timeText = obj.userGiftId;
        this.status = obj.status;
    }

}

/**门票界面显示需要的数据*/
class TickeViewData {
    public imgPath: string;
    public userGiftId: number;
    public desc: string;

    public constructor(obj: any) {
        this.imgPath = obj.giftInfo.image;
        this.userGiftId = obj.userGiftId;
        this.desc = obj.giftInfo.name;
    }
}
