
import OpenWeatherRequest from '../Models/OpenWeatherRequest';
import HttpServiceBase from './HttpServiceBase';

export default class OpenWeatherHttpService extends HttpServiceBase{
    public async getCurrentWeather(request: OpenWeatherRequest,jsonSerialize: boolean = false): Promise<string> {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${request.city}&appid=89c623a5329be98040af22edf01a9702`;
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