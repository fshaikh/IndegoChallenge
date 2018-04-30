import QueryController from "./QueryController";
import { QueryServiceManagerCommand } from "./Commands/QueryServiceManagerCommand";
import { ICommand } from "./Commands/ICommand";
import { CommandRequest } from "./Commands/CommandRequest";
import * as DatabaseConnectionManager from '../node_modules/indego.shared/dist/DAL/DatabaseConnectionManager';
import CommandFactory from "./Commands/CommandFactory";
import { CommandEnum } from "./Commands/CommandEnum";

/**
 * Init function for system-wide initializations
 */
const init = async () => {
    const status = await DatabaseConnectionManager.connect('IndegoDb','mongodb://127.0.0.1');
    return status;
}


/**
 * Start the querying operation
 */
const doWork = async () => {
    const queryController: QueryController = new QueryController();
    const command = CommandFactory.getCommand(CommandEnum.QueryServiceCommand);
    await queryController.start(command);
};


// Start the Query Service
(async function(){
    if(! await init()){
        console.log('Failed to start Query Service');
    }else{
        // TODO: Read interval from environment
        //setInterval(doWork, 10000);
        doWork();
    }
})();



