var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 领取门票收集表单数据界面
 */
var InputPopView = (function (_super) {
    __extends(InputPopView, _super);
    function InputPopView(userGiftId) {
        var _this = _super.call(this) || this;
        _this.userGiftId = userGiftId;
        _this.skinName = "InputViewSkin";
        return _this;
    }
    InputPopView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    InputPopView.prototype.init = function () {
        adapter.DisplayUtil.addClickAniForBtn(this.backBtn);
        adapter.DisplayUtil.addClickAniForBtn(this.handleBtn);
        this.initView();
        this.addEvent();
    };
    InputPopView.prototype.addEvent = function () {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
        this.handleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.submitHandle, this);
    };
    InputPopView.prototype.initView = function () {
    };
    InputPopView.prototype.submitHandle = function () {
        var data = {
            name: this.nameInput.text,
            phone: this.phoneInput.text,
            mail: this.mailInput.text,
            userGiftId: this.userGiftId
        };
        if (!data.name || !data.phone || !data.mail) {
            alert("提交信息不全！");
            return;
        }
        //向后台发送表单提交数据
        GameMainHttpManage.exchangeGift(data);
        this.closeViewHandle();
    };
    InputPopView.prototype.closeViewHandle = function () {
        adapter.UIWindow.getInstance().removeView(this);
    };
    return InputPopView;
}(eui.Component));
__reflect(InputPopView.prototype, "InputPopView");
//# sourceMappingURL=InputPopView.js.map