window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CardGift.exml'] = window.CardGift = (function (_super) {
	__extends(CardGift, _super);
	function CardGift() {
		_super.call(this);
		this.skinParts = ["cardIcon","handleBtn"];
		
		this.height = 958;
		this.width = 540;
		this.elementsContent = [this._Image1_i(),this.cardIcon_i(),this.handleBtn_i()];
	}
	var _proto = CardGift.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "other_16_png";
		t.top = 0;
		return t;
	};
	_proto.cardIcon_i = function () {
		var t = new eui.Image();
		this.cardIcon = t;
		t.horizontalCenter = 0;
		t.source = "other_51_png";
		t.verticalCenter = -69.5;
		return t;
	};
	_proto.handleBtn_i = function () {
		var t = new eui.Image();
		this.handleBtn = t;
		t.anchorOffsetX = 92;
		t.anchorOffsetY = 40;
		t.horizontalCenter = 0.5;
		t.source = "other_3_png";
		t.verticalCenter = 366;
		return t;
	};
	return CardGift;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GiftList.exml'] = window.GiftList = (function (_super) {
	__extends(GiftList, _super);
	function GiftList() {
		_super.call(this);
		this.skinParts = ["backBtn","contentList"];
		
		this.height = 960;
		this.width = 540;
		this.elementsContent = [this._Image1_i(),this.backBtn_i(),this._Group1_i()];
	}
	var _proto = GiftList.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "other_25_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.backBtn_i = function () {
		var t = new eui.Image();
		this.backBtn = t;
		t.anchorOffsetX = 34.85;
		t.anchorOffsetY = 33.33;
		t.source = "other_6_png";
		t.x = 88.1;
		t.y = 69.77;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = -30;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "other_26_png";
		t.x = 96;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "other_24_png";
		t.x = 185.67;
		t.y = 11;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "other_20_png";
		t.x = 0;
		t.y = 102.56;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 504;
		t.width = 386;
		t.x = 31;
		t.y = 130.56;
		t.viewport = this.contentList_i();
		return t;
	};
	_proto.contentList_i = function () {
		var t = new eui.List();
		this.contentList = t;
		return t;
	};
	return GiftList;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GiftListItem.exml'] = window.GiftListItem = (function (_super) {
	__extends(GiftListItem, _super);
	function GiftListItem() {
		_super.call(this);
		this.skinParts = ["iconImg","getBtn","desc","timeText"];
		
		this.height = 66;
		this.width = 400;
		this.elementsContent = [this.iconImg_i(),this.getBtn_i(),this.desc_i(),this.timeText_i()];
	}
	var _proto = GiftListItem.prototype;

	_proto.iconImg_i = function () {
		var t = new eui.Image();
		this.iconImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.source = "other_10_png";
		t.width = 50;
		t.x = 14;
		t.y = 5;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Image();
		this.getBtn = t;
		t.anchorOffsetX = 45;
		t.anchorOffsetY = 22.5;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "other_22_png";
		t.verticalCenter = 0.5;
		t.x = 355;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.anchorOffsetX = 0;
		t.size = 22;
		t.text = "Label";
		t.width = 245;
		t.x = 75;
		t.y = 2;
		return t;
	};
	_proto.timeText_i = function () {
		var t = new eui.Label();
		this.timeText = t;
		t.anchorOffsetX = 0;
		t.size = 22;
		t.text = "Label";
		t.width = 238;
		t.x = 75;
		t.y = 33;
		return t;
	};
	return GiftListItem;
})(eui.Skin);generateEUI.paths['resource/eui_skins/GiftPop.exml'] = window.GiftPop = (function (_super) {
	__extends(GiftPop, _super);
	function GiftPop() {
		_super.call(this);
		this.skinParts = ["openBtn"];
		
		this.height = 958;
		this.width = 540;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this.openBtn_i()];
	}
	var _proto = GiftPop.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "other_16_png";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image2_i(),this._Label1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "other_12_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "获得一份神秘礼物，请打开看看吧！";
		t.y = 604.68;
		return t;
	};
	_proto.openBtn_i = function () {
		var t = new eui.Image();
		this.openBtn = t;
		t.anchorOffsetX = 126;
		t.anchorOffsetY = 56;
		t.bottom = 75;
		t.horizontalCenter = 0;
		t.source = "other_2_png";
		return t;
	};
	return GiftPop;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/InputViewSkin.exml'] = window.InputViewSkin = (function (_super) {
	__extends(InputViewSkin, _super);
	function InputViewSkin() {
		_super.call(this);
		this.skinParts = ["backBtn","nameInput","phoneInput","mailInput","handleBtn"];
		
		this.height = 958;
		this.width = 540;
		this.elementsContent = [this._Image1_i(),this.backBtn_i(),this._Group1_i(),this.handleBtn_i()];
	}
	var _proto = InputViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "other_25_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.backBtn_i = function () {
		var t = new eui.Image();
		this.backBtn = t;
		t.anchorOffsetX = 34.85;
		t.anchorOffsetY = 33.33;
		t.source = "other_6_png";
		t.x = 72.1;
		t.y = 69.77;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = -74;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.nameInput_i(),this.phoneInput_i(),this.mailInput_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "other_23_png";
		t.x = 55;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.scale9Grid = new egret.Rectangle(77,33,462,50);
		t.source = "other_18_png";
		t.width = 406;
		t.x = 0;
		t.y = 89;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.scale9Grid = new egret.Rectangle(77,33,462,50);
		t.source = "other_18_png";
		t.width = 406;
		t.x = 0;
		t.y = 197;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.scale9Grid = new egret.Rectangle(77,33,462,50);
		t.source = "other_18_png";
		t.width = 406;
		t.x = 0;
		t.y = 308;
		return t;
	};
	_proto.nameInput_i = function () {
		var t = new eui.EditableText();
		this.nameInput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.prompt = "姓名";
		t.promptColor = 0xffffff;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 385;
		t.x = 11;
		t.y = 89.97;
		return t;
	};
	_proto.phoneInput_i = function () {
		var t = new eui.EditableText();
		this.phoneInput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.prompt = "电话";
		t.promptColor = 0xFFFFFF;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 385;
		t.x = 11;
		t.y = 197;
		return t;
	};
	_proto.mailInput_i = function () {
		var t = new eui.EditableText();
		this.mailInput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 80;
		t.prompt = "邮件";
		t.promptColor = 0xFFFFFF;
		t.text = "";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.width = 385;
		t.x = 11;
		t.y = 308;
		return t;
	};
	_proto.handleBtn_i = function () {
		var t = new eui.Image();
		this.handleBtn = t;
		t.anchorOffsetX = 130.3;
		t.anchorOffsetY = 60.61;
		t.horizontalCenter = 0;
		t.source = "other_27_png";
		t.verticalCenter = 235.5;
		return t;
	};
	return InputViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Loading.exml'] = window.loading = (function (_super) {
	__extends(loading, _super);
	function loading() {
		_super.call(this);
		this.skinParts = ["loadBar"];
		
		this.height = 958;
		this.width = 540;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = loading.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "loading_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 92;
		t.horizontalCenter = 0;
		t.elementsContent = [this._Image2_i(),this.loadBar_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "loading_2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.loadBar_i = function () {
		var t = new eui.Image();
		this.loadBar = t;
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(7,2,244,18);
		t.source = "loading_1_png";
		t.verticalCenter = 0;
		t.width = 493;
		t.x = 7;
		return t;
	};
	return loading;
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainScene.exml'] = window.MainScene = (function (_super) {
	__extends(MainScene, _super);
	function MainScene() {
		_super.call(this);
		this.skinParts = ["childBgGroup1","childBgGroup2","bgGroup","boat","playDiceBtn","ruleIcon","listCount","listGroup","diceGroup"];
		
		this.height = 958;
		this.width = 540;
		this.elementsContent = [this.bgGroup_i(),this.boat_i(),this.playDiceBtn_i(),this.ruleIcon_i(),this.listGroup_i(),this.diceGroup_i()];
	}
	var _proto = MainScene.prototype;

	_proto.bgGroup_i = function () {
		var t = new eui.Group();
		this.bgGroup = t;
		t.height = 958;
		t.left = 0;
		t.right = 0;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.childBgGroup1_i(),this.childBgGroup2_i()];
		return t;
	};
	_proto.childBgGroup1_i = function () {
		var t = new eui.Group();
		this.childBgGroup1 = t;
		t.height = 4353;
		t.left = 0;
		t.right = 0;
		t.y = 107;
		t.layout = this._BasicLayout1_i();
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.childBgGroup2_i = function () {
		var t = new eui.Group();
		this.childBgGroup2 = t;
		t.height = 4353;
		t.left = 0;
		t.right = 0;
		t.y = 392;
		return t;
	};
	_proto.boat_i = function () {
		var t = new eui.Image();
		this.boat = t;
		t.anchorOffsetX = 83.5;
		t.anchorOffsetY = 94;
		t.source = "other_4_png";
		t.x = 160;
		t.y = 685;
		return t;
	};
	_proto.playDiceBtn_i = function () {
		var t = new eui.Image();
		this.playDiceBtn = t;
		t.anchorOffsetX = 154.54;
		t.anchorOffsetY = 118.19;
		t.bottom = 4;
		t.horizontalCenter = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "other_28_png";
		return t;
	};
	_proto.ruleIcon_i = function () {
		var t = new eui.Image();
		this.ruleIcon = t;
		t.left = 12;
		t.source = "other_10_png";
		t.top = 9;
		return t;
	};
	_proto.listGroup_i = function () {
		var t = new eui.Group();
		this.listGroup = t;
		t.right = 12;
		t.top = 9;
		t.elementsContent = [this._Image1_i(),this.listCount_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "other_14_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.listCount_i = function () {
		var t = new eui.Label();
		this.listCount = t;
		t.size = 34;
		t.text = "X50";
		t.textColor = 0x336dea;
		t.verticalCenter = 0;
		t.x = 71.28;
		return t;
	};
	_proto.diceGroup_i = function () {
		var t = new eui.Group();
		this.diceGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.alpha = 0.75;
		t.horizontalCenter = 0;
		t.source = "other_17_jpg";
		t.verticalCenter = 0;
		return t;
	};
	return MainScene;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RulePop.exml'] = window.RulePop = (function (_super) {
	__extends(RulePop, _super);
	function RulePop() {
		_super.call(this);
		this.skinParts = ["textGroup","textScrol","closeBtn"];
		
		this.height = 958;
		this.width = 540;
		this.elementsContent = [this._Rect1_i(),this._Group1_i(),this.closeBtn_i()];
	}
	var _proto = RulePop.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillAlpha = 0.8;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 81.61;
		t.elementsContent = [this._Image1_i(),this.textScrol_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "other_11_png";
		t.y = 0;
		return t;
	};
	_proto.textScrol_i = function () {
		var t = new eui.Scroller();
		this.textScrol = t;
		t.height = 483;
		t.horizontalCenter = 0;
		t.width = 400;
		t.y = 133;
		t.viewport = this.textGroup_i();
		return t;
	};
	_proto.textGroup_i = function () {
		var t = new eui.Group();
		this.textGroup = t;
		t.cacheAsBitmap = true;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 20;
		t.horizontalAlign = "center";
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.anchorOffsetX = 31.82;
		t.anchorOffsetY = 33.33;
		t.bottom = 138;
		t.horizontalCenter = 0.5;
		t.source = "other_7_png";
		return t;
	};
	return RulePop;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.bottom = "0";
		t.left = "0";
		t.right = "0";
		t.size = 20;
		t.textColor = 0x000000;
		t.top = "0";
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.top = 0;
		t.touchEnabled = false;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TicketGift.exml'] = window.TicketGift = (function (_super) {
	__extends(TicketGift, _super);
	function TicketGift() {
		_super.call(this);
		this.skinParts = ["ticketImg","tickText","handleBtn"];
		
		this.height = 958;
		this.width = 540;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this.handleBtn_i()];
	}
	var _proto = TicketGift.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "other_16_png";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = -70;
		t.elementsContent = [this._Image2_i(),this.ticketImg_i(),this.tickText_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "other_19_png";
		t.y = 0;
		return t;
	};
	_proto.ticketImg_i = function () {
		var t = new eui.Image();
		this.ticketImg = t;
		t.height = 250;
		t.source = "other_51_png";
		t.width = 450;
		t.x = 0;
		t.y = 117.5;
		return t;
	};
	_proto.tickText_i = function () {
		var t = new eui.Label();
		this.tickText = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.text = "获得《江苏卫视2020跨年演唱会》门票1张";
		t.textAlign = "center";
		t.textColor = 0xa86363;
		t.width = 461.33;
		t.y = 422;
		return t;
	};
	_proto.handleBtn_i = function () {
		var t = new eui.Image();
		this.handleBtn = t;
		t.anchorOffsetX = 130;
		t.anchorOffsetY = 58;
		t.horizontalCenter = 0;
		t.source = "other_1_png";
		t.verticalCenter = 293.5;
		return t;
	};
	return TicketGift;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);