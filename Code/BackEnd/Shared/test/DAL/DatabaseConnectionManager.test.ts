import 'mocha';
import {expect} from 'chai';
import * as DatabaseConnectionManager from '../../src/DAL/DatabaseConnectionManager';

describe('DatabaseConnectionManager',() =>{
    it('should return undefined for a non-existent database', () => {
        expect(DatabaseConnectionManager.getDatabaseConnection("IndegoDb")).to.be.undefined;
    });

    it('should connect to Mongo instance', async function(){
        const status = await DatabaseConnectionManager.connect('IndegoDb','mongodb://127.0.0.1');
        expect(status).true;
        const db = DatabaseConnectionManager.getDatabaseConnection('IndegoDb');
        expect(db).not.null;
    });
});