/**
 * Scheduler.ts
 * created by Jacob on 2017-06-20
 */


namespace adapter {

/**
 * class FrameCaller
 */
class FrameCaller {
    func: (interval: number) => void;
    obj: any;
    loopCount: number;
    curLoop: number;

    constructor() {

    }
}


/**
 * class Scheduler
 */
export class Scheduler {
    private static LOG_TAG: string = "Scheduler";
    // private instance: Scheduler;
    private static timerId: number = 1;
    private static timerDict: NumberDictionary<egret.Timer> = {};

    private static frameCallerId: number = 1;
    private static frameCallerDict: NumberDictionary<FrameCaller> = {};
    private static displayObj: egret.DisplayObject = null;
    private static isListenToFrameEvent = false;
    private static lastFrameTime = 0;
    
    /**
     * @private
     * constructor
     */
    private constructor() {

    }

    // public static getInstance(): Scheduler {
    //     return;
    // }

    private static _timerCall(milliseconds: number, func: () => void, obj: any, loopCount: number): number {
        let timer = new egret.Timer(milliseconds, loopCount);
        let timerId = Scheduler.timerId++;
        Scheduler.timerDict[timerId] = timer;

        if (1 == loopCount) {
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e: egret.TimerEvent): void => {
                func.apply(obj);
                Scheduler.timerDict[timerId] = undefined;
            }, this);
        } else {
            timer.addEventListener(egret.TimerEvent.TIMER, func, obj);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (e: egret.TimerEvent): void => {
                Scheduler.timerDict[timerId] = undefined;
            }, this);
        }
        
        timer.start();
        
        return timerId;
    }

    /**
     * delayCall
     * @param milliseconds delay time in milliseconds
     * @param func delay invoked function
     * @param obj obj as 'this' in the function
     */
    public static delayCall(milliseconds: number, func: () => void, obj: any): number {
        if (!func) {
            Logger.warn(Scheduler.LOG_TAG, "Delay call with a function undefined or null!");
            return -1;
        }

        return Scheduler._timerCall(milliseconds, func, obj, 1);
    }

    /**
     * loopCall
     * @param milliseconds interval in second
     * @param func loop invoked function
     * @param obj obj as 'this' in the function
     * @param loopCount loop count
     */
    public static loopCall(milliseconds: number, func: () => void, obj: any, loopCount: number): number {
        if (!func) {
            Logger.warn(Scheduler.LOG_TAG, "Loop call with a function undefined or null!");
            return -1;
        }

        return Scheduler._timerCall(milliseconds, func, obj, loopCount);
    }
    
    /**
     * cancelTimeCall
     * @param timerId timer id return by delayCall or loopCall
     */
    public static cancelTimeCall(timerId: number): void {
        if (!Scheduler.timerDict[timerId]) {
            Logger.warn(Scheduler.LOG_TAG, "Cancel a time call which is not exist!");
            return;
        }

        Scheduler.timerDict[timerId].stop();
        Scheduler.timerDict[timerId] = undefined;
        delete Scheduler.timerDict[timerId];
    }

    /**
     * cancelAllTimeCall
     */
    public static cancelAllTimeCall(): void {
        for (let k in Scheduler.timerDict) {
            Scheduler.timerDict[k].stop();
        }

        Scheduler.timerDict = {};
    }
    
    private static mSlowCount = 0;
    private static mNormalCount = 0;
    private static mFrameRate = 0;
    private static _onEnterFrame(e: egret.Event): void {
        // if (Scheduler.mFrameRate < 5) {
        //     Scheduler.mFrameRate = config.FPS;
        // }

        let time = Date.now();
        let interval = time - Scheduler.lastFrameTime;
        // if (interval > 1000.0 / (Scheduler.mFrameRate - 10)) {
        //     // interval = 1000.0 / Scheduler.mFrameRate;

        //     Scheduler.mNormalCount = 0;
        //     if (Scheduler.mFrameRate > 15) {
        //         Scheduler.mSlowCount++;
        //         if (Scheduler.mSlowCount > 20) {
        //             Scheduler.mSlowCount = 0;
        //             Scheduler.mFrameRate -= 5;
        //             UIWindow.getInstance().stage.frameRate = Scheduler.mFrameRate;
        //         }
        //     }
        // } else {
        //     Scheduler.mSlowCount = 0;
        //     if (interval > 1000.0 / (Scheduler.mFrameRate - 3)) {
        //         Scheduler.mNormalCount++;
        //         if (Scheduler.mNormalCount > 10 && Scheduler.mFrameRate <= 30) {
        //             Scheduler.mNormalCount = 0;
        //             Scheduler.mFrameRate += 5;
        //             UIWindow.getInstance().stage.frameRate = Scheduler.mFrameRate;
        //         }
        //     }
        // }
        
        Scheduler.lastFrameTime = time;
        let removeDict = [];
        let callerCount = 0;
        for (let k in Scheduler.frameCallerDict) {
            callerCount++;
            let caller = Scheduler.frameCallerDict[k];
            if (caller.obj) {
                caller.func.apply(caller.obj, [interval]);
            } else {
                caller.func(interval);
            }

            if (caller.loopCount > 0) {
                caller.curLoop++;
            }

            if (caller.loopCount > 0 && caller.loopCount == caller.curLoop) {
                removeDict.push(k);
            }
        }

        if (callerCount == removeDict.length) {
            Scheduler.cancelAllFrameCall();
            return;
        }

        for (let i = 0, n = removeDict.length; i < n; i++) {
            let k = removeDict[i];
            Scheduler.frameCallerDict[k] = undefined;
            delete Scheduler.frameCallerDict[k];
        }
        
    }

    /**
     * frameCall
     * @param func delay invoked function
     * @param obj obj as 'this' in the function
     * @param loopCount loop count
     */
    public static frameCall(func: (interval: number) => void, obj: any, loopCount: number): number {
        if (!func) {
            Logger.warn(Scheduler.LOG_TAG, "Frame call with a function undefined or null!");
            return -1;
        }

        let frameCaller = new FrameCaller();
        frameCaller.func = func;
        frameCaller.obj = obj;
        frameCaller.loopCount = loopCount;
        frameCaller.curLoop = 0;

        let frameCallerId = Scheduler.frameCallerId++;
        Scheduler.frameCallerDict[frameCallerId] = frameCaller;

        if (!Scheduler.displayObj) {
            Scheduler.displayObj = new egret.DisplayObject();
        }

        if (!Scheduler.isListenToFrameEvent) {
            Scheduler.lastFrameTime = Date.now();
            Scheduler.displayObj.addEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
            Scheduler.isListenToFrameEvent = true;
        }

        return frameCallerId;
    }

    /**
     * waitForTime
     * @param milliseconds wait time
     */
    public static async waitForTime(milliseconds: number): Promise<number> {
        let passTime = 0;
        return new Promise<any>((resolve, reject) => {
            let timerId = Scheduler.frameCall((interval: number): void => {
                passTime += interval;
                if (passTime >= milliseconds) {
                    Scheduler.cancelFrameCall(timerId);
                    resolve(passTime);
                }
            }, this, -1);
        });
    }

    /**
     * cancelFrameCall
     * @param frameCallerId return by frameCall
     */
    public static cancelFrameCall(frameCallerId: number): void {
        if (!Scheduler.frameCallerDict[frameCallerId]) {
            Logger.warn(Scheduler.LOG_TAG, "Cancel a frame call which is not exist!");
            return;
        }

        Scheduler.frameCallerDict[frameCallerId] = undefined;
        delete Scheduler.frameCallerDict[frameCallerId];
    }

    /**
     * cancelAllFrameCall
     */
    public static cancelAllFrameCall(): void {
        if (Scheduler.displayObj) {
            Scheduler.displayObj.removeEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
            Scheduler.isListenToFrameEvent = false;
        }

        Scheduler.frameCallerDict = {};
    }
}

}