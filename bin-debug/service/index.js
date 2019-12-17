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
        var params = service.isLocal ? { ticket: encodeURIComponent('AZPkS5/Mbc7jqzLDtXxQf+wTPV/WVsThE+TCxlvYO9C8/RAaKQ') } : {};
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            for (var key in data) {
                params[key] = data[key];
            }
        }
        return cm.service.get(service.BASE_URL + api, params);
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
    // export function normalGet(api: string, data?: any): Promise<any> {
    //     let params = isLocal ? { ticket: encodeURIComponent('AZPkS5/Mbc7jqzLDtXxQf+wTPV/WVsThE+TCxlvYO9C8/RAaKQ') } : {};
    //     if (typeof data === 'object' && Object.keys(data).length > 0) {
    //         for (let key in data) {
    //             params[key] = data[key];
    //         }
    //     }
    //     return new Promise<any>((resolve, reject) => {
    //         let request = new egret.HttpRequest();
    //         let url = BASE_URL + api + "?" + adapter.Util.stringfyParamsByObj(params);
    //         console.log("请求接口：", url);
    //         /**设置返回的数据格式*/
    //         request.responseType = egret.HttpResponseType.TEXT;
    //         request.open(url, egret.HttpMethod.GET);
    //         /**设置请求头参数*/
    //         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //         /**请求成功监听*/
    //         request.addEventListener(egret.Event.COMPLETE, () => {
    //             resolve(request.response);
    //         }, null);
    //         /**请求失败监听*/
    //         request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
    //             reject(event);
    //         }, null);
    //         /**发送请求*/
    //         // if (egret.HttpMethod.POST === requestData.method) {
    //         //     request.send(requestData.data);
    //         // } else {
    //         request.send();
    //         // }
    //     });
    // }
})(service || (service = {}));
//# sourceMappingURL=index.js.map