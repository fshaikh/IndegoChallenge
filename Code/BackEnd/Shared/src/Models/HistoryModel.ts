import DataObjectBase from "./DataObjectBase";

export default class HistoryModel extends DataObjectBase {
    public at: Date;
    public stations: object;
    public weather: object;
}