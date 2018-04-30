import IndegoHttpService from './http/IndegoHttpService';
import OpenWeatherHttpService from './http/OpenWeatherHttpService';
import OpenWeatherRequest from './Models/OpenWeatherRequest';

import * as DatabaseConnectionManager from './DAL/DatabaseConnectionManager';
import IndegoHistoryDA from './DAL/IndegoHistoryDA';
import HistoryModel from './Models/HistoryModel';
import InsertDocumentResponse from './Models/InsertDocumentResponse';
import IdService from './services/IdService';

const service = new IndegoHttpService();
const weatherService = new OpenWeatherHttpService();
// (async function(){
//     try{
//        // const resp = await service.getIndegoStations();
//        const request = new OpenWeatherRequest();
//        request.city = "Philadelphia";
//        const resp = await weatherService.getCurrentWeather(request);
//        console.log(resp);
//     }catch(err){
//         console.log(err);
//     }
// })();
(async function(){
    const status = await DatabaseConnectionManager.connect('IndegoDb','mongodb://127.0.0.1');

    const indegoHistoryDA = new IndegoHistoryDA('IndegoDb');
            const historyModel = new HistoryModel();
            historyModel._id = new IdService().getUniqueId();
            historyModel.at = new Date();
            historyModel.stations = {};
            historyModel.weather = {};
            const response: InsertDocumentResponse =  await indegoHistoryDA.saveHistoryData(historyModel);
 })();