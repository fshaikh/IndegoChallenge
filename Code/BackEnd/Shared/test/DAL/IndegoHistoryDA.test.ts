import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import * as DatabaseConnectionManager from '../../src/DAL/DatabaseConnectionManager';
import IndegoHistoryDA from '../../src/DAL/IndegoHistoryDA';
import HistoryModel from '../../src/Models/HistoryModel';
import InsertDocumentResponse from '../../src/Models/InsertDocumentResponse';
import IdService from '../../src/services/IdService';

describe('IndegoHistoryDA' , () => {
     const DBName = 'IndegoDb';
     before( async function(){
        const status = await DatabaseConnectionManager.connect(DBName,'mongodb://127.0.0.1');
     });

    describe('DA Connection', () => {
        it('should create IndegoHistoryDA instance correctly', async function(){
            const indegoHistoryDA = new IndegoHistoryDA(DBName);
            expect(indegoHistoryDA.getDatabase()).to.equal(DatabaseConnectionManager.getDatabaseConnection(DBName));
        });

        it('should not call connect when creating IndegoHistoryDA instance', async function(){
            const connectSpy = sinon.spy(DatabaseConnectionManager,'connect');

            const indegoHistoryDA = new IndegoHistoryDA(DBName);
            expect(connectSpy.notCalled).true;
        });

        it('should insert HistoryModel in indg_history collection', async function(){
            const indegoHistoryDA = new IndegoHistoryDA(DBName);
            const historyModel = new HistoryModel();
            historyModel._id = new IdService().getUniqueId();
            historyModel.at = new Date();
            historyModel.stations = {};
            historyModel.weather = {};
            const response: InsertDocumentResponse =  await indegoHistoryDA.saveHistoryData(historyModel);
            console.log(response);
            expect(response.isSuccess).true;
            expect(response.insertCount).to.equal(1);
            
        });

        
    });
});