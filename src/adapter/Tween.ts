namespace adapter {

    const now = window.performance
        ? () => window.performance.now()
        : () => Date.now();

    const enum Type { To, By, Set, Wait, Loop }

    type Ease = (t: number) => number;
    type Prop<T> = {[P in keyof T]?: T[P]}
    type Actions = LoopAction | WaitAction | PropAction;

    interface Action {
        type: Type;
        duration: number;
    }

    interface PropAction extends Action {
        type: Type.To | Type.By | Type.Set;
        prop: {};
        start?: {};
        ease?: Ease;
    }

    interface WaitAction extends Action {
        type: Type.Wait;
    }

    interface LoopAction extends Action {
        type: Type.Loop;
        times: number;
        jump: number;
    }

    export class Tween<T> implements PromiseLike<void> {
        public static MaxFrameTime = 3000;
        private static tweens: Tween<{}>[] = [];
        // private static lastTime: number;
        private static frameCallId = -1;

        public readonly then: typeof Promise.prototype.then;
        private actions: Actions[] = [];
        private resolve: Function;
        private index = 0;
        private loopJump = -1;
        private duration = 0;
        private paused: boolean;
        private stack: string[];
        private speedRate: number = 1;
        private callback: (target: T) => void;

        private constructor(private target: T) {
            let promise = new Promise(f => this.resolve = f);
            this.then = promise.then.bind(promise);
            // 调试用，在Tween.onTick里打断点或在控制台输出Tween.tweens， 
            // 然后查看每个tween的stack属性，可以看到是在哪里创建的，
            // 可以定位没有停掉的无限循环的tween，由于条件编译仅debug版有效。
            if (DEBUG) {
                this.stack = Error().stack.split(/\n/g).slice(3);
                this.stack.unshift('Created');
            }
        }

        /**
         * 创建一个缓动
         * @param target 要缓动的目标对象
         */
        public static get<T>(target?: T, clear?: boolean): Tween<T> {
            if (clear) Tween.removeTweens(target);
            return new Tween(target || {} as any);
        }

        /**
         * 移除一个对象的所有缓动
         */
        public static removeTweens<T>(target: T): void {
            for (let i = 0; i < this.tweens.length; i++) {
                let tween = this.tweens[i];

                if (tween.target == target) {
                    tween.stop();
                    this.tweens.splice(i--, 1);
                }
            }
        }

        public setSpeedRate(v: number) {
            this.speedRate = v;
            if (v <= 0) {
                this.speedRate = 1;
            }
        }

        private static addTween(tween: Tween<{}>) {
            Tween.tweens.push(tween);
            if (Tween.frameCallId >= 0) {
                return;
            }

            Tween.frameCallId = adapter.Scheduler.frameCall((interval: number): void => {
                let tweens = Tween.tweens;
                // let time = now();
                // Tween.lastTime = time;
                
                for (let i = 0; i < tweens.length; i++) {
                    let dt = Math.min(interval, Tween.MaxFrameTime) * tweens[i].speedRate;
                    let tween = tweens[i];
                    tween.resolve ? tween.update(dt) : tweens.splice(i--, 1);
                }

                if (0 == tweens.length) {
                    adapter.Scheduler.cancelFrameCall(Tween.frameCallId);
                    Tween.frameCallId = -1;
                }
                // if (tweens.length > 0) {
                //     requestAnimationFrame(Tween.onTick);
                // }
            }, this, -1);
        }

        // private static onTick() {
        //     let tweens = Tween.tweens;
        //     let time = now();
        //     let dt = Math.min(time - Tween.lastTime, Tween.MaxFrameTime);
        //     Tween.lastTime = time;

        //     for (let i = 0; i < tweens.length; i++) {
        //         let tween = tweens[i];
        //         tween.resolve ? tween.update(dt) : tweens.splice(i--, 1);
        //     }
        //     if (tweens.length > 0) {
        //         requestAnimationFrame(Tween.onTick);
        //     }
        // }

        /**
         * 停止缓动
         */
        public stop() {
            this.resolve = null;
            this.actions.length = 0;
        }

        /**
         * 暂停缓动
         */
        public pause() {
            this.paused = true;
        }

        /**
         * 恢复动画
         */
        public resume() {
            if (this.paused) this.paused = false;
        }

        /**
         * 等待一定时间
         * @param duration 等待时间(毫秒)
         */
        public wait(duration: number) {
            return this.addAction({ type: Type.Wait, duration });
        }

        /**
         * 设置缓动目标对象的属性
         * @param prop 属性值集合
         */
        public set(prop: Prop<T>) {
            return this.addAction({ type: Type.Set, duration: 0, prop });
        }

        /**
         * 缓动目标对象的属性值到绝对值
         * @param prop 属性值集合
         * @param duration 缓动时间
         * @param ease 缓动函数
         */
        public to(prop: Prop<T>, duration = 0, ease?: Ease) {
            return this.addAction({ type: Type.To, duration, ease, prop });
        }

        /**
         * 缓动目标对象的属性值到相对值
         * @param prop 属性值集合
         * @param duration 缓动时间
         * @param ease 缓动函数
         */
        public by(prop: Prop<T>, duration = 0, ease?: Ease) {
            return this.addAction({ type: Type.By, duration, ease, prop });
        }

        /**
         * 设置缓动循环次数
         * @param times 循环次数 (小于1表示无限)
         */
        public loop(times: number = 0) {
            let jump = this.loopJump;

            if (this.actions.length - jump <= 1) {
                // there are no actions to loop.
                return this;
            }
            this.loopJump = this.actions.length;
            times = times > 0 ? times : Infinity;
            return this.addAction({ type: Type.Loop, duration: 0, times, jump });
        }

        /**
         * 设置缓动目标属性值改变时回调函数
         * @param callback 回调函数, 接收缓动的目标对象
         */
        public onChange(callback: (target: T) => void): PromiseLike<void> {
            this.callback = callback;
            return this;
        }

        private addAction(action: Actions): Tween<T> {
            if (this.resolve) {
                this.actions.push(action);
                if (this.actions.length == 1) {
                    this.onActionStart();
                    Tween.addTween(this);
                }
                return this;
            }
            return new Tween(this.target).addAction(action);
        }

        private onActionStart() {
            const action = this.actions[this.index] as PropAction;
            const { type, start } = action;

            if (type == Type.By || (type == Type.To && !start)) {
                const target = this.target;
                const inits = start || (action.start = {});

                for (let k of Object.keys(action.prop)) {
                    inits[k] = target[k];
                }
            }
        }

        private onActionDone() {
            if (++this.index < this.actions.length) {
                return this.onActionStart();
            }
            this.resolve();
            this.resolve = null;
            this.actions.length = 0;
        }

        private doAction(dt: number) {
            let action = this.actions[this.index];
            let duration = action.duration;
            let used = Math.min(dt, duration - this.duration);
            let progress = duration ? (this.duration += used) / duration : 1;

            switch (action.type) {
                // tween to absolute values.
                case Type.To: {
                    let { ease, prop, start } = action;
                    let t = ease ? ease(progress) : progress;

                    for (let k of Object.keys(prop)) {
                        let s = start[k];
                        this.target[k] = s + (prop[k] - s) * t;
                    }
                    if (this.callback) this.callback(this.target);
                    break;
                }
                // tween by relative values.
                case Type.By: {
                    let { ease, prop, start } = action;
                    let t = ease ? ease(progress) : progress;

                    for (let k of Object.keys(prop)) {
                        this.target[k] = start[k] + prop[k] * t;
                    }
                    if (this.callback) this.callback(this.target);
                    break;
                }
                // set to assigned values.
                case Type.Set: {
                    let { ease, prop } = action;

                    for (let k of Object.keys(prop)) {
                        this.target[k] = prop[k];
                    }
                    if (this.callback) this.callback(this.target);
                    break;
                }
                // jump to start of the loop section.
                case Type.Loop: {
                    if (--action.times > 0) {
                        this.index = action.jump;
                    }
                    break;
                }
            }
            if (this.duration >= duration) {
                this.duration = 0;
                this.onActionDone();
            }
            return dt - used;
        }

        private update(dt: number) {
            if (!this.paused) {
                while (dt > 0 && this.resolve) {
                    dt = this.doAction(dt);
                }
            }
        }
    }

    /**
     * 创建一个缓动 (Tween.get的别名方法)
     * @param target 要缓动的目标对象
     */
    export const tween = Tween.get;
}
