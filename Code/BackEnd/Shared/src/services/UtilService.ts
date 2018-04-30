/**
 * Service which exposes utility functions
 */

 class UtilService {
     /**
     * Returns the uri for connecting to mongo
     */
    public getMongoUrl(): string{
        // If deployed to PCF, use the environment variable
        var vcap = process.env.VCAP_SERVICES
        if(vcap){
             let vcap_services = JSON.parse(vcap)
             return vcap_services.mlab[0].credentials.uri;
        }else{
            return process.env.MONGO_URL;
        }
    }
 }
 const utilService = new UtilService();
 export default utilService;