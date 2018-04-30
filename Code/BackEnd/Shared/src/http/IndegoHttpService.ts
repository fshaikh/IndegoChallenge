
import HttpServiceBase from './HttpServiceBase';

export default class IndegoHttpService extends HttpServiceBase{
    public async getIndegoStations(jsonSerialize:boolean = false): Promise<string> {
        const url = 'https://www.rideindego.com/stations/jso/';
        console.log(url);
        try{
            const json = await this.get(url);
            return jsonSerialize ? JSON.parse(json) : json;
        }catch(reason){
            console.log(`Failed to load data from Indego API`);
            return '';
        }
        
        
    }
}