/**
 * DisplayUtil.ts
 * created by Jacob on 2017-07-06
 */

namespace adapter {

    export class DisplayUtil {
        private static mTimer = {};
        private static _playBtnAni(btn: egret.DisplayObject) {
            adapter.tween(btn).wait(530) //弹框效果的时间
                .to({ scaleX: 1.15, scaleY: 0.85 }, 3 * FRAME_TIME)
                .to({ scaleX: 0.9, scaleY: 1.1 }, 3 * FRAME_TIME)
                .to({ scaleX: 1.05, scaleY: 0.95 }, 3 * FRAME_TIME)
                .to({ scaleX: 0.98, scaleY: 1.02 }, 3 * FRAME_TIME)
                .to({ scaleX: 1, scaleY: 1 }, 3 * FRAME_TIME)
        }

        static addClickAniForBtn(btn: egret.DisplayObject, oringinScaleX = 1, oringinScaleY = 1) {
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                // adapter.SoundManager.playSoundAsync(sound.Public.BTN_DOWN);
                adapter.tween(btn).to({ scaleX: 0.9 * oringinScaleX, scaleY: 0.9 * oringinScaleY }, 2 * FRAME_TIME);
            }, this);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                adapter.tween(btn).to({ scaleX: 1.05 * oringinScaleX, scaleY: 1.05 * oringinScaleY }, 3 * FRAME_TIME)
                    .to({ scaleX: 1 * oringinScaleX, scaleY: 1 * oringinScaleY }, 4 * FRAME_TIME);
            }, this);
            btn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, () => {
                adapter.tween(btn).to({ scaleX: 1 * oringinScaleX, scaleY: 1 * oringinScaleY }, 2 * FRAME_TIME);
            }, this);
            btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, async () => {
                adapter.tween(btn).to({ scaleX: 1 * oringinScaleX, scaleY: 1 * oringinScaleY }, 2 * FRAME_TIME);
            }, this);
        }

        static playBtnshakeAni(btn: egret.DisplayObject) {
            DisplayUtil._playBtnAni(btn);
            DisplayUtil.mTimer[btn.hashCode] = adapter.Scheduler.loopCall(2000, () => {
                DisplayUtil._playBtnAni(btn);
            }, this, 0);
        }

        static stopBtnShakeAni(btn: egret.DisplayObject) {
            if (DisplayUtil.mTimer) {
                adapter.Scheduler.cancelTimeCall(DisplayUtil.mTimer[btn.hashCode]);
            }
        }

        static convertCoodinate(from: egret.DisplayObject, to: egret.DisplayObject, x: number, y: number) {
            let pos = from.localToGlobal(x, y);
            return to.globalToLocal(pos.x, pos.y);
        }

        /**
         * generateMovieClip
         * @param name movie clip name
         * @param aniName animation name, default set to movie clip name 
         */
        static generateMovieClip(name: string, aniName: string = name): egret.MovieClip {
            let movieData = adapter.AssetsMgr.getRes(name + "_json");
            let movieAtlas = adapter.AssetsMgr.getRes(name + "_png");
            let movieFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(movieData, movieAtlas);
            let mc = new egret.MovieClip(movieFactory.generateMovieClipData(aniName));
            mc.name = name;
            return mc;
        }

        // static generatePartical(res: string) {
        //     let texture = adapter.AssetsMgr.getRes(res + "_png");
        //     let config = adapter.AssetsMgr.getRes(res + "_json");
        //     let partical = new particle.GravityParticleSystem(texture, config);
        //     partical.start();
        //     return partical;
        // }

        static createModalBg(width: number, height: number): egret.DisplayObject {
            let bg = new egret.Shape();
            bg.graphics.beginFill(0x0);
            bg.graphics.drawRect(0, 0, width, height);
            bg.graphics.endFill();
            bg.alpha = 0.7;

            return bg;
        }

        /**
         * x uniform move, y accelerate move
         */
        static moveNode2DestUA(node: egret.DisplayObject, destX: number, destY: number, second: number,
            vy0: number, destRotate: number, destScale: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let startX = node.x;
                let startY = node.y;
                let passTime = 0;
                let speedX = (destX - startX) / second;
                // a = (s - v0 * t) * 2 / (t * t)
                let ay = ((destY - startY) - vy0 * second) * 2 / (second * second);

                let startRotate = node.rotation;
                let rotateSpeed = (destRotate - startRotate) / second;

                let startScale = node.scaleX;
                let scaleSpeed = (destScale - startScale) / second;
                let frameTimerId = adapter.Scheduler.frameCall((interval: number): void => {
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
                }, this, -1);
            });
        }

        /**
         * x accelerate move, y uniform move
         */
        static moveNode2DestAU(node: egret.DisplayObject, destX: number, destY: number, second: number,
            vx0: number, destRotate: number, destScale: number): Promise<any> {
            return new Promise<any>((resolve, reject) => {
                let startX = node.x;
                let startY = node.y;
                let passTime = 0;
                let speedY = (destY - startY) / second;
                // a = (s - v0 * t) * 2 / (t * t)
                let ax = ((destX - startX) - vx0 * second) * 2 / (second * second);

                let startRotate = node.rotation;
                let rotateSpeed = (destRotate - startRotate) / second;

                let startScale = node.scaleX;
                let scaleSpeed = (destScale - startScale) / second;
                let frameTimerId = adapter.Scheduler.frameCall((interval: number): void => {
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
                }, this, -1);
            });
        }

        /**
         * x uniform move, y uniform move
         */
        static moveNode2DestUU(node: egret.DisplayObject, destX: number, destY: number, second: number,
            destRotate: number, destScale: number): Promise<any> {

            return new Promise<any>((resolve, reject) => {
                let passTime = 0;

                let startX = node.x;
                let speedX = (destX - startX) / second;

                let startY = node.y;
                let speedY = (destY - startY) / second;

                let startRotate = node.rotation;
                let rotateSpeed = (destRotate - startRotate) / second;

                let startScale = node.scaleX;
                let scaleSpeed = (destScale - startScale) / second;

                // frame call
                let frameTimerId = adapter.Scheduler.frameCall((interval: number): void => {
                    passTime += interval / 1000;

                    if (passTime >= second) { // end
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
                }, this, -1); // frame call
            }); // new Promise<any>

        }
    }

}