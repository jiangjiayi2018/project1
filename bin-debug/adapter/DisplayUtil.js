/**
 * DisplayUtil.ts
 * created by Jacob on 2017-07-06
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
    var DisplayUtil = (function () {
        function DisplayUtil() {
        }
        DisplayUtil._playBtnAni = function (btn) {
            adapter.tween(btn).wait(530) //弹框效果的时间
                .to({ scaleX: 1.15, scaleY: 0.85 }, 3 * FRAME_TIME)
                .to({ scaleX: 0.9, scaleY: 1.1 }, 3 * FRAME_TIME)
                .to({ scaleX: 1.05, scaleY: 0.95 }, 3 * FRAME_TIME)
                .to({ scaleX: 0.98, scaleY: 1.02 }, 3 * FRAME_TIME)
                .to({ scaleX: 1, scaleY: 1 }, 3 * FRAME_TIME);
        };
        DisplayUtil.addClickAniForBtn = function (btn, oringinScaleX, oringinScaleY) {
            var _this = this;
            if (oringinScaleX === void 0) { oringinScaleX = 1; }
            if (oringinScaleY === void 0) { oringinScaleY = 1; }
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                // adapter.SoundManager.playSoundAsync(sound.Public.BTN_DOWN);
                adapter.tween(btn).to({ scaleX: 0.9 * oringinScaleX, scaleY: 0.9 * oringinScaleY }, 2 * FRAME_TIME);
            }, this);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                adapter.tween(btn).to({ scaleX: 1.05 * oringinScaleX, scaleY: 1.05 * oringinScaleY }, 3 * FRAME_TIME)
                    .to({ scaleX: 1 * oringinScaleX, scaleY: 1 * oringinScaleY }, 4 * FRAME_TIME);
            }, this);
            btn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, function () {
                adapter.tween(btn).to({ scaleX: 1 * oringinScaleX, scaleY: 1 * oringinScaleY }, 2 * FRAME_TIME);
            }, this);
            btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    adapter.tween(btn).to({ scaleX: 1 * oringinScaleX, scaleY: 1 * oringinScaleY }, 2 * FRAME_TIME);
                    return [2 /*return*/];
                });
            }); }, this);
        };
        DisplayUtil.playBtnshakeAni = function (btn) {
            DisplayUtil._playBtnAni(btn);
            DisplayUtil.mTimer[btn.hashCode] = adapter.Scheduler.loopCall(2000, function () {
                DisplayUtil._playBtnAni(btn);
            }, this, 0);
        };
        DisplayUtil.stopBtnShakeAni = function (btn) {
            if (DisplayUtil.mTimer) {
                adapter.Scheduler.cancelTimeCall(DisplayUtil.mTimer[btn.hashCode]);
            }
        };
        DisplayUtil.convertCoodinate = function (from, to, x, y) {
            var pos = from.localToGlobal(x, y);
            return to.globalToLocal(pos.x, pos.y);
        };
        /**
         * generateMovieClip
         * @param name movie clip name
         * @param aniName animation name, default set to movie clip name
         */
        DisplayUtil.generateMovieClip = function (name, aniName) {
            if (aniName === void 0) { aniName = name; }
            var movieData = adapter.AssetsMgr.getRes(name + "_json");
            var movieAtlas = adapter.AssetsMgr.getRes(name + "_png");
            var movieFactory = new egret.MovieClipDataFactory(movieData, movieAtlas);
            var mc = new egret.MovieClip(movieFactory.generateMovieClipData(aniName));
            mc.name = name;
            return mc;
        };
        // static generatePartical(res: string) {
        //     let texture = adapter.AssetsMgr.getRes(res + "_png");
        //     let config = adapter.AssetsMgr.getRes(res + "_json");
        //     let partical = new particle.GravityParticleSystem(texture, config);
        //     partical.start();
        //     return partical;
        // }
        DisplayUtil.createModalBg = function (width, height) {
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x0);
            bg.graphics.drawRect(0, 0, width, height);
            bg.graphics.endFill();
            bg.alpha = 0.7;
            return bg;
        };
        /**
         * x uniform move, y accelerate move
         */
        DisplayUtil.moveNode2DestUA = function (node, destX, destY, second, vy0, destRotate, destScale) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var startX = node.x;
                var startY = node.y;
                var passTime = 0;
                var speedX = (destX - startX) / second;
                // a = (s - v0 * t) * 2 / (t * t)
                var ay = ((destY - startY) - vy0 * second) * 2 / (second * second);
                var startRotate = node.rotation;
                var rotateSpeed = (destRotate - startRotate) / second;
                var startScale = node.scaleX;
                var scaleSpeed = (destScale - startScale) / second;
                var frameTimerId = adapter.Scheduler.frameCall(function (interval) {
                    passTime += interval / 1000;
                    if (passTime >= second) {
                        node.x = destX;
                        node.y = destY;
                        node.rotation = destRotate;
                        node.scaleX = node.scaleY = destRotate;
                        adapter.Scheduler.cancelFrameCall(frameTimerId);
                        resolve();
                        return;
                    }
                    node.x = startX + speedX * passTime;
                    node.y = startY + (vy0 * passTime) + ay * passTime * passTime / 2;
                    node.rotation = startRotate + rotateSpeed * passTime;
                    node.scaleX = node.scaleY = startScale + scaleSpeed * passTime;
                }, _this, -1);
            });
        };
        /**
         * x accelerate move, y uniform move
         */
        DisplayUtil.moveNode2DestAU = function (node, destX, destY, second, vx0, destRotate, destScale) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var startX = node.x;
                var startY = node.y;
                var passTime = 0;
                var speedY = (destY - startY) / second;
                // a = (s - v0 * t) * 2 / (t * t)
                var ax = ((destX - startX) - vx0 * second) * 2 / (second * second);
                var startRotate = node.rotation;
                var rotateSpeed = (destRotate - startRotate) / second;
                var startScale = node.scaleX;
                var scaleSpeed = (destScale - startScale) / second;
                var frameTimerId = adapter.Scheduler.frameCall(function (interval) {
                    passTime += interval / 1000;
                    if (passTime >= second) {
                        node.x = destX;
                        node.y = destY;
                        node.rotation = destRotate;
                        node.scaleX = node.scaleY = destScale;
                        adapter.Scheduler.cancelFrameCall(frameTimerId);
                        resolve();
                        return;
                    }
                    node.x = startX + (vx0 * passTime) + ax * passTime * passTime / 2;
                    node.y = startY + speedY * passTime;
                    node.rotation = startRotate + rotateSpeed * passTime;
                    node.scaleX = node.scaleY = startScale + scaleSpeed * passTime;
                }, _this, -1);
            });
        };
        /**
         * x uniform move, y uniform move
         */
        DisplayUtil.moveNode2DestUU = function (node, destX, destY, second, destRotate, destScale) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var passTime = 0;
                var startX = node.x;
                var speedX = (destX - startX) / second;
                var startY = node.y;
                var speedY = (destY - startY) / second;
                var startRotate = node.rotation;
                var rotateSpeed = (destRotate - startRotate) / second;
                var startScale = node.scaleX;
                var scaleSpeed = (destScale - startScale) / second;
                // frame call
                var frameTimerId = adapter.Scheduler.frameCall(function (interval) {
                    passTime += interval / 1000;
                    if (passTime >= second) {
                        node.x = destX;
                        node.y = destY;
                        node.rotation = destRotate;
                        node.scaleX = node.scaleY = destScale;
                        adapter.Scheduler.cancelFrameCall(frameTimerId);
                        resolve();
                        return;
                    }
                    // update
                    node.x = startX + speedX * passTime;
                    node.y = startY + speedY * passTime;
                    node.rotation = startRotate + rotateSpeed * passTime;
                    node.scaleX = node.scaleY = startScale + scaleSpeed * passTime;
                }, _this, -1); // frame call
            }); // new Promise<any>
        };
        DisplayUtil.mTimer = {};
        return DisplayUtil;
    }());
    adapter.DisplayUtil = DisplayUtil;
    __reflect(DisplayUtil.prototype, "adapter.DisplayUtil");
})(adapter || (adapter = {}));
//# sourceMappingURL=DisplayUtil.js.map