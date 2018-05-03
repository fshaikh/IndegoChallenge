import QueryController from "./QueryController";
import CommandFactory from "./Commands/CommandFactory";
import { CommandEnum } from "./Commands/CommandEnum";


var queryController;
/**
 * Init function for system-wide initializations
 */
const init = async () => {
    queryController = new QueryController();
    return await queryController.init('../../.env');
}


/**
 * Start the querying operation
 */
const doWork = async () => {
    const command = CommandFactory.getCommand(CommandEnum.QueryServiceCommand);
    await queryController.start(command);
};


// Start the Query Service
(async function(){
    if(! await init()){
        console.log('Failed to start Query Service');
    }else{
        //setInterval(doWork, process.env.QUERYSERVICE_INTERVAL);
        doWork();
    }
})();



