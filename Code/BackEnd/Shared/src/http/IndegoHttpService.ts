
import HttpServiceBase from './HttpServiceBase';

export default class IndegoHttpService extends HttpServiceBase{
    public async getIndegoStations(jsonSerialize:boolean = false): Promise<string> {
        const url = process.env.INDEGO_STATIONS_URL;
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