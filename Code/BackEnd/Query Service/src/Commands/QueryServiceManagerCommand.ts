import { ICommand } from "./ICommand";
import { CommandRequest } from "./CommandRequest";
import { QueryServiceManager } from "../services/QueryServiceManager";
import QueryRequest from "../Models/QueryRequest";
import QueryServiceCommandRequest from "./QueryServiceCommandRequest";

export class QueryServiceManagerCommand implements ICommand {
    private _commandRequest: QueryServiceCommandRequest;

    /**
     * Initializes a new instance of QueryServiceManagerCommand
     * @param commandRequest - Command Request
     */
    constructor(commandRequest: QueryServiceCommandRequest){
        this._commandRequest = commandRequest;
    }

    /**
     * Executes the command
     */
    async execute() {
        console.log('executing query manager command');

        // Construct the service and service request
        const queryServiceManager: QueryServiceManager = new QueryServiceManager();
        const queryRequest: QueryRequest = new QueryRequest();
        queryRequest.city = this._commandRequest.City;

        // invoke the service which is the receiver of the command
        await queryServiceManager.handleQueryingOperation(queryRequest);
        console.log('finished executing query manager command');
    }

   
}