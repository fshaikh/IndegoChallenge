import DABase from '../DABase';
import HistoryModel from '../../Models/HistoryModel';
import InsertDocumentResponse from '../../Models/InsertDocumentResponse';
import * as HistoryDACommon from './HistoryDACommon';
import ConfigServiceBase from '../../services/ConfigService';

export default class IndegoHistoryCommandDA extends DABase {

    constructor(database: string) {
        super(database);
    }

    public static create(): IndegoHistoryCommandDA{
        return new IndegoHistoryCommandDA(ConfigServiceBase.create().getDatabase());
    }

    public async saveHistoryData(data: HistoryModel): Promise<InsertDocumentResponse> {
        return await this.doInsert(HistoryDACommon.HISTORY_COLLECTION , data);
    } 
}