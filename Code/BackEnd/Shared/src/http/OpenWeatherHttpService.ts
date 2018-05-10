
import OpenWeatherRequest from '../Models/OpenWeatherRequest';
import HttpServiceBase from './HttpServiceBase';
import ConfigServiceBase from '../services/ConfigService';

export default class OpenWeatherHttpService extends HttpServiceBase{
    public async getCurrentWeather(request: OpenWeatherRequest,jsonSerialize: boolean = false): Promise<string> {
        const url = `${ConfigServiceBase.create().getOpenWeatherUrl()}/weather?q=${request.city}&appid=${ConfigServiceBase.create().getOpenWeatherAPIKey()}`;
        console.log(url);
        try{
            const json = await this.get(url);
            return jsonSerialize ? JSON.parse(json) : json;
        }catch(reason){
            console.log(`Failed to load data from Open Weather API for : ${request.city}`);
            return '';
        }
    }

    
}