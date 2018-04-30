import { ICommand } from "./Commands/ICommand";
import { CommandRequest } from "./Commands/CommandRequest";

/**
 * Controller class which orchestrates the logic
 */

 export default class QueryController {
     constructor(){

     }

     public async start(command: ICommand){
         console.log('QueryController is starting the querying process');
         await command.execute();
         // return
     }
 }