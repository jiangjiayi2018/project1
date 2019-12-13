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
var adapter;
(function (adapter) {
    var NullSoundChannel = (function (_super) {
        __extends(NullSoundChannel, _super);
        function NullSoundChannel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NullSoundChannel.prototype.stop = function () { };
        return NullSoundChannel;
    }(egret.EventDispatcher));
    __reflect(NullSoundChannel.prototype, "NullSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"]);
    var SoundManager = (function () {
        function SoundManager() {
        }
        Object.defineProperty(SoundManager, "isMusicPlaying", {
            /**
             * 是否在播放背景音乐。
             */
            get: function () {
                return this.mMusicChannel != null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager, "soundEnabled", {
            /**
             * 是否启用音效
             */
            get: function () {
                return this.mSoundEnabled;
            },
            set: function (enable) {
                if (!enable) {
                    this.stopAllSound();
                }
                this.mSoundEnabled = enable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager, "musicEnabled", {
            /**
             * 是否启用音乐
             */
            get: function () {
                return this.mMusicEnabled;
            },
            set: function (enable) {
                this.mMusicEnabled = enable;
                if (enable) {
                    this.mMusicDuration = 0;
                    this.resumeMusic();
                }
                else {
                    this.pauseMusic();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager, "soundVolume", {
            /**
             * 音效音量(取值范围0-1)
             */
            get: function () {
                return this.mSoundVolume;
            },
            set: function (volume) {
                this.mSoundVolume = volume;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager, "musicVolume", {
            /**
             * 背景音乐音量(取值范围0-1)
             */
            get: function () {
                return this.mMusicVolume;
            },
            set: function (volume) {
                if (this.mMusicChannel) {
                    this.mMusicChannel.volume = volume;
                }
                this.mMusicVolume = volume;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 播放音效。
         * @param 音效资源名
         * @param 循环次数。默认1次。
         * @param 起始进度。默认为0。
         * @return egret.SoundChannel
         */
        SoundManager.playSound = function (resName, loop, position) {
            if (loop === void 0) { loop = 1; }
            if (position === void 0) { position = 0; }
            var channel;
            if (this.mSoundEnabled) {
                var sound = adapter.AssetsMgr.getRes(resName.replace(/\./g, '_'));
                if (channel = sound ? sound.play(position, loop) : null) {
                    this.mSoundChannels.push(channel);
                    channel.volume = this.mSoundVolume;
                    channel.once(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
                }
            }
            return channel || this.mNullSoundChannel;
        };
        /**
         * 播放音效(异步加载)。
         * @param 音效资源名
         * @param 循环次数。默认1次。
         * @param 起始进度。默认为0。
         * @return egret.SoundChannel
         */
        SoundManager.playSoundAsync = function (resName, loop, position) {
            var _this = this;
            if (loop === void 0) { loop = 1; }
            if (position === void 0) { position = 0; }
            if (this.mSoundEnabled) {
                resName = resName.replace(/\./g, '_');
                return adapter.AssetsMgr.getResAsync(resName).then(function () { return _this.playSound(resName, loop, position); });
            }
            return Promise.resolve(this.mNullSoundChannel);
        };
        /**
         * 音效播放结束事件回调
         */
        SoundManager.onSoundComplete = function (event) {
            var idx = this.mSoundChannels.indexOf(event.target);
            if (idx != -1) {
                this.mSoundChannels.splice(idx, 1);
            }
        };
        SoundManager.delSound = function (chanel) {
            var idx = this.mSoundChannels.indexOf(chanel);
            if (idx != -1) {
                this.mSoundChannels.splice(idx, 1);
            }
        };
        /**
         * 播放背景音乐。
         * @param 音乐资源名
         */
        SoundManager.playMusic = function (resName) {
            var channel;
            if (this.mMusicEnabled) {
                var music = adapter.AssetsMgr.getRes(resName.replace(/\./g, '_'));
                if (this.mMusicChannel) {
                    this.mMusicChannel.stop();
                }
                if (channel = music ? music.play() : null) {
                    channel.volume = this.mMusicVolume;
                    this.mMusicChannel = channel;
                    this.mMusicRes = music;
                }
            }
            return channel || this.mNullSoundChannel;
        };
        /**
         * 播放背景音乐。
         * @param 音乐资源名
         */
        SoundManager.playMusicAsync = function (resName) {
            var _this = this;
            if (this.mMusicEnabled) {
                resName = resName.replace(/\./g, '_');
                return adapter.AssetsMgr.getResAsync(resName).then(function () { return _this.playMusic(resName); });
            }
            return Promise.resolve(this.mNullSoundChannel);
        };
        /**
         * 停止播放背景音乐。
         */
        SoundManager.stopMusic = function () {
            if (this.mMusicChannel) {
                this.mMusicChannel.stop();
                this.mMusicChannel = null;
                this.mMusicRes = null;
            }
        };
        /**
         * 暂停播放背景音乐(保存进度)。
         */
        SoundManager.pauseMusic = function () {
            if (this.mMusicChannel) {
                this.mMusicDuration = this.mMusicChannel.position;
                this.mMusicChannel.stop();
                this.mMusicChannel = null;
            }
        };
        /**
         * 恢复播放背景音乐。
         */
        SoundManager.resumeMusic = function () {
            if (this.mMusicEnabled && this.mMusicRes && !this.mMusicChannel) {
                this.mMusicChannel = this.mMusicRes.play(this.mMusicDuration);
                this.mMusicChannel.volume = this.mMusicVolume;
            }
        };
        /**
         * 停止所有音效
         */
        SoundManager.stopAllSound = function () {
            for (var _i = 0, _a = this.mSoundChannels; _i < _a.length; _i++) {
                var sound = _a[_i];
                sound.stop();
            }
            this.mSoundChannels.length = 0;
        };
        SoundManager.mMusicEnabled = true; // 是否启用背景音乐
        SoundManager.mSoundEnabled = true; // 是否启用音效
        SoundManager.mMusicVolume = 1; // 背景音乐音量
        SoundManager.mSoundVolume = 1; // 音效音量
        SoundManager.mMusicDuration = 0; // 背景音乐进度，用于暂停
        SoundManager.mMusicRes = null; // 背景音乐资源
        SoundManager.mMusicChannel = null; // 在播的背景音乐
        SoundManager.mSoundChannels = []; // 在播的音效
        SoundManager.mNullSoundChannel = new NullSoundChannel(); // 用于容错处理
        return SoundManager;
    }());
    adapter.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "adapter.SoundManager");
})(adapter || (adapter = {}));
//# sourceMappingURL=SoundManager.js.map