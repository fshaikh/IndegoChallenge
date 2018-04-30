import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import { ICommand } from '../src/Commands/ICommand';
import { QueryServiceManagerCommand } from '../src/Commands/QueryServiceManagerCommand';
import { QueryServiceManager } from '../src/services/QueryServiceManager';

describe('QueryServiceManagerCommand', async function() {
    it('should invoke QueryServiceManager', async function(){
        const command: ICommand = new QueryServiceManagerCommand();
        const handleQueryingOperationSpy = sinon.spy(QueryServiceManager,'handleQueryingOperation');
        expect(handleQueryingOperationSpy.called).true;
    });
});