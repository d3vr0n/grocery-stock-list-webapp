export interface StockItem {
    name: string;
    instockqty: number;
    weight: number;
    location: string;
    consumptionrate: number;
    consumptionduration: string;
    updateDate: firebase.firestore.Timestamp | Date;
    expiryDate: firebase.firestore.Timestamp | Date | null;
    docid: string;
    // uionly field
    stockscore: number;
}
