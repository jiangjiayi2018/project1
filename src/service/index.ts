module service {
    export enum ACT_TYPE {
        ENTER = 1,
        START = 2,
        LOTTERY = 3,
        ADD_COUNT = 4,
        SHARE = 5
    }

    const isLocal = location.hostname.indexOf('0.0.0.0') > -1 || location.hostname.indexOf('192') > -1 || location.hostname.indexOf('localhost') > -1;
    const BASE_URL = isLocal ? 'http://192.168.101.16:8888' : 'http://h5.heniw.com/newyear2019/';
    const ticketInfo = isLocal ? { ticket: encodeURIComponent('NbOy46uJDZpyMRoLSsPJ7JTS9j5XF6yFzJEl/K1Z9Bx10xFDqg') } : {};
    
    export function get(api: string, data?: any): Promise<any> {
        let params = ticketInfo;
        if (typeof data === 'object' && Object.keys(data).length > 0) {
            for (let key in data) {
                params[key] = data[key];
            }
        }
        return cm.service.get(BASE_URL + api, params);
    }

    export function post(api: string, data?: any): Promise<any> {
        return cm.service.post(BASE_URL + api, data);
    }

    export function pushEvent(act: ACT_TYPE): Promise<any> {
        return cm.service.get(BASE_URL + '/event/do', { act, uid: localStorage.getItem('uid'), ...ticketInfo });
    }
}