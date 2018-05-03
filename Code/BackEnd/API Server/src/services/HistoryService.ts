import HistoryRequest from '../../node_modules/indego.shared/dist/Models/HistoryRequest';
import {HistoriesResponse} from '../../node_modules/indego.shared/dist/Models/HistoryResponse';
import IndegoHistoryDA from '../../node_modules/indego.shared/dist/DAL/IndegoHistoryDA';
/**
 * Provides history-related functionality
 */

 export default class HistoryService {
     public async getStationsAtTimestamp(historyRequest: HistoryRequest): Promise<HistoriesResponse> {
        let response: HistoriesResponse = new HistoriesResponse();
        try{
            const historyDA: IndegoHistoryDA = new IndegoHistoryDA(process.env.INDEGO_DB);
            response = await historyDA.getStationsAtTimestamp(historyRequest);    
            return response;
        }catch(ex){
            response.IsSuccess = false;
            return response;
        }
     }
 }