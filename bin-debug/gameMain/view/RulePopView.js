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
var RulePopView = (function (_super) {
    __extends(RulePopView, _super);
    function RulePopView() {
        var _this = _super.call(this) || this;
        _this.skinName = "RulePop";
        return _this;
    }
    RulePopView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    RulePopView.prototype.init = function () {
        egret.localStorage.setItem("alreadyShowRuelPop", "1");
        adapter.DisplayUtil.addClickAniForBtn(this.closeBtn);
        this.initView();
        this.addEvent();
    };
    RulePopView.prototype.addEvent = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeViewHandle, this);
    };
    RulePopView.prototype.initView = function () {
        var strArr = ["让他看见我突然jerk他微软条件为看见他渴望我让他问题",
            "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
            "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
            "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
            "让他看见我突然jerk他微软条件为看见他渴望我让他问题",
            "让他看见我突然jerk他微软条件为看见他渴望我让他问题"
        ];
        for (var i = 0, leng = strArr.length; i < leng; ++i) {
            var lab = new eui.Label(strArr[i]);
            lab.size = 26;
            lab.width = 400;
            this.textGroup.addChild(lab);
        }
    };
    RulePopView.prototype.closeViewHandle = function () {
        adapter.UIWindow.getInstance().removeView(this, 1 /* TIP */);
    };
    return RulePopView;
}(eui.Component));
__reflect(RulePopView.prototype, "RulePopView");
//# sourceMappingURL=RulePopView.js.map