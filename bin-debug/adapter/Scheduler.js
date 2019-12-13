/**
 * Scheduler.ts
 * created by Jacob on 2017-06-20
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var adapter;
(function (adapter) {
    /**
     * class FrameCaller
     */
    var FrameCaller = (function () {
        function FrameCaller() {
        }
        return FrameCaller;
    }());
    __reflect(FrameCaller.prototype, "FrameCaller");
    /**
     * class Scheduler
     */
    var Scheduler = (function () {
        /**
         * @private
         * constructor
         */
        function Scheduler() {
        }
        // public static getInstance(): Scheduler {
        //     return;
        // }
        Scheduler._timerCall = function (milliseconds, func, obj, loopCount) {
            var timer = new egret.Timer(milliseconds, loopCount);
            var timerId = Scheduler.timerId++;
            Scheduler.timerDict[timerId] = timer;
            if (1 == loopCount) {
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
                    func.apply(obj);
                    Scheduler.timerDict[timerId] = undefined;
                }, this);
            }
            else {
                timer.addEventListener(egret.TimerEvent.TIMER, func, obj);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
                    Scheduler.timerDict[timerId] = undefined;
                }, this);
            }
            timer.start();
            return timerId;
        };
        /**
         * delayCall
         * @param milliseconds delay time in milliseconds
         * @param func delay invoked function
         * @param obj obj as 'this' in the function
         */
        Scheduler.delayCall = function (milliseconds, func, obj) {
            if (!func) {
                adapter.Logger.warn(Scheduler.LOG_TAG, "Delay call with a function undefined or null!");
                return -1;
            }
            return Scheduler._timerCall(milliseconds, func, obj, 1);
        };
        /**
         * loopCall
         * @param milliseconds interval in second
         * @param func loop invoked function
         * @param obj obj as 'this' in the function
         * @param loopCount loop count
         */
        Scheduler.loopCall = function (milliseconds, func, obj, loopCount) {
            if (!func) {
                adapter.Logger.warn(Scheduler.LOG_TAG, "Loop call with a function undefined or null!");
                return -1;
            }
            return Scheduler._timerCall(milliseconds, func, obj, loopCount);
        };
        /**
         * cancelTimeCall
         * @param timerId timer id return by delayCall or loopCall
         */
        Scheduler.cancelTimeCall = function (timerId) {
            if (!Scheduler.timerDict[timerId]) {
                adapter.Logger.warn(Scheduler.LOG_TAG, "Cancel a time call which is not exist!");
                return;
            }
            Scheduler.timerDict[timerId].stop();
            Scheduler.timerDict[timerId] = undefined;
            delete Scheduler.timerDict[timerId];
        };
        /**
         * cancelAllTimeCall
         */
        Scheduler.cancelAllTimeCall = function () {
            for (var k in Scheduler.timerDict) {
                Scheduler.timerDict[k].stop();
            }
            Scheduler.timerDict = {};
        };
        Scheduler._onEnterFrame = function (e) {
            // if (Scheduler.mFrameRate < 5) {
            //     Scheduler.mFrameRate = config.FPS;
            // }
            var time = Date.now();
            var interval = time - Scheduler.lastFrameTime;
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
            var removeDict = [];
            var callerCount = 0;
            for (var k in Scheduler.frameCallerDict) {
                callerCount++;
                var caller = Scheduler.frameCallerDict[k];
                if (caller.obj) {
                    caller.func.apply(caller.obj, [interval]);
                }
                else {
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
            for (var i = 0, n = removeDict.length; i < n; i++) {
                var k = removeDict[i];
                Scheduler.frameCallerDict[k] = undefined;
                delete Scheduler.frameCallerDict[k];
            }
        };
        /**
         * frameCall
         * @param func delay invoked function
         * @param obj obj as 'this' in the function
         * @param loopCount loop count
         */
        Scheduler.frameCall = function (func, obj, loopCount) {
            if (!func) {
                adapter.Logger.warn(Scheduler.LOG_TAG, "Frame call with a function undefined or null!");
                return -1;
            }
            var frameCaller = new FrameCaller();
            frameCaller.func = func;
            frameCaller.obj = obj;
            frameCaller.loopCount = loopCount;
            frameCaller.curLoop = 0;
            var frameCallerId = Scheduler.frameCallerId++;
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
        };
        /**
         * waitForTime
         * @param milliseconds wait time
         */
        Scheduler.waitForTime = function (milliseconds) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var passTime;
                return __generator(this, function (_a) {
                    passTime = 0;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var timerId = Scheduler.frameCall(function (interval) {
                                passTime += interval;
                                if (passTime >= milliseconds) {
                                    Scheduler.cancelFrameCall(timerId);
                                    resolve(passTime);
                                }
                            }, _this, -1);
                        })];
                });
            });
        };
        /**
         * cancelFrameCall
         * @param frameCallerId return by frameCall
         */
        Scheduler.cancelFrameCall = function (frameCallerId) {
            if (!Scheduler.frameCallerDict[frameCallerId]) {
                adapter.Logger.warn(Scheduler.LOG_TAG, "Cancel a frame call which is not exist!");
                return;
            }
            Scheduler.frameCallerDict[frameCallerId] = undefined;
            delete Scheduler.frameCallerDict[frameCallerId];
        };
        /**
         * cancelAllFrameCall
         */
        Scheduler.cancelAllFrameCall = function () {
            if (Scheduler.displayObj) {
                Scheduler.displayObj.removeEventListener(egret.Event.ENTER_FRAME, this._onEnterFrame, this);
                Scheduler.isListenToFrameEvent = false;
            }
            Scheduler.frameCallerDict = {};
        };
        Scheduler.LOG_TAG = "Scheduler";
        // private instance: Scheduler;
        Scheduler.timerId = 1;
        Scheduler.timerDict = {};
        Scheduler.frameCallerId = 1;
        Scheduler.frameCallerDict = {};
        Scheduler.displayObj = null;
        Scheduler.isListenToFrameEvent = false;
        Scheduler.lastFrameTime = 0;
        Scheduler.mSlowCount = 0;
        Scheduler.mNormalCount = 0;
        Scheduler.mFrameRate = 0;
        return Scheduler;
    }());
    adapter.Scheduler = Scheduler;
    __reflect(Scheduler.prototype, "adapter.Scheduler");
})(adapter || (adapter = {}));
//# sourceMappingURL=Scheduler.js.map