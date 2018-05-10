import { CommandEnum } from "./CommandEnum";
import { ICommand } from '../../node_modules/indego.shared/dist/app/ICommand';
import QueryServiceCommandRequest from "./QueryServiceCommandRequest";
import { QueryServiceManagerCommand } from "./QueryServiceManagerCommand";
import QueryConfigService from '../services/QueryConfigService';

export default class CommandFactory {
    public static getCommand(commandType: CommandEnum): ICommand {
        let command: ICommand = null;
        switch(commandType){
            case CommandEnum.QueryServiceCommand:
                const commandRequest: any = new QueryServiceCommandRequest();
                commandRequest.Name = "Query Service Manager";
                commandRequest.City = QueryConfigService.create().getCity();
                command = new QueryServiceManagerCommand(commandRequest);
                break;
        }
        return command;
    }
}