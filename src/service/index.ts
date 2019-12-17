module service {
    export enum ACT_TYPE {
        ENTER = 1,
        START = 2,
        LOTTERY = 3,
        ADD_COUNT = 4,
        SHARE = 5
    }

    export const isLocal = location.hostname.indexOf('0.0.0.0') > -1 || location.hostname.indexOf('192') > -1 || location.hostname.indexOf('localhost') > -1;
    // const BASE_URL = isLocal ? 'http://192.168.8.165:5220' : 'http://h5.heniw.com/newyear2020/';
    export const LOCAL_URL = isLocal ? 'http://192.168.8.165:5220/index.html' : 'http://h5.heniw.com/activity/web/shaizi/index.html';
    export const BASE_URL = 'http://h5.heniw.com/newyear2020';
    const ticketInfo = isLocal ? { ticket: encodeURIComponent('AZPkS5/Mbc7jqzLDtXxQf+wTPV/WVsThE+TCxlvYO9C8/RAaKQ') } : {};

    // export function get(api: string, data?: any): Promise<any> {

    //     let params = ticketInfo;
    //     if (typeof data === 'object' && Object.keys(data).length > 0) {
    //         for (let key in data) {
    //             params[key] = data[key];
    //         }
    //     }
    //     return cm.service.get(BASE_URL + api, params);
    // }

    // export function post(api: string, data?: any): Promise<any> {
    //     return cm.service.post(BASE_URL + api, data);
    // }

    // export function pushEvent(act: ACT_TYPE): Promise<any> {
    //     return cm.service.get(BASE_URL + '/event/do', { act, uid: localStorage.getItem('uid'), ...ticketInfo });
    // }
    declare let crossRequest;

    export function get(api: string, data?: any): Promise<any> {
        let params = ticketInfo;
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            for (let key in data) {
                params[key] = data[key];
            }
        }
        return new Promise((resolve, reject) => {
            let url = BASE_URL + api + "?" + adapter.Util.stringfyParamsByObj(params);
            console.log("请求接口：", url);
            crossRequest({
                url: url,
                method: 'GET',
                success: (res, header) => {
                    console.log("请求结果：", res);
                    console.log("请求结果：", JSON.parse(res));
                    resolve(JSON.parse(res));
                }
            });
        });
    }

    




}