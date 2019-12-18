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
var service;
(function (service) {
    var ACT_TYPE;
    (function (ACT_TYPE) {
        ACT_TYPE[ACT_TYPE["ENTER"] = 1] = "ENTER";
        ACT_TYPE[ACT_TYPE["START"] = 2] = "START";
        ACT_TYPE[ACT_TYPE["LOTTERY"] = 3] = "LOTTERY";
        ACT_TYPE[ACT_TYPE["ADD_COUNT"] = 4] = "ADD_COUNT";
        ACT_TYPE[ACT_TYPE["SHARE"] = 5] = "SHARE";
    })(ACT_TYPE = service.ACT_TYPE || (service.ACT_TYPE = {}));
    service.isLocal = location.hostname.indexOf('0.0.0.0') > -1 || location.hostname.indexOf('192') > -1 || location.hostname.indexOf('localhost') > -1;
    // const BASE_URL = isLocal ? 'http://192.168.8.165:5220' : 'http://h5.heniw.com/newyear2020/';
    service.LOCAL_URL = service.isLocal ? 'http://192.168.8.165:5220/index.html' : 'http://h5.heniw.com/activity/web/shaizi/index.html';
    service.BASE_URL = 'http://h5.heniw.com/newyear2020';
    var ticketInfo = service.isLocal ? { ticket: encodeURIComponent('AZPkS5/Mbc7jqzLDtXxQf+wTPV/WVsThE+TCxlvYO9C8/RAaKQ') } : {};
    function normalGet(api, data) {
        return __awaiter(this, void 0, void 0, function () {
            var params, key, url, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = service.isLocal ? { ticket: encodeURIComponent('AZPkS5/Mbc7jqzLDtXxQf+wTPV/WVsThE+TCxlvYO9C8/RAaKQ') } : {};
                        if (typeof data === 'object' && Object.keys(data).length > 0) {
                            for (key in data) {
                                params[key] = data[key];
                            }
                        }
                        url = service.BASE_URL + api;
                        console.log("请求接口：", url);
                        return [4 /*yield*/, cm.service.get(url, params)];
                    case 1:
                        res = _a.sent();
                        console.log("请求结果：", res);
                        return [2 /*return*/, res];
                }
            });
        });
    }
    service.normalGet = normalGet;
    function get(api, data) {
        if (service.isLocal) {
            return localGet(api, data);
        }
        else {
            return normalGet(api, data);
        }
    }
    service.get = get;
    function localGet(api, data) {
        var params = service.isLocal ? { ticket: encodeURIComponent('AZPkS5/Mbc7jqzLDtXxQf+wTPV/WVsThE+TCxlvYO9C8/RAaKQ') } : {};
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            for (var key in data) {
                params[key] = data[key];
            }
        }
        return new Promise(function (resolve, reject) {
            var url = service.BASE_URL + api + "?" + adapter.Util.stringfyParamsByObj(params);
            console.log("请求接口：", url);
            crossRequest({
                url: url,
                method: 'GET',
                success: function (res, header) {
                    console.log("请求结果：", res);
                    console.log("请求结果：", JSON.parse(res));
                    resolve(JSON.parse(res));
                }
            });
        });
    }
    service.localGet = localGet;
})(service || (service = {}));
//# sourceMappingURL=index.js.map