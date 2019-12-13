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
    var AnimationInfo = (function () {
        function AnimationInfo(trackIndex, name, loop) {
            this.trackIndex = 0;
            this.name = "";
            this.loop = false;
            this.trackIndex = trackIndex;
            this.name = name;
            this.loop = loop;
        }
        return AnimationInfo;
    }());
    __reflect(AnimationInfo.prototype, "AnimationInfo");
    var ArmatureAnimation = (function (_super) {
        __extends(ArmatureAnimation, _super);
        function ArmatureAnimation() {
            var _this = _super.call(this) || this;
            _this.mArmature = null;
            _this.mArmatureDisplay = null;
            _this.mFactory = null;
            _this.mState = null;
            _this.mAutoDispose = true;
            _this.mSkinName = "default";
            _this.mHasSetAnimation = false;
            _this.mAniInfos = [];
            _this.mTypeToResolveDict = {};
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this._onRemove, _this);
            return _this;
        }
        ArmatureAnimation.prototype.addAnimationStateListener = function (listener) {
            this.mStatListener = listener;
            this._addDragonBoneEvent();
        };
        ArmatureAnimation.prototype.removeAnimationStateListener = function (listener) {
            this.mStatListener = null;
            this._removeDragonBoneEvent();
        };
        ArmatureAnimation.prototype._onRemove = function () {
            if (this.mAutoDispose) {
                // this.dispose();
            }
            this._removeDragonBoneEvent();
        };
        ArmatureAnimation.prototype._addDragonBoneEvent = function () {
            var self = this;
            if (self.egretArmatureDisplay) {
                if (!self.egretArmatureDisplay.hasEventListener(dragonBones.EventObject.FRAME_EVENT)) {
                    self.egretArmatureDisplay.addEventListener(dragonBones.EventObject.FRAME_EVENT, self._animationEventHandler, self);
                }
                if (!self.egretArmatureDisplay.hasEventListener(dragonBones.EventObject.COMPLETE)) {
                    self.egretArmatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, self._animationEventHandler, self);
                }
                if (!self.egretArmatureDisplay.hasEventListener(dragonBones.EventObject.START)) {
                    self.egretArmatureDisplay.addEventListener(dragonBones.EventObject.START, self._animationEventHandler, self);
                }
                if (!self.egretArmatureDisplay.hasEventListener(dragonBones.EventObject.LOOP_COMPLETE)) {
                    self.egretArmatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, self._animationEventHandler, self);
                }
            }
        };
        ArmatureAnimation.prototype._removeDragonBoneEvent = function () {
            var self = this;
            if (self.egretArmatureDisplay) {
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.FRAME_EVENT, self._animationEventHandler, self);
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, self._animationEventHandler, self);
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.START, self._animationEventHandler, self);
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.LOOP_COMPLETE, self._animationEventHandler, self);
            }
        };
        ArmatureAnimation.prototype._animationEventHandler = function (event) {
            if (event) {
                this._resolveAll(event.type, event);
            }
        };
        ArmatureAnimation.init = function () {
            adapter.Scheduler.frameCall(function (interval) {
                dragonBones.WorldClock.clock.advanceTime(interval / 1000);
            }, this, -1);
        };
        ArmatureAnimation.prototype.initWithName = function (skeletonName, autoDispose) {
            if (autoDispose === void 0) { autoDispose = true; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.initWithFile2(skeletonName + "_ske", skeletonName + "_tex", autoDispose)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ArmatureAnimation.prototype.initWithFile3 = function (skeletonJsonFile, atlasFile, trackIndex, animation, loop, skin, autoDispose) {
            if (skin === void 0) { skin = "default"; }
            if (autoDispose === void 0) { autoDispose = true; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.initWithFile2(skeletonJsonFile, atlasFile, autoDispose)];
                        case 1:
                            _a.sent();
                            this.setSkin(skin);
                            this.setAnimation(trackIndex, animation, loop);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ArmatureAnimation.prototype.initWithFile2 = function (skeletonJsonFile, atlasFile, autoDispose) {
            if (autoDispose === void 0) { autoDispose = true; }
            return __awaiter(this, void 0, void 0, function () {
                var hasGroup, skeletonData, textureData, texture, _i, _a, key;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(!adapter.AssetsMgr.getRes(skeletonJsonFile + "_json") || !adapter.AssetsMgr.getRes(atlasFile + "_json") || !adapter.AssetsMgr.getRes(atlasFile + "_png"))) return [3 /*break*/, 2];
                            hasGroup = false;
                            try {
                                hasGroup = !!adapter.AssetsMgr.getGroupByName(skeletonJsonFile + "_db");
                            }
                            catch (e) {
                            }
                            if (!hasGroup) {
                                adapter.AssetsMgr.createGroup(skeletonJsonFile + "_db", [skeletonJsonFile + "_json", atlasFile + "_json", atlasFile + "_png"]);
                            }
                            return [4 /*yield*/, adapter.AssetsMgr.loadGroup(skeletonJsonFile + "_db")];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            skeletonData = adapter.AssetsMgr.getRes(skeletonJsonFile + "_json");
                            textureData = adapter.AssetsMgr.getRes(atlasFile + "_json");
                            texture = adapter.AssetsMgr.getRes(atlasFile + "_png");
                            this.mFactory = new dragonBones.EgretFactory();
                            this.mFactory.parseDragonBonesData(skeletonData);
                            this.mFactory.parseTextureAtlasData(textureData, texture);
                            this.mArmatureDisplay = this.mFactory.buildArmatureDisplay(skeletonJsonFile.substr(0, skeletonJsonFile.indexOf("_ske")));
                            // dragonBones.WorldClock.clock.add(this.mArmature);
                            this.mAutoDispose = autoDispose;
                            this.mArmature = this.mArmatureDisplay.armature;
                            this.addChild(this.mArmatureDisplay);
                            for (_i = 0, _a = Object.keys(this.mTypeToResolveDict); _i < _a.length; _i++) {
                                key = _a[_i];
                                this._listenEvent(key);
                            }
                            this._addDragonBoneEvent();
                            this.setSkin(this.mSkinName);
                            if (this.mAniInfos.length > 0) {
                                this.setAnimation(this.mAniInfos[0].trackIndex, this.mAniInfos[0].name, this.mAniInfos[0].loop);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(ArmatureAnimation.prototype, "armatureDisplay", {
            get: function () {
                return this.mArmatureDisplay;
            },
            set: function (any) {
                this.mArmatureDisplay = any;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArmatureAnimation.prototype, "isResLoaded", {
            get: function () {
                return this.mArmature ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        //改变动画速度
        ArmatureAnimation.prototype.setTimeScale = function (timeScale) {
            var self = this;
            if (self.mArmature && self.mArmature.animation) {
                self.mArmature.animation.timeScale = timeScale;
            }
        };
        ArmatureAnimation.prototype.getAnimationNames = function () {
            var arr = [];
            var animations = this.mAniInfos;
            for (var i = 0, n = animations.length; i < n; i++) {
                arr.push(animations[i].name);
            }
            return arr;
        };
        /**
         * @param playTimes number, 0 loop play, > 0 times.
         */
        ArmatureAnimation.prototype.setAnimation = function (trackIndex, name, loop) {
            if (!this.mArmature) {
                this.mAniInfos = [];
                var aniInfo = new AnimationInfo(trackIndex, name, loop);
                this.mAniInfos.push(aniInfo);
                return null;
            }
            if (this.mHasSetAnimation) {
                this.pause();
                // this.clearTracks();
            }
            if (typeof (loop) == 'boolean') {
                this.mState = this.mArmature.animation.play(name, loop ? 0 : 1);
            }
            else if (typeof (loop) == 'number') {
                this.mState = this.mArmature.animation.play(name, loop);
            }
            this.mHasSetAnimation = true;
            return this.mState;
        };
        ArmatureAnimation.prototype.addAnimation = function (trackIndex, lastName, name, loop, duration) {
            return __awaiter(this, void 0, void 0, function () {
                var self, preName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.waitEvent(adapter.ArmatureAnimation.EVENT_COMPLETE)];
                        case 1:
                            _a.sent();
                            self = this;
                            preName = self.mArmature && self.mArmature.animation ? self.mArmature.animation.lastAnimationName : null;
                            if (preName == lastName) {
                                duration && this.setMix(name, duration);
                                this.setAnimation(trackIndex, name, loop);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(ArmatureAnimation.prototype, "lastAnimationName", {
            get: function () {
                var curr = this.getCurrent();
                return curr ? curr.lastAnimationName : null;
            },
            enumerable: true,
            configurable: true
        });
        ArmatureAnimation.prototype.setSkin = function (skinName) {
            if (!skinName) {
                return false;
            }
            skinName = skinName.trim();
            if ("" === skinName) {
                skinName = "default";
            }
            this.mSkinName = skinName;
            if (this.mFactory && this.mArmature && this.mArmature.armatureData) {
                var skinData = this.mArmature.armatureData.getSkin(skinName);
                //暂时不管换肤，先用5.0.0版龙骨
                // this.mFactory.replaceSkin(this.mArmature, skinData, true);
            }
            return true;
        };
        ArmatureAnimation.prototype.disableBatch = function () {
            var self = this;
            if (self.mArmature && self.mArmature.display) {
                self.mArmature.display.disableBatch();
            }
        };
        ArmatureAnimation.prototype.findBone = function (name) {
            var self = this;
            if (self.mArmature) {
                return self.mArmature.getBone(name);
            }
            return null;
        };
        ArmatureAnimation.prototype.findSlot = function (name) {
            var self = this;
            if (self.mArmature) {
                return self.mArmature.getSlot(name);
            }
            return null;
        };
        ArmatureAnimation.prototype.setMix = function (toAnimation, duration, playTimes) {
            var self = this;
            if (self.mArmature && self.mArmature.animation) {
                return self.mArmature.animation.fadeIn(toAnimation, duration, playTimes);
            }
            null;
        };
        ArmatureAnimation.prototype.dispose = function () {
            if (this.mArmature) {
                this.mArmature.dispose();
                this.mArmature = null;
            }
            for (var _i = 0, _a = Object.keys(this.mTypeToResolveDict); _i < _a.length; _i++) {
                var key = _a[_i];
                this._resolveAll(key);
            }
            this.mTypeToResolveDict = {};
        };
        ArmatureAnimation.prototype.waitEvent = function (eventType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!_this.mTypeToResolveDict[eventType]) {
                    _this.mTypeToResolveDict[eventType] = [];
                    _this._listenEvent(eventType);
                }
                _this.mTypeToResolveDict[eventType].push(resolve);
            });
        };
        Object.defineProperty(ArmatureAnimation.prototype, "egretArmatureDisplay", {
            get: function () {
                var self = this;
                if (self.mArmature) {
                    return self.mArmature.display ? self.mArmature.display : null;
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        ArmatureAnimation.prototype._listenEvent = function (eventType) {
            var _this = this;
            eventType = this._isEventStringType(eventType) ? eventType : ArmatureAnimation.FRAME_EVENT;
            if (!this.mArmature) {
                return;
            }
            if (eventType == ArmatureAnimation.FRAME_EVENT && this.egretArmatureDisplay.hasEventListener(ArmatureAnimation.FRAME_EVENT)) {
                return;
            }
            this.egretArmatureDisplay.addEventListener(eventType, function (event) {
                _this._resolveAll(eventType, event);
            }, this);
        };
        ArmatureAnimation.prototype._resolveAll = function (eventType, event) {
            var self = this;
            var frameEventName = event && event.eventObject ? event.eventObject.name : null; //帧事件名称
            if (self.mStatListener && event) {
                var name_1 = event.eventObject && event.eventObject.name ? event.eventObject.name : event.type;
                self.mStatListener.event(event, name_1);
            }
            if (frameEventName && frameEventName.trim() != "" && self.mTypeToResolveDict[frameEventName]) {
                self._resolveByEventType(frameEventName, event);
            }
            self._resolveByEventType(eventType, event);
        };
        ArmatureAnimation.prototype._resolveByEventType = function (eventType, event) {
            if (this.mTypeToResolveDict[eventType]) {
                for (var i = 0, n = this.mTypeToResolveDict[eventType].length; i < n; i++) {
                    this.mTypeToResolveDict[eventType][i](event);
                }
                this.mTypeToResolveDict[eventType] = undefined;
            }
        };
        ArmatureAnimation.prototype._isEventStringType = function (eventType) {
            var typeArr = [dragonBones.EventObject.START, dragonBones.EventObject.LOOP_COMPLETE, dragonBones.EventObject.COMPLETE, dragonBones.EventObject.FADE_IN, dragonBones.EventObject.FADE_IN_COMPLETE, dragonBones.EventObject.FADE_OUT, dragonBones.EventObject.FADE_OUT_COMPLETE, dragonBones.EventObject.FRAME_EVENT, dragonBones.EventObject.SOUND_EVENT];
            if (typeArr.indexOf(eventType) == -1) {
                return false;
            }
            else {
                return true;
            }
        };
        ArmatureAnimation.prototype.cacheFrameRate = function (rate) {
            if (rate === void 0) { rate = 24; }
            if (this.mArmature) {
                this.mArmature.cacheFrameRate = rate;
            }
        };
        ArmatureAnimation.prototype.getCurrent = function () {
            return this.mArmature ? this.mArmature.animation : null;
        };
        ArmatureAnimation.prototype.pause = function () {
            if (this.mState) {
                this.mState.stop();
            }
        };
        ArmatureAnimation.prototype.resume = function () {
            if (this.mState) {
                this.mState.play();
            }
        };
        ArmatureAnimation.prototype.reset = function () {
            if (this.mArmature && this.mArmature.animation) {
                this.mArmature.animation.reset();
            }
        };
        ArmatureAnimation.EVENT_START = dragonBones.EventObject.START;
        ArmatureAnimation.EVENT_COMPLETE = dragonBones.EventObject.COMPLETE;
        ArmatureAnimation.FADE_IN = dragonBones.EventObject.FADE_IN;
        ArmatureAnimation.FADE_IN_COMPLETE = dragonBones.EventObject.FADE_IN_COMPLETE;
        ArmatureAnimation.FADE_OUT = dragonBones.EventObject.FADE_OUT;
        ArmatureAnimation.FADE_OUT_COMPLETE = dragonBones.EventObject.FADE_OUT_COMPLETE;
        ArmatureAnimation.LOOP_COMPLETE = dragonBones.EventObject.LOOP_COMPLETE;
        ArmatureAnimation.FRAME_EVENT = dragonBones.EventObject.FRAME_EVENT;
        ArmatureAnimation.SOUNT_EVENT = dragonBones.EventObject.SOUND_EVENT;
        return ArmatureAnimation;
    }(egret.DisplayObjectContainer));
    adapter.ArmatureAnimation = ArmatureAnimation;
    __reflect(ArmatureAnimation.prototype, "adapter.ArmatureAnimation");
})(adapter || (adapter = {}));
//# sourceMappingURL=ArmatureAnimation.js.map