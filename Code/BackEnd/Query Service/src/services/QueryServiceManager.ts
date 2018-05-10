import IndegoHttpService from '../../node_modules/indego.shared/dist/http/IndegoHttpService';
import OpenWeatherHttpService from '../../node_modules/indego.shared/dist/http/OpenWeatherHttpService';
import OpenWeatherRequest from '../../node_modules/indego.shared/dist/Models/OpenWeatherRequest';
import HistoryModel from '../../node_modules/indego.shared/dist/Models/HistoryModel';
import ResponseBase from '../../node_modules/indego.shared/dist/Models/ResponseBase';
import IndegoHistoryCommandDA from '../../node_modules/indego.shared/dist/DAL/History/IndegoHistoryCommandDA';
import QueryRequest from '../Models/QueryRequest';

export class QueryServiceManager {    
    public async handleQueryingOperation(request: QueryRequest) {
         try{
            // Invoke the Indego and Open Weather API calls simulatenously
            const indegoPromise = this.getIndegoStations();
            const openWeatherPromise = this.getWeatherFor(request.city);
            const responses = await Promise.all([indegoPromise,openWeatherPromise]);
            console.log(responses);

            // collate the data
            const historyModel: HistoryModel = this.getHistoryModel(responses[0], responses[1]);
            // save to db
            const response = await this.save(historyModel);
            console.log(response);
         } catch(reason) {
             console.log(`Failed to load data from Indego or OpenWeather`);
         }
         
    }

    private getIndegoStations(): Promise<string> {
        // go to indego service and get stations data
        return new IndegoHttpService().getIndegoStations();
    }

    private getWeatherFor(city: string): Promise<string> {
        //  // go to open weather service and get weather data
        const openWeatherService = new OpenWeatherHttpService();
        const openWeatherRequest: OpenWeatherRequest = new OpenWeatherRequest();
        openWeatherRequest.city = city;
        return openWeatherService.getCurrentWeather(openWeatherRequest);
    }

    private getHistoryModel(indegoData, openWeatherData): HistoryModel {
        let historyModel: HistoryModel = new HistoryModel();
        historyModel.at = new Date();
        historyModel.stations = this.getAPIData(indegoData);
        historyModel.weather = this.getAPIData(openWeatherData);

        return historyModel;
    }

    private getAPIData(data) {
        return data == null || data == '' ? {} : data;
    }

    private async save(historyModel: HistoryModel): Promise<ResponseBase>{
        let response: ResponseBase = new ResponseBase();
        try{
            const historyDA: IndegoHistoryCommandDA = IndegoHistoryCommandDA.create();
            const insertDocumentResponse = await historyDA.saveHistoryData(historyModel);    
            return insertDocumentResponse;
        }catch(ex){
            response.IsSuccess = false;
            return response;
        }
    }
    


}