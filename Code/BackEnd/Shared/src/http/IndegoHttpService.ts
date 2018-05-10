
import HttpServiceBase from './HttpServiceBase';
import ConfigServiceBase from '../services/ConfigService';


/**
 * Service to communicate with Indego APIs
 */
export default class IndegoHttpService extends HttpServiceBase{
    /**
     * Calls Indego Stations API
     * @param jsonSerialize - True to return parsed JSON, false to return raw JSON
     */
    public async getIndegoStations(jsonSerialize: boolean = false): Promise<string> {
        // 12-factor app suggests reading configuration data from environment variables.
        const url = ConfigServiceBase.create().getIndigoStationsUrl();
        console.log(url);
        try{
            // Invoke the base class 'get' function
            const json = await this.get(url);
            return jsonSerialize ? JSON.parse(json) : json;
        }catch(reason){
            console.log(`Failed to load data from Indego API: ${reason}`);
            return '';
        }

        
        
        
    }

    public async dummy(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('resolveing');
                resolve(1);
            }, 1000);
        });
    }
}