import DABase from '../DABase';
import HistoryModel from '../../Models/HistoryModel';
import InsertDocumentResponse from '../../Models/InsertDocumentResponse';
import * as HistoryDACommon from './HistoryDACommon';

export default class IndegoHistoryCommandDA extends DABase {
    private 

    constructor(database: string) {
        super(database);
    }

    public async saveHistoryData(data: HistoryModel): Promise<InsertDocumentResponse> {
        return await this.doInsert(HistoryDACommon.HISTORY_COLLECTION , data);
    } 
}