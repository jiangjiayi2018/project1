declare let wx;

const FRAME_TIME: number = 30;

/**测试接口域名*/
const test_root = "http://h5.heniw.com/newyear2019/";
/**正式接口域名*/
const normal_root = "http://h5.heniw.com/newyear2019/";

const enum EventId {
    /**获取礼品列表数据成功*/
    GET_GIFT_LIST_SUCCESS,
    /**点击领取奖品按钮之后关闭奖品列表界面*/
    GET_GIFT_CLOSE_VIEW,
}

/**数据上报类型*/
const enum DataReportType {
    /**打开游戏*/
    OPEN_VIEW = 1,
    /**分享*/
    SHARE,
    /**点击“丢筛子，赢门票*/
    CLICK_DICE,
    /**点击“拆开*/
    OPEN_GIFT
}