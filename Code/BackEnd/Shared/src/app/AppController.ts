import { ICommand } from "./ICommand";
import * as DatabaseConnectionManager from '../DAL/DatabaseConnectionManager';
import dotenv from 'dotenv';
import ConfigServiceBase from '../services/ConfigService';

/**
 * App Controller which orchestrates the logic
 */

 export default class AppController {
     constructor(){

     }

     public async init(envPath: string): Promise<boolean> {
        // Load the env
        const result = dotenv.config({
            path: envPath
        });
        if(result.error){
            console.log(`Failed to load .env file from : ${envPath}`);
            return false;
        }
        console.log('Env parsed and injected into process');
        
        const status = await DatabaseConnectionManager.connect(ConfigServiceBase.create().getDatabase(),
                                                               ConfigServiceBase.create().getMongoUrl());
        if(status){
            console.log('Successfully connected to Mongo instance');
        }else{
            console.log('Failed to connect to Mongo');
        }
        return status;
     }

     public async start(command: ICommand){
         await command.execute();
         // return
     }

 }