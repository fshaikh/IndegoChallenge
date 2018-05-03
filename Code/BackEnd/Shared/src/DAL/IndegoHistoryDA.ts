import DABase from './DABase';
import HistoryModel from '../Models/HistoryModel';
import InsertDocumentResponse from '../Models/InsertDocumentResponse';
import HistoryRequest from '../Models/HistoryRequest';
import { HistoryResponse, HistoriesResponse } from '../Models/HistoryResponse';

export default class IndegoHistoryDA extends DABase {
    private HISTORY_COLLECTION: string = 'indg_history';

    constructor(database: string) {
        super(database);
    }

    public async saveHistoryData(data: HistoryModel): Promise<InsertDocumentResponse> {
        return await this.doInsert(this.HISTORY_COLLECTION , data);
    }

    public async getStationsAtTimestamp(request: HistoryRequest): Promise<HistoriesResponse> {
        let historyResponse: HistoriesResponse = new HistoriesResponse();
        const response = await this.doFind(this.HISTORY_COLLECTION, { _id: 0 }, this.getQueriedAtFilter(request.At));
        if(!response.isSuccess) {
            historyResponse.isSuccess = false;
            historyResponse.message = response.message;
            return historyResponse;
        }
        historyResponse.Models = response.Documents.map((item: any) => {
            const historyModel : HistoryModel = new HistoryModel();
            historyModel.at = item.at;
            historyModel.stations = item.stations;
            historyModel.weather = item.weather;
            return historyModel;
        });
        return historyResponse;
    }

    private getQueriedAtFilter(at: Date) {
        return { at: { $gte: at } }
    }
}