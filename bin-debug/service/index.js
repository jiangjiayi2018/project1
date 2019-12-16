var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
    var isLocal = location.hostname.indexOf('0.0.0.0') > -1 || location.hostname.indexOf('192') > -1 || location.hostname.indexOf('localhost') > -1;
    var BASE_URL = isLocal ? 'http://192.168.101.16:8888' : 'http://h5.heniw.com/newyear2019/';
    var ticketInfo = isLocal ? { ticket: encodeURIComponent('NbOy46uJDZpyMRoLSsPJ7JTS9j5XF6yFzJEl/K1Z9Bx10xFDqg') } : {};
    function get(api, data) {
        var params = ticketInfo;
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            for (var key in data) {
                params[key] = data[key];
            }
        }
        return cm.service.get(BASE_URL + api, params);
    }
    service.get = get;
    function post(api, data) {
        return cm.service.post(BASE_URL + api, data);
    }
    service.post = post;
    function pushEvent(act) {
        return cm.service.get(BASE_URL + '/event/do', __assign({ act: act, uid: localStorage.getItem('uid') }, ticketInfo));
    }
    service.pushEvent = pushEvent;
})(service || (service = {}));
//# sourceMappingURL=index.js.map