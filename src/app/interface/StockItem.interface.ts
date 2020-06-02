export interface StockItem {
    name : string;
    instockqty : number;
    weight : number;
    location : string;
    consumptionrate : number;
    updateDate : string | Date;
}