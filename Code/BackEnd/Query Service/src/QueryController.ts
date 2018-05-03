import { ICommand } from '../node_modules/indego.shared/dist/app/ICommand';
import AppController from '../node_modules/indego.shared/dist/app/AppController';

/**
 * Controller class which orchestrates the logic
 */

 export default class QueryController extends AppController {
     constructor(){
        super();
     }

     public async start(command: ICommand){
         console.log('QueryController is starting the querying process');
         await super.start(command);
     }

 }