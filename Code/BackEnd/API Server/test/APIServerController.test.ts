import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import APIServerController from '../src/APIServerController';

describe('APIServerController', async function() {
    it('should invoke base AppController init function', async function(){
        const apiServerController: APIServerController = new APIServerController();
        // how do i check if base class's init function is being invoked?
        sinon.spy(apiServerController,'init');
    });
});