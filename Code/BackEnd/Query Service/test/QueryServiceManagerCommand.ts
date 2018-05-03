import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import { ICommand } from '../src/Commands/ICommand';
import { QueryServiceManagerCommand } from '../src/Commands/QueryServiceManagerCommand';
import { QueryServiceManager } from '../src/services/QueryServiceManager';
import QueryServiceCommandRequest from '../src/Commands/QueryServiceCommandRequest';

describe('QueryServiceManagerCommand', async function() {
    it('should invoke QueryServiceManager', async function(){
        const commandRequest = new QueryServiceCommandRequest();
        commandRequest.Name = "Query Service Manager";
        commandRequest.City = 'Philadelphia';
        const command: ICommand = new QueryServiceManagerCommand(commandRequest);
        const handleQueryingOperationSpy = sinon.spy(QueryServiceManager,'handleQueryingOperation');
        expect(handleQueryingOperationSpy.called).true;
    });
});