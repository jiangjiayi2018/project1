namespace adapter {

    type Point = { x: number, y: number };

    export class Util {

        private constructor() {

        }

        static isArray(obj): boolean {
            return (typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Array]');
        }

        static isObject(obj): boolean {
            return (typeof obj === 'object' && Object.prototype.toString.call(obj) !== '[object Array]');
        }

        static isString(obj): boolean {
            return (typeof obj == 'string' || Object.prototype.toString.call(obj) == '[object String]');
        }

        static isFunction(fn): boolean {
            return Object.prototype.toString.call(fn) === '[object Function]';
        }

        static isRealNum(val): boolean {
            // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
            if (val === "" || val == null) {
                return false;
            }
            if (!isNaN(val)) {
                return true;
            } else {
                return false;
            }
        }

        public static getMovieClip(resJson: string, resPng: string, movName: string): egret.MovieClip {
            var data = adapter.AssetsMgr.getRes(resJson);
            var texture = adapter.AssetsMgr.getRes(resPng);
            var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);

            var reMov = new egret.MovieClip(mcFactory.generateMovieClipData(movName));

            return reMov;
        }

        /**
        * 金币数额每三位加上,
        */
        public static formatNumberWithSplit(num: number): string {
            var tmp = ~~num;
            if (!isNaN(tmp)) {
                var str = tmp + "";
                var len = str.length;
                var ret = "";
                if (len > 3) {
                    var splitNum = Math.ceil(len / 3) - 1;
                    var startIndex;
                    if (len % 3 == 0) {
                        startIndex = 3;
                    } else {
                        startIndex = len % 3;
                    }
                    ret = str.substring(0, startIndex);
                    for (var i = 0; i < splitNum; i++) {
                        ret += "," + str.substring(startIndex + 3 * i, startIndex + 3 * (i + 1));
                    }
                } else {
                    ret = str;
                }
                return ret;
            } else {
                return "";
            }
        }

        public static random(start: number, end: number): number {
            if (start == end) {
                return start;
            }

            let min = (start < end) ? start : end;
            let max = (start > end) ? start : end;
            return min + Math.floor(Math.random() * (max - min));
        }

        /**根据权重值随机出相应的序号*/
        public static getRandomWeightIndex(weights: number[]): number {
            if (weights.length === 0) {
                return -1;
            }

            if (weights.length === 1) {
                return 0;
            }
            let sum = Util.getArrSum(weights);
            if(!sum){
                return -1;
            }

            let randomValue = Util.random(1, sum + 1);
            let minVal = 0;
            let maxVal = 0;

            for(let i = 0; i < weights.length; i++){
                maxVal += weights[i];

                if(randomValue >= minVal && randomValue <= maxVal){
                    return i;
                }
                minVal = maxVal;
            }

            return -1;

        }

        /**获取一个数字数组的所有项之和*/
        public static getArrSum(nums: number[]): number{
            let sum = 0;
            for(let i = 0; i < nums.length; i++){
                let num = nums[i];
                if(!Util.isRealNum(num)){
                    return null;
                }
                sum += num;
            }
            return sum;
        }

        /**
         * 将秒转换为一个包含天时分秒的对象
         */
        public static secondsToDHMS(seconds: number) {
            seconds = Math.max(0, seconds);
            let sec = Math.floor(seconds % 60);
            let min = Math.floor(seconds / 60) % 60;
            let hour = Math.floor(seconds / 3600) % 24;
            let day = Math.floor(seconds / (3600 * 24));
            return { day, hour, min, sec };
        }


        /**
         * 将对象中的天时分秒格式化为字符串
         */
        public static formatTimeDHMS({ day, hour, min, sec }) {
            return {
                day: '' + day,
                hour: hour < 10 ? '0' + hour : '' + hour,
                min: min < 10 ? '0' + min : '' + min,
                sec: sec < 10 ? '0' + sec : '' + sec
            };
        }

        /**
         * 将时间戳转换为2014-02-01的格式
         * 时间为毫秒
         */
        public static formatDate(dateTime: number) {
            let date = new Date(dateTime);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return Y + M + D;
        }

        /**
         * 将时间戳转换为20140201的格式 没有横杠-
         * 时间为毫秒
         */
        public static formatDateNo_(dateTime: number) {
            let date = new Date(dateTime);
            let Y = date.getFullYear() + '';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
            let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return Number(Y + M + D);
        }

        //返回当前时间  时/分/秒
        public static getCurTime() {
            return new Date().toLocaleTimeString();
        }

        public static getRemainTimeArr(times: number): any {
            let arr = [];
            let day = Math.floor(times / (24 * 60 * 60));
            let h = Math.floor(times % (24 * 60 * 60) / (60 * 60));
            let m = Math.floor(times % (24 * 60 * 60) % (60 * 60) / 60);
            let s = Math.floor(times % (24 * 60 * 60) % (60 * 60) % 60);
            arr = [day, h, m, s];
            return arr;
        }

        /**
         * 将秒数值格式化为以":"分隔的时间字符串
         */
        public static formatTimeHMS(seconds: number) {
            seconds = Math.max(0, seconds);
            let sec = Math.floor(seconds % 60);
            let min = Math.floor(seconds / 60) % 60;
            let hour = Math.floor(seconds / 3600);

            return (hour < 10 ? '0' + hour : '' + hour) + ':' +
                (min < 10 ? '0' + min : '' + min) + ':' +
                (sec < 10 ? '0' + sec : '' + sec);
        }

        /**
         * 将秒数值格式化为以":"分隔的时间字符串
         */
        public static formatTimeHM(seconds: number) {
            seconds = Math.max(0, seconds);
            let min = Math.floor(seconds / 60) % 60;
            let hour = Math.floor(seconds / 3600);

            return (hour < 10 ? '0' + hour : '' + hour) + ':' +
                (min < 10 ? '0' + min : '' + min);
        }

        /**
         * 将秒数值格式化为以":"分隔的时间字符串
         */
        public static formatTimeMS(seconds: number) {
            seconds = Math.max(0, seconds);
            let sec = Math.floor(seconds % 60);
            let min = Math.floor(seconds / 60);

            return (min < 10 ? '0' + min : '' + min) + ':' +
                (sec < 10 ? '0' + sec : '' + sec);
        }

        /**
         * 给对象滤镜变灰
         */
        public static setGrey(res: egret.DisplayObject): void {
            if (!res) return;
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            res.filters = [colorFlilter];
        }


        /**
         * 去掉对象滤镜
         */
        public static canceGrey(res: egret.DisplayObject): void {
            if (!res) return;
            if (res.filters) {
                res.filters.length = 0;
            }
        }


        /**
         * 数据大的值做转化
         */
        static formatBigNumber(num: number, fixed: number = 0): string {
            let str = num + "";
            let len = str.length;
            let ret = "";
            let retUnit = "";
            if (len >= 13) {
                num = num / 1000000000000;
                retUnit = "T";
            } else if (len >= 10) {
                num = num / 1000000000;
                retUnit = "B";
            } else if (len >= 7) {
                num = num / 1000000;
                retUnit = "M";
            } else if (len >= 5) {
                num = num / 10000;
                retUnit = "W";
            } else if (len >= 4) {
                num = num / 1000;
                retUnit = "K";
            } else {
                return this.formatNumberWithSplit(num);
            }
            if (fixed >= 0) {
                ret = num.toFixed(fixed);
            } else {
                ret = Math.floor(num * 100) / 100 + "";
            }
            //去除小数后多余0
            return parseFloat(ret) + retUnit;
        }

        static formatBigNumberZh_cn(num: number, fixed: number = 0): string {
            let str = num + "";
            let len = str.length;
            let ret = "";
            let retUnit = "";
            if (len >= 13) {
                num = num / 1000000000000;
                retUnit = "T";
            } else if (len >= 10) {
                num = num / 1000000000;
                retUnit = "B";
            } else if (len >= 7) {
                num = num / 1000000;
                retUnit = "M";
            } else if (len >= 5) {
                num = num / 10000;
                retUnit = "万";
            } else if (len >= 4) {
                num = num / 1000;
                retUnit = "K";
            } else {
                return this.formatNumberWithSplit(num);
            }
            if (fixed >= 0) {
                ret = num.toFixed(fixed);
            } else {
                ret = Math.floor(num * 100) / 100 + "";
            }
            //去除小数后多余0
            return parseFloat(ret) + retUnit;
        }

        static removeFromParent(obj: egret.DisplayObject) {
            if (obj && obj.parent) {
                obj.parent.removeChild(obj);
            }
        }

        /**
         * 从网页地址截取参数键值
         */
        static getUrlParams(key: string): string {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
            var result = location && location.search && location.search.substr(1).match(reg);
            if (result && result.length >= 2) {
                return decodeURIComponent(result[2]);
            }
            return null;
        }

        /**
         * 从带&的这种参数序列中提取出参数键值对 object
         */
        static getObjFromParams(key: string) {
            if (!key || key === '') {
                return {};
            }
            let arr = key.split('&');
            let obj = {};
            for (let i = 0; i < arr.length; i++) {
                let keyArr = arr[i].split('=');
                obj[keyArr[0]] = keyArr[1];
            }
            return obj;
        }


        /**
         * 从数组中随机取出一个元素
         */
        static randomPick<T>(array: T[]): T {
            return array[~~(Math.random() * array.length)] || null;
        }

        /**
         * 取得贝塞尔曲线插值函数
         */
        static getBezier(p0, p1, p2) {
            return function (t: number) {
                let u = 1 - (t = Math.min(1, t));
                return {
                    x: u * u * p0.x + 2 * t * u * p1.x + t * t * p2.x,
                    y: u * u * p0.y + 2 * t * u * p1.y + t * t * p2.y
                };
            };
        }

        /**
         * 贝塞尔缓动
         */
        static bezierTo(target: egret.DisplayObject, time: number, bezier: Function, ease?: (t: number) => number) {
            return adapter.tween({ time: 0 }).to({ time }, time, ease).onChange(data => {
                let pos = bezier(data.time / time);
                target.x = pos.x;
                target.y = pos.y;
            });
        }

        // /**
        //  * 粒子拖尾贝塞尔缓动
        //  */
        // static particalBezierTo(target: particle.GravityParticleSystem, time: number, bezier: Function, ease?: (t: number) => number) {
        //     return adapter.tween({ time: 0 }).to({ time }, time, ease).onChange(data => {
        //         let pos = bezier(data.time / time);
        //         target.emitterX = pos.x;
        //         target.emitterY = pos.y;
        //     });
        // }

        static LoadJS(file) { //vconsole.min.js
            var head = document.getElementsByTagName('HEAD').item(0);
            var script: any = document.createElement('SCRIPT');
            script.src = file;
            script.type = "text/javascript";
            head.appendChild(script);
        }



        

        //获取当前年-月-日
        static getCurrFullDate(): string {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();
            return year + "-" + month + "-" + date;
        }

        

        /**
        * 深拷贝对象或者数组
        */
        public static deepCloneObj(obj: any): any {
            let newObj: any = {};
            if (obj instanceof Array) {
                newObj = [];
            }
            for (let key in obj) {
                let val = obj[key];
                newObj[key] = typeof val === 'object' ? Util.deepCloneObj(val) : val;
            }
            return newObj;
        }

        /**
        * 已知两个圆的圆心和半径，求相交的面积
        */
        public static intersectArea(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): number {
            let s: number, temp: number, p: number, l: number, ans: number;
            l = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if (l >= r1 + r2) {
                ans = 0;
            } else if (l <= Math.abs(r1 - r2)) {
                if (r1 <= r2) {
                    ans = Math.PI * r1 * r1;
                } else {
                    ans = Math.PI * r2 * r2;
                }
            } else {
                p = (l + r1 + r2) / 2;
                s = 2 * Math.sqrt(p * (p - l) * (p - r1) * (p - r2));
                if (r1 > r2) {
                    temp = x1; x1 = x2; x2 = temp;
                    temp = y1; y1 = y2; y2 = temp;
                    temp = r1; r1 = r2; r2 = temp;
                }
                ans = Math.acos((r1 * r1 + l * l - r2 * r2) / (2 * r1 * l)) * r1 * r1 + Math.acos((r2 * r2 + l * l - r1 * r1) / (2 * r2 * l)) * r2 * r2 - s;
            }
            return ans;
        }

        //判断是不是pc端
        public static IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

        public static copy(message): void {
            // if (VersionConfig.SOCIAL_SDK == 'wx') {
            //     wx.setClipboardData({
            //         data: message + '',
            //         success: function () {
            //             // GameManager.showTipsView(lang.COPY_SUCC);
            //         }
            //     });
            // } else {
            //     var input = document.createElement("input");
            //     input.value = message;
            //     document.body.appendChild(input);
            //     input.select();
            //     input.setSelectionRange(0, input.value.length),
            //         document.execCommand('Copy');
            //     document.body.removeChild(input);
            //     GameManager.showTipsView(lang.COPY_SUCC);
            // }
        }

        /** 获取字符串长度，多字节字符算2个长度 */
        public static getStringLength(target: string): number {
            let index: number = 0;
            let count: number = 0;
            while (index < target.length) {
                let code: number = target.charCodeAt(index);
                if (code > 0xFF) count += 2;
                else count++;

                index++;
            }
            return count;
        }
        /** 截取指定长度（多字节字符算2个长度）的字符串 */
        public static subString(target: string, limit: number): string {
            let index: number = 0;
            let count: number = 0;
            let result: string = "";
            while (index < target.length && count < limit) {
                let code: number = target.charCodeAt(index);
                if (code > 0xFF) count += 2;
                else count++;

                result += target.charAt(index);
                index++;
            }
            return result;
        }

    }
}