class GameMainController {
    private static _instance: GameMainController = null;

    private constructor() { }

    public static getInstance(): GameMainController {
        if (!GameMainController._instance) {
            GameMainController._instance = new GameMainController();
        }
        return GameMainController._instance;
    }


    public gridDataArr: GridDataCell[] = [];

    /**初始化格子所需的数据*/
    public initGridData(): void{
        let gridObj = RES.getRes("grid_json");
        for (let gridId in gridObj) {
            if (gridObj.hasOwnProperty(gridId)) {
                this.gridDataArr[gridId] = new GridDataCell(gridObj[gridId]);
            }
        }
    }

    /**获取船只的行走路径*/
    public getPathArr(curGridId: number, gridNum): number[]{
        // let gridNum = adapter.Util.random(1, 7);
        let tempArr = [];
        for(let i = 0; i < gridNum; ++i){
            let gridId = curGridId -1;
            if(gridId < 0){
                gridId = this.gridDataArr.length -1;
            }
            tempArr.push(gridId);
            curGridId = gridId;
        }
        return tempArr;
    }
}