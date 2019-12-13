var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var adapter;
(function (adapter) {
    var now = window.performance
        ? function () { return window.performance.now(); }
        : function () { return Date.now(); };
    var Tween = (function () {
        function Tween(target) {
            var _this = this;
            this.target = target;
            this.actions = [];
            this.index = 0;
            this.loopJump = -1;
            this.duration = 0;
            this.speedRate = 1;
            var promise = new Promise(function (f) { return _this.resolve = f; });
            this.then = promise.then.bind(promise);
            // 调试用，在Tween.onTick里打断点或在控制台输出Tween.tweens， 
            // 然后查看每个tween的stack属性，可以看到是在哪里创建的，
            // 可以定位没有停掉的无限循环的tween，由于条件编译仅debug版有效。
            if (true) {
                this.stack = Error().stack.split(/\n/g).slice(3);
                this.stack.unshift('Created');
            }
        }
        /**
         * 创建一个缓动
         * @param target 要缓动的目标对象
         */
        Tween.get = function (target, clear) {
            if (clear)
                Tween.removeTweens(target);
            return new Tween(target || {});
        };
        /**
         * 移除一个对象的所有缓动
         */
        Tween.removeTweens = function (target) {
            for (var i = 0; i < this.tweens.length; i++) {
                var tween_1 = this.tweens[i];
                if (tween_1.target == target) {
                    tween_1.stop();
                    this.tweens.splice(i--, 1);
                }
            }
        };
        Tween.prototype.setSpeedRate = function (v) {
            this.speedRate = v;
            if (v <= 0) {
                this.speedRate = 1;
            }
        };
        Tween.addTween = function (tween) {
            Tween.tweens.push(tween);
            if (Tween.frameCallId >= 0) {
                return;
            }
            Tween.frameCallId = adapter.Scheduler.frameCall(function (interval) {
                var tweens = Tween.tweens;
                // let time = now();
                // Tween.lastTime = time;
                for (var i = 0; i < tweens.length; i++) {
                    var dt = Math.min(interval, Tween.MaxFrameTime) * tweens[i].speedRate;
                    var tween_2 = tweens[i];
                    tween_2.resolve ? tween_2.update(dt) : tweens.splice(i--, 1);
                }
                if (0 == tweens.length) {
                    adapter.Scheduler.cancelFrameCall(Tween.frameCallId);
                    Tween.frameCallId = -1;
                }
                // if (tweens.length > 0) {
                //     requestAnimationFrame(Tween.onTick);
                // }
            }, this, -1);
        };
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
        Tween.prototype.stop = function () {
            this.resolve = null;
            this.actions.length = 0;
        };
        /**
         * 暂停缓动
         */
        Tween.prototype.pause = function () {
            this.paused = true;
        };
        /**
         * 恢复动画
         */
        Tween.prototype.resume = function () {
            if (this.paused)
                this.paused = false;
        };
        /**
         * 等待一定时间
         * @param duration 等待时间(毫秒)
         */
        Tween.prototype.wait = function (duration) {
            return this.addAction({ type: 3 /* Wait */, duration: duration });
        };
        /**
         * 设置缓动目标对象的属性
         * @param prop 属性值集合
         */
        Tween.prototype.set = function (prop) {
            return this.addAction({ type: 2 /* Set */, duration: 0, prop: prop });
        };
        /**
         * 缓动目标对象的属性值到绝对值
         * @param prop 属性值集合
         * @param duration 缓动时间
         * @param ease 缓动函数
         */
        Tween.prototype.to = function (prop, duration, ease) {
            if (duration === void 0) { duration = 0; }
            return this.addAction({ type: 0 /* To */, duration: duration, ease: ease, prop: prop });
        };
        /**
         * 缓动目标对象的属性值到相对值
         * @param prop 属性值集合
         * @param duration 缓动时间
         * @param ease 缓动函数
         */
        Tween.prototype.by = function (prop, duration, ease) {
            if (duration === void 0) { duration = 0; }
            return this.addAction({ type: 1 /* By */, duration: duration, ease: ease, prop: prop });
        };
        /**
         * 设置缓动循环次数
         * @param times 循环次数 (小于1表示无限)
         */
        Tween.prototype.loop = function (times) {
            if (times === void 0) { times = 0; }
            var jump = this.loopJump;
            if (this.actions.length - jump <= 1) {
                // there are no actions to loop.
                return this;
            }
            this.loopJump = this.actions.length;
            times = times > 0 ? times : Infinity;
            return this.addAction({ type: 4 /* Loop */, duration: 0, times: times, jump: jump });
        };
        /**
         * 设置缓动目标属性值改变时回调函数
         * @param callback 回调函数, 接收缓动的目标对象
         */
        Tween.prototype.onChange = function (callback) {
            this.callback = callback;
            return this;
        };
        Tween.prototype.addAction = function (action) {
            if (this.resolve) {
                this.actions.push(action);
                if (this.actions.length == 1) {
                    this.onActionStart();
                    Tween.addTween(this);
                }
                return this;
            }
            return new Tween(this.target).addAction(action);
        };
        Tween.prototype.onActionStart = function () {
            var action = this.actions[this.index];
            var type = action.type, start = action.start;
            if (type == 1 /* By */ || (type == 0 /* To */ && !start)) {
                var target = this.target;
                var inits = start || (action.start = {});
                for (var _i = 0, _a = Object.keys(action.prop); _i < _a.length; _i++) {
                    var k = _a[_i];
                    inits[k] = target[k];
                }
            }
        };
        Tween.prototype.onActionDone = function () {
            if (++this.index < this.actions.length) {
                return this.onActionStart();
            }
            this.resolve();
            this.resolve = null;
            this.actions.length = 0;
        };
        Tween.prototype.doAction = function (dt) {
            var action = this.actions[this.index];
            var duration = action.duration;
            var used = Math.min(dt, duration - this.duration);
            var progress = duration ? (this.duration += used) / duration : 1;
            switch (action.type) {
                // tween to absolute values.
                case 0 /* To */: {
                    var ease = action.ease, prop = action.prop, start = action.start;
                    var t = ease ? ease(progress) : progress;
                    for (var _i = 0, _a = Object.keys(prop); _i < _a.length; _i++) {
                        var k = _a[_i];
                        var s = start[k];
                        this.target[k] = s + (prop[k] - s) * t;
                    }
                    if (this.callback)
                        this.callback(this.target);
                    break;
                }
                // tween by relative values.
                case 1 /* By */: {
                    var ease = action.ease, prop = action.prop, start = action.start;
                    var t = ease ? ease(progress) : progress;
                    for (var _b = 0, _c = Object.keys(prop); _b < _c.length; _b++) {
                        var k = _c[_b];
                        this.target[k] = start[k] + prop[k] * t;
                    }
                    if (this.callback)
                        this.callback(this.target);
                    break;
                }
                // set to assigned values.
                case 2 /* Set */: {
                    var ease = action.ease, prop = action.prop;
                    for (var _d = 0, _e = Object.keys(prop); _d < _e.length; _d++) {
                        var k = _e[_d];
                        this.target[k] = prop[k];
                    }
                    if (this.callback)
                        this.callback(this.target);
                    break;
                }
                // jump to start of the loop section.
                case 4 /* Loop */: {
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
        };
        Tween.prototype.update = function (dt) {
            if (!this.paused) {
                while (dt > 0 && this.resolve) {
                    dt = this.doAction(dt);
                }
            }
        };
        Tween.MaxFrameTime = 3000;
        Tween.tweens = [];
        // private static lastTime: number;
        Tween.frameCallId = -1;
        return Tween;
    }());
    adapter.Tween = Tween;
    __reflect(Tween.prototype, "adapter.Tween", ["PromiseLike"]);
    /**
     * 创建一个缓动 (Tween.get的别名方法)
     * @param target 要缓动的目标对象
     */
    adapter.tween = Tween.get;
})(adapter || (adapter = {}));
//# sourceMappingURL=Tween.js.map