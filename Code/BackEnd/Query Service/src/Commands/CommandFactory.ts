import { CommandEnum } from "./CommandEnum";
import { ICommand } from "./ICommand";
import QueryServiceCommandRequest from "./QueryServiceCommandRequest";
import { QueryServiceManagerCommand } from "./QueryServiceManagerCommand";

export default class CommandFactory {
    public static getCommand(commandType: CommandEnum): ICommand {
        let command: ICommand = null;
        switch(commandType){
            case CommandEnum.QueryServiceCommand:
                const commandRequest = new QueryServiceCommandRequest();
                commandRequest.Name = "Query Service Manager";
                commandRequest.City = 'Philadelphia';
                command = new QueryServiceManagerCommand(commandRequest);
                break;
        }
        return command;
    }
}