import HistoryRequest from '../../node_modules/indego.shared/dist/Models/HistoryRequest';
import { HistoryResponse, HistoriesResponse } from '../../node_modules/indego.shared/dist/Models/HistoryResponse';
import IndegoHistoryQueryDA from '../../node_modules/indego.shared/dist/DAL/History/IndegoHistoryQueryDA';
/**
 * Provides history-related functionality
 */

 export default class HistoryService {
     public async getStationsAtTimestamp(historyRequest: HistoryRequest): Promise<HistoriesResponse> {
        let response: HistoryResponse = new HistoryResponse();
        try{
            const historyDA: IndegoHistoryQueryDA = new IndegoHistoryQueryDA(process.env.INDEGO_DB);
            response = await historyDA.getStationsAtTimestamp(historyRequest);   
            return response;
        }catch(ex){
            response.IsSuccess = false;
            return response;
        }
     }

     public async getStationAtTimestamp(historyRequest: HistoryRequest): Promise<HistoryResponse> {
        let response: HistoryResponse = new HistoryResponse();
        try{
            const historyDA: IndegoHistoryQueryDA = new IndegoHistoryQueryDA(process.env.INDEGO_DB);
            response = await historyDA.getStationAtTimestamp(historyRequest);  
            let model = response.Model;
            let stations = model.stations;  
            if(model && stations) {
                const features = stations.features;
                response.Model.stations = features.filter((item) => item.properties.kioskId === historyRequest.Id);
            }
            return response;
        }catch(ex){
            response.IsSuccess = false;
            return response;
        }
     }
 }