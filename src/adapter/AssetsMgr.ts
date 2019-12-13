namespace adapter {
    /**
     * 资源管理
     * @author wx771720[outlook.com]
     */
    export class AssetsMgr {
        public static loadConfig(url: string, resourceRoot: string): Promise<void> {
            return RES.loadConfig(url, resourceRoot);
        }
        public static loadGroup(name: string, priority?: number, reporter?: RES.PromiseTaskReporter): Promise<void> {
            return RES.loadGroup(name, priority, reporter).catch(error => { adapter.Logger.error("AssetsMgr", `loadGroup error : ${error.message}`); });
        }
        public static isGroupLoaded(name: string): boolean {
            return RES.isGroupLoaded(name);
        }
        public static getGroupByName(name: string): Array<RES.ResourceItem> {
            return RES.getGroupByName(name);
        }
        public static createGroup(name: string, keys: Array<string>, override?: boolean): boolean {
            return RES.createGroup(name, keys, override);
        }
        public static hasRes(key: string): boolean {
            return RES.hasRes(key);
        }
        public static getRes(key: string): any {
            return RES.getRes(key);
        }
        public static getResAsync(key: string): Promise<any> {
            return RES.getResAsync(key).catch(error => { adapter.Logger.error("AssetsMgr", `getResAsync error : ${error.message}`); });
        }
        public static getResByUrl(url: string, compFunc: Function, thisObject: any, type?: string): void {
            RES.getResByUrl(url, compFunc, thisObject, type);
        }
        public static destroyRes(name: string, force?: boolean): boolean {
            return RES.destroyRes(name, force);
        }
        public static addEventListener(type: string, listener: (event: egret.Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void {
            RES.addEventListener(type, listener, thisObject, useCapture, priority);
        }
        public static removeEventListener(type: string, listener: (event: egret.Event) => void, thisObject: any, useCapture?: boolean): void {
            RES.removeEventListener(type, listener, thisObject, useCapture);
        }
        public static getResourceInfo(path: string): RES.File | null {
            return RES.getResourceInfo(path);
        }
    }
}