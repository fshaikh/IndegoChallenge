import ResponseBase from "./ResponseBase";
import HistoryModel from "./HistoryModel";

export class HistoryResponse extends ResponseBase {
    public Model: HistoryModel;
}

export class HistoriesResponse extends ResponseBase{
    public Models: Array<HistoryModel> = [];
}