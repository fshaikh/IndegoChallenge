import DABase from './DABase';
import HistoryModel from '../Models/HistoryModel';
import InsertDocumentResponse from '../Models/InsertDocumentResponse';

export default class IndegoHistoryDA extends DABase {
    private HISTORY_COLLECTION: string = 'indg_history';

    constructor(database: string) {
        super(database);
    }

    async saveHistoryData(data: HistoryModel): Promise<InsertDocumentResponse> {
        return await this.doInsert(this.HISTORY_COLLECTION , data);
    }
}