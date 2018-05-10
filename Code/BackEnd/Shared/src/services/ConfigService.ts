export default class ConfigServiceBase {
    private _mongoUrl: string = '';
    private static _instance: ConfigServiceBase;

    protected constructor(){
        
    }

    public static create(): ConfigServiceBase{
        if(ConfigServiceBase._instance == null){
            ConfigServiceBase._instance = new ConfigServiceBase();
        }
        return ConfigServiceBase._instance;
    }

    public getDatabase(): string{
        return process.env.INDEGO_DB;
    }

    public getIndigoStationsUrl(): string{
        return process.env.INDEGO_STATIONS_URL;
    }

    public getOpenWeatherUrl(): string{
        return process.env.OPENWEATHER_BASE_URL;
    }

    public getOpenWeatherAPIKey(): string{
        return process.env.OPENWEATHER_APPID;
    }

    public getCity(): string{
        return process.env.CITY;
    }

    public getMongoUrl(): string{
        if(process.env.NODE_ENV !== 'production'){
            return process.env.MONGO_URL;
        }
        // If deployed to PCF, use the environment variable
        var vcap = process.env.VCAP_SERVICES
        if(vcap){
             if(this._mongoUrl !== ''){
                 return this._mongoUrl;
             }
             let vcap_services = JSON.parse(vcap)
             return vcap_services.mlab[0].credentials.uri;
        }
        return process.env.MONGO_URL;
    }
}


