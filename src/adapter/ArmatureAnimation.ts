

namespace adapter {
    export interface ArmatureStateListener {
        event(eventObj: dragonBones.EgretEvent, eventName: string): void;
    }

    class AnimationInfo {
        trackIndex: number = 0;
        name: string = "";
        loop: boolean | number = false;

        constructor(trackIndex: number, name: string, loop: boolean | number) {
            this.trackIndex = trackIndex;
            this.name = name;
            this.loop = loop;
        }
    }

    export class ArmatureAnimation extends egret.DisplayObjectContainer {
        public static EVENT_START: string = dragonBones.EventObject.START;
        public static EVENT_COMPLETE: string = dragonBones.EventObject.COMPLETE;
        public static FADE_IN: string = dragonBones.EventObject.FADE_IN;
        public static FADE_IN_COMPLETE: string = dragonBones.EventObject.FADE_IN_COMPLETE;
        public static FADE_OUT: string = dragonBones.EventObject.FADE_OUT;
        public static FADE_OUT_COMPLETE: string = dragonBones.EventObject.FADE_OUT_COMPLETE;
        public static LOOP_COMPLETE: string = dragonBones.EventObject.LOOP_COMPLETE;
        public static FRAME_EVENT: string = dragonBones.EventObject.FRAME_EVENT;
        public static SOUNT_EVENT: string = dragonBones.EventObject.SOUND_EVENT;

        private mArmature: dragonBones.Armature = null;
        private mArmatureDisplay: dragonBones.EgretArmatureDisplay = null;
        private mFactory: dragonBones.EgretFactory = null;
        private mState: dragonBones.AnimationState = null;
        private mAutoDispose: boolean = true;

        private mSkinName: string = "default";
        private mHasSetAnimation: boolean = false;
        private mAniInfos: Array<AnimationInfo> = [];
        private mStatListener: adapter.ArmatureStateListener;

        private mTypeToResolveDict: StringDictionary<Array<Function>> = {};

        constructor() {
            super();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemove, this);
        }

        addAnimationStateListener(listener: adapter.ArmatureStateListener): void {
            this.mStatListener = listener;
            this._addDragonBoneEvent();
        }

        removeAnimationStateListener(listener: adapter.ArmatureStateListener): void {
            this.mStatListener = null;
            this._removeDragonBoneEvent();
        }

        private _onRemove(): void {
            if (this.mAutoDispose) {
                // this.dispose();
            }
            this._removeDragonBoneEvent();
        }

        private _addDragonBoneEvent() {
            let self = this;
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
        }

        private _removeDragonBoneEvent() {
            let self = this;
            if (self.egretArmatureDisplay) {
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.FRAME_EVENT, self._animationEventHandler, self);
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, self._animationEventHandler, self);
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.START, self._animationEventHandler, self);
                self.egretArmatureDisplay.removeEventListener(dragonBones.EventObject.LOOP_COMPLETE, self._animationEventHandler, self);
            }
        }

        private _animationEventHandler(event: dragonBones.EgretEvent) {
            if (event) {
                this._resolveAll(event.type, event);
            }
        }

        static init(): void {
            adapter.Scheduler.frameCall((interval: number): void => {
                dragonBones.WorldClock.clock.advanceTime(interval / 1000);
            }, this, -1);
        }

        async initWithName(skeletonName: string, autoDispose: boolean = true): Promise<any> {
            await this.initWithFile2(skeletonName + "_ske", skeletonName + "_tex", autoDispose);
        }

        async initWithFile3(skeletonJsonFile: string, atlasFile: string, trackIndex: number, animation: string, loop: boolean, skin: string = "default", autoDispose: boolean = true): Promise<any> {
            await this.initWithFile2(skeletonJsonFile, atlasFile, autoDispose);
            this.setSkin(skin);
            this.setAnimation(trackIndex, animation, loop);
        }

        async initWithFile2(skeletonJsonFile: string, atlasFile: string, autoDispose: boolean = true): Promise<any> {
            if(!adapter.AssetsMgr.getRes(skeletonJsonFile + "_json") || !adapter.AssetsMgr.getRes(atlasFile + "_json") || !adapter.AssetsMgr.getRes(atlasFile + "_png")) {
                let hasGroup = false;
                try {
                    hasGroup = !!adapter.AssetsMgr.getGroupByName(skeletonJsonFile + "_db");
                }
                catch(e){

                }
                if(!hasGroup){
                    adapter.AssetsMgr.createGroup(skeletonJsonFile + "_db", [skeletonJsonFile + "_json",atlasFile + "_json",atlasFile + "_png"]);
                }
                await adapter.AssetsMgr.loadGroup(skeletonJsonFile + "_db");

            }

            let skeletonData = adapter.AssetsMgr.getRes(skeletonJsonFile + "_json");
            let textureData = adapter.AssetsMgr.getRes(atlasFile + "_json");
            let texture = adapter.AssetsMgr.getRes(atlasFile + "_png");

            this.mFactory = new dragonBones.EgretFactory();
            this.mFactory.parseDragonBonesData(skeletonData);
            this.mFactory.parseTextureAtlasData(textureData, texture);

            this.mArmatureDisplay = this.mFactory.buildArmatureDisplay(skeletonJsonFile.substr(0, skeletonJsonFile.indexOf("_ske")));
            // dragonBones.WorldClock.clock.add(this.mArmature);
            this.mAutoDispose = autoDispose;
            this.mArmature = this.mArmatureDisplay.armature;
            this.addChild(this.mArmatureDisplay);

            for (let key of Object.keys(this.mTypeToResolveDict)) {
                this._listenEvent(key);
            }
            this._addDragonBoneEvent();
            this.setSkin(this.mSkinName);
            if (this.mAniInfos.length > 0) {
                this.setAnimation(this.mAniInfos[0].trackIndex, this.mAniInfos[0].name, this.mAniInfos[0].loop);
            }

        }

        public set armatureDisplay(any) {
            this.mArmatureDisplay = any;
        }

        public get armatureDisplay(): any {
            return this.mArmatureDisplay;
        }

        get isResLoaded(): boolean {
            return this.mArmature ? true : false;
        }

        //改变动画速度
        setTimeScale(timeScale): void {
            let self = this;
            if (self.mArmature && self.mArmature.animation) {
                self.mArmature.animation.timeScale = timeScale;
            }
        }

        getAnimationNames(): Array<string> {
            let arr = [];
            let animations = this.mAniInfos;
            for (let i = 0, n = animations.length; i < n; i++) {
                arr.push(animations[i].name);
            }
            return arr;
        }


        /**
         * @param playTimes number, 0 loop play, > 0 times.
         */
        setAnimation(trackIndex: number, name: string, loop: boolean | number): dragonBones.AnimationState {
            if (!this.mArmature) {
                this.mAniInfos = [];
                let aniInfo = new AnimationInfo(trackIndex, name, loop);
                this.mAniInfos.push(aniInfo);
                return null;
            }

            if (this.mHasSetAnimation) {
                this.pause();
                // this.clearTracks();
            }
            if (typeof (loop) == 'boolean') {
                this.mState = this.mArmature.animation.play(name, loop ? 0 : 1);
            } else if (typeof (loop) == 'number') {
                this.mState = this.mArmature.animation.play(name, loop);
            }
            this.mHasSetAnimation = true;
            return this.mState;
        }

        async addAnimation(trackIndex: number, lastName: string, name: string, loop: boolean, duration?: number) {
            await this.waitEvent(adapter.ArmatureAnimation.EVENT_COMPLETE);
            let self = this;
            let preName = self.mArmature && self.mArmature.animation ? self.mArmature.animation.lastAnimationName : null;
            if (preName == lastName) {
                duration && this.setMix(name, duration);
                this.setAnimation(trackIndex, name, loop);
            }
        }

        get lastAnimationName() {
            let curr = this.getCurrent();
            return curr ? curr.lastAnimationName : null;
        }

        setSkin(skinName: string): boolean {
            if (!skinName) {
                return false;
            }

            skinName = skinName.trim();
            if ("" === skinName) {
                skinName = "default";
            }

            this.mSkinName = skinName;

            if (this.mFactory && this.mArmature && this.mArmature.armatureData) {
                let skinData = this.mArmature.armatureData.getSkin(skinName);
                //暂时不管换肤，先用5.0.0版龙骨
                // this.mFactory.replaceSkin(this.mArmature, skinData, true);
            }

            return true;
        }
        disableBatch() {
            let self = this;
            if (self.mArmature && self.mArmature.display) {
                self.mArmature.display.disableBatch();
            }
        }

        findBone(name): dragonBones.Bone {
            let self = this;
            if (self.mArmature) {
                return self.mArmature.getBone(name);
            }
            return null;
        }

        findSlot(name): dragonBones.Slot {
            let self = this;
            if (self.mArmature) {
                return self.mArmature.getSlot(name);
            }
            return null;
        }

        setMix(toAnimation: string, duration: number, playTimes?: number): dragonBones.AnimationState {
            let self = this;
            if (self.mArmature && self.mArmature.animation) {
                return self.mArmature.animation.fadeIn(toAnimation, duration, playTimes);
            }
            null;
        }

        dispose() {
            if (this.mArmature) {
                this.mArmature.dispose();
                this.mArmature = null;
            }

            for (let key of Object.keys(this.mTypeToResolveDict)) {
                this._resolveAll(key);
            }

            this.mTypeToResolveDict = {};
        }

        waitEvent(eventType: dragonBones.EventStringType): Promise<any> {
            return new Promise<any>((resolve, reject): void => {
                if (!this.mTypeToResolveDict[eventType]) {
                    this.mTypeToResolveDict[eventType] = [];
                    this._listenEvent(eventType);
                }
                this.mTypeToResolveDict[eventType].push(resolve);
            });
        }

        get egretArmatureDisplay(): dragonBones.EgretArmatureDisplay {
            let self = this;
            if (self.mArmature) {
                return self.mArmature.display ? (self.mArmature.display as dragonBones.EgretArmatureDisplay) : null;
            }
            return null;
        }

        private _listenEvent(eventType: dragonBones.EventStringType): void {
            eventType = this._isEventStringType(eventType) ? eventType : ArmatureAnimation.FRAME_EVENT;
            if (!this.mArmature) {
                return;
            }
            if (eventType == ArmatureAnimation.FRAME_EVENT && this.egretArmatureDisplay.hasEventListener(ArmatureAnimation.FRAME_EVENT)) {
                return;
            }
            this.egretArmatureDisplay.addEventListener(eventType, (event): void => {
                this._resolveAll(eventType, event);
            }, this);
        }

        private _resolveAll(eventType: dragonBones.EventStringType, event?: dragonBones.EgretEvent): void {
            let self = this;
            let frameEventName = event && event.eventObject ? event.eventObject.name : null;//帧事件名称
            if (self.mStatListener && event) {
                let name = event.eventObject && event.eventObject.name ? event.eventObject.name : event.type;
                self.mStatListener.event(event, name);
            }
            if (frameEventName && frameEventName.trim() != "" && self.mTypeToResolveDict[frameEventName]) {
                self._resolveByEventType(frameEventName, event);
            }
            self._resolveByEventType(eventType, event);
        }

        private _resolveByEventType(eventType: dragonBones.EventStringType, event?: dragonBones.EgretEvent): void {
            if (this.mTypeToResolveDict[eventType]) {
                for (let i = 0, n = this.mTypeToResolveDict[eventType].length; i < n; i++) {
                    this.mTypeToResolveDict[eventType][i](event);
                }
                this.mTypeToResolveDict[eventType] = undefined;
            }
        }


        private _isEventStringType(eventType): boolean {
            let typeArr = [dragonBones.EventObject.START, dragonBones.EventObject.LOOP_COMPLETE, dragonBones.EventObject.COMPLETE, dragonBones.EventObject.FADE_IN, dragonBones.EventObject.FADE_IN_COMPLETE, dragonBones.EventObject.FADE_OUT, dragonBones.EventObject.FADE_OUT_COMPLETE, dragonBones.EventObject.FRAME_EVENT, dragonBones.EventObject.SOUND_EVENT];
            if (typeArr.indexOf(eventType) == -1) {
                return false;
            } else {
                return true;
            }
        }

        cacheFrameRate(rate: number = 24) {
            if (this.mArmature) {
                this.mArmature.cacheFrameRate = rate;
            }
        }

        getCurrent(): dragonBones.Animation {
            return this.mArmature ? this.mArmature.animation : null;
        }

        pause(): void {
            if (this.mState) {
                this.mState.stop();
            }
        }

        resume(): void {
            if (this.mState) {
                this.mState.play();
            }
        }

        reset() {
            if (this.mArmature && this.mArmature.animation) {
                this.mArmature.animation.reset();
            }
        }
    }
}