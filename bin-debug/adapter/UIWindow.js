var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var adapter;
(function (adapter) {
    var UIWindow = (function () {
        function UIWindow() {
            this.contentGroup = [];
            this.tipsGroup = [];
            this.alertGroup = [];
        }
        UIWindow.getInstance = function () {
            if (!UIWindow._instance) {
                UIWindow._instance = new UIWindow();
            }
            return UIWindow._instance;
        };
        UIWindow.prototype.init = function (container, rect) {
            this.container = container;
            this.contentLayer = new egret.DisplayObjectContainer();
            this.contentLayer.x = rect.x;
            this.contentLayer.y = rect.y;
            this.contentLayer.width = rect.width;
            this.contentLayer.height = rect.height;
            this.container.addChild(this.contentLayer);
            this.tipsLayer = new egret.DisplayObjectContainer();
            this.tipsLayer.x = rect.x;
            this.tipsLayer.y = rect.y;
            this.tipsLayer.width = rect.width;
            this.tipsLayer.height = rect.height;
            this.container.addChild(this.tipsLayer);
            this.alertLayer = new egret.DisplayObjectContainer();
            this.alertLayer.x = rect.x;
            this.alertLayer.y = rect.y;
            this.alertLayer.width = rect.width;
            this.alertLayer.height = rect.height;
            this.container.addChild(this.alertLayer);
        };
        Object.defineProperty(UIWindow.prototype, "width", {
            get: function () {
                return this.contentLayer.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIWindow.prototype, "height", {
            get: function () {
                return this.contentLayer.height;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 将一个界面添加到舞台
         * @param view 要添加的对象
         * @param layerType 要添加的界面层级
        */
        UIWindow.prototype.addView = function (view, layerType) {
            if (layerType === void 0) { layerType = 0 /* CONTENT */; }
            view.height = this.height;
            view.width = this.width;
            view.anchorOffsetX = view.width * 0.5;
            view.anchorOffsetY = view.height * 0.5;
            view.x = this.width * 0.5;
            view.y = this.height * 0.5;
            this.addViewToLayer(view, layerType);
        };
        /**
         * 将一个界面从舞台上移除
         * @param view 要移除的对象
         * @param layerType 要移除的界面层级
        */
        UIWindow.prototype.removeView = function (view, layerType) {
            if (layerType === void 0) { layerType = 0 /* CONTENT */; }
            this.removeViewForLayer(view, layerType);
        };
        /**将界面加到指定层级*/
        UIWindow.prototype.addViewToLayer = function (view, layerType) {
            switch (layerType) {
                case 0 /* CONTENT */:
                    {
                        this.contentGroup.push(view);
                        this.contentLayer.addChild(view);
                        break;
                    }
                case 1 /* TIP */:
                    {
                        this.tipsGroup.push(view);
                        this.tipsLayer.addChild(view);
                        break;
                    }
                case 2 /* ALERT */:
                    {
                        this.alertGroup.push(view);
                        this.alertLayer.addChild(view);
                        break;
                    }
            }
        };
        /**将界面从指定层级移除*/
        UIWindow.prototype.removeViewForLayer = function (view, layerType) {
            var group = null;
            var layer = null;
            switch (layerType) {
                case 0 /* CONTENT */:
                    {
                        group = this.contentGroup;
                        layer = this.contentLayer;
                        break;
                    }
                case 1 /* TIP */:
                    {
                        group = this.tipsGroup;
                        layer = this.tipsLayer;
                        break;
                    }
                case 2 /* ALERT */:
                    {
                        group = this.alertGroup;
                        layer = this.alertLayer;
                        break;
                    }
            }
            var index = group.indexOf(view);
            if (index >= 0) {
                group.slice(index, 1);
            }
            var layerIndex = layer.getChildIndex(view);
            if (layerIndex >= 0) {
                layer.removeChildAt(layerIndex);
            }
        };
        UIWindow._instance = null;
        return UIWindow;
    }());
    adapter.UIWindow = UIWindow;
    __reflect(UIWindow.prototype, "adapter.UIWindow");
})(adapter || (adapter = {}));
//# sourceMappingURL=UIWindow.js.map