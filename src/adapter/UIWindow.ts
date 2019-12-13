namespace adapter {
    export class UIWindow {
        private static _instance: UIWindow = null;
        private constructor() { }

        public static getInstance(): UIWindow {
            if (!UIWindow._instance) {
                UIWindow._instance = new UIWindow();
            }
            return UIWindow._instance;
        }

        /**整个游戏的根容器*/
        private container: egret.DisplayObjectContainer;

        /**正常的内容层*/
        private contentLayer: egret.DisplayObjectContainer;
        private contentGroup: egret.DisplayObject[] = [];

        /**tip弹框层*/
        private tipsLayer: egret.DisplayObjectContainer;
        private tipsGroup: egret.DisplayObject[] = [];

        /**alert提示层*/
        private alertLayer: egret.DisplayObjectContainer;
        private alertGroup: egret.DisplayObject[] = [];



        public init(container: egret.DisplayObjectContainer, rect: egret.Rectangle): void {
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
        }

        public get width(): number {
            return this.contentLayer.width;
        }

        public get height(): number {
            return this.contentLayer.height;
        }

        /**
         * 将一个界面添加到舞台
         * @param view 要添加的对象
         * @param layerType 要添加的界面层级
        */
        public addView(view: egret.DisplayObject, layerType: LayerType = LayerType.CONTENT): void {
            view.height = this.height;
            view.width = this.width;
            view.anchorOffsetX = view.width * 0.5;
            view.anchorOffsetY = view.height * 0.5;
            view.x = this.width * 0.5;
            view.y = this.height * 0.5;
            this.addViewToLayer(view, layerType);
        }

        /**
         * 将一个界面从舞台上移除
         * @param view 要移除的对象
         * @param layerType 要移除的界面层级
        */
        public removeView(view: egret.DisplayObject, layerType: LayerType = LayerType.CONTENT): void {
            this.removeViewForLayer(view, layerType);
        }

        /**将界面加到指定层级*/
        private addViewToLayer(view: egret.DisplayObject, layerType: LayerType): void {
            switch (layerType) {
                case LayerType.CONTENT:
                    {
                        this.contentGroup.push(view);
                        this.contentLayer.addChild(view);
                        break;
                    }

                case LayerType.TIP:
                    {
                        this.tipsGroup.push(view);
                        this.tipsLayer.addChild(view);
                        break;
                    }

                case LayerType.ALERT:
                    {
                        this.alertGroup.push(view);
                        this.alertLayer.addChild(view);
                        break;
                    }
            }

        }

        /**将界面从指定层级移除*/
        private removeViewForLayer(view: egret.DisplayObject, layerType: LayerType): void {
            let group: egret.DisplayObject[] = null;
            let layer: egret.DisplayObjectContainer = null;
            switch (layerType) {
                case LayerType.CONTENT:
                    {
                        group = this.contentGroup;
                        layer = this.contentLayer;
                        break;
                    }

                case LayerType.TIP:
                    {
                        group = this.tipsGroup;
                        layer = this.tipsLayer;
                        break;
                    }

                case LayerType.ALERT:
                    {
                        group = this.alertGroup;
                        layer = this.alertLayer;
                        break;
                    }
            }
            let index = group.indexOf(view);
            if (index >= 0) {
                group.slice(index, 1);
            }
            let layerIndex = layer.getChildIndex(view);
            if (layerIndex >= 0) {
                layer.removeChildAt(layerIndex);
            }
        }





    }

    /**页面层级*/
    export const enum LayerType {
        CONTENT,
        TIP,
        ALERT
    }
}