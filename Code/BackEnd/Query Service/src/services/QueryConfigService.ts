import ConfigServiceBase from '../../node_modules/indego.shared/dist/services/ConfigService';

export default class QueryConfigService extends ConfigServiceBase {
    private static _instance: QueryConfigService;

    public constructor(){
        super();
    }

    public static create(): QueryConfigService{
        if(QueryConfigService._instance == null){
            QueryConfigService._instance = new QueryConfigService();
        }
        return QueryConfigService._instance;
    }

    

    public getCity(): string{
        return process.env.CITY;
    }

    public getInterval(): string{
        return process.env.QUERYSERVICE_INTERVAL;
    }

    
}


