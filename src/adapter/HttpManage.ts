class HttpManage {
    public async sendHttpReq(requestData: HttpReqParma): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let request = new egret.HttpRequest();

            /**设置返回的数据格式*/
            request.responseType = egret.HttpResponseType.TEXT;

            /**请求地址处理*/
            let requestURL: string = normal_root + requestData.path;
            if (requestData.method === egret.URLRequestMethod.GET && (requestData.data as string).trim()) {
                requestURL += "?" + requestData.data;
            }

            request.open(requestURL, requestData.method);

            /**设置请求头参数*/
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            /**请求成功监听*/
            request.addEventListener(egret.Event.COMPLETE, () => {
                resolve(request.response);
            }, null);


            /**请求失败监听*/
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                reject(event);
            }, null);

            /**发送请求*/
            if (egret.HttpMethod.POST === requestData.method) {
                request.send(requestData.data);
            } else {
                request.send();
            }
        });
    }

}

interface HttpReqParma {
    method: string;
    path: string;
    data: any;
}
