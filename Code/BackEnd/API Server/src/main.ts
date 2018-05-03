import http from 'http';
import APIServerController from "./APIServerController";
import GlobalHandler from './GlobalHandler';

var apiServerController: APIServerController;
var globalHandler: GlobalHandler;
/**
 * Init function for system-wide initializations
 */
const init = async () => {
    apiServerController = new APIServerController();
    return await apiServerController.init('../../.env');
};

const startAPIServer = async () => {
    console.log(`Node Processs : ${process.pid} launched`);
    // Create server
    var server: http.Server = http.createServer(apiServerController.getApp());
    // Register global events/exceptions
    globalHandler = new GlobalHandler(server);
    
    // start listening
    server.listen(process.env.PORT,function(){
        console.log(`API Server listening on : ${process.env.PORT}`);
    });
};

(async function(){
    if(!await init()){
        console.log('Failed to start API Server');
        return;
    }
    startAPIServer();
})();







