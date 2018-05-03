import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import * as DatabaseConnectionManager from '../../src/DAL/DatabaseConnectionManager';
import IndegoHistoryDA from '../../src/DAL/IndegoHistoryDA';
import HistoryModel from '../../src/Models/HistoryModel';
import InsertDocumentResponse from '../../src/Models/InsertDocumentResponse';
import IdService from '../../src/services/IdService';
import HistoryRequest from '../../src/Models/HistoryRequest';
import { HistoriesResponse } from '../../src/Models/HistoryResponse';

describe('IndegoHistoryDA' , () => {
     const DBName = 'IndegoDb';
     before( async function(){
        const status = await DatabaseConnectionManager.connect(DBName,'mongodb://127.0.0.1');
     });

     async function insertHistory(indegoHistoryDA, at: Date){
        const historyModel = new HistoryModel();
        historyModel._id = new IdService().getUniqueId();
        historyModel.at = at;
        historyModel.stations = {};
        historyModel.weather = {};
        const response: InsertDocumentResponse =  await indegoHistoryDA.saveHistoryData(historyModel);
        return response;
    }

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
    });

    // describe('History DA Inserts', async () =>  {
    //     it('should insert HistoryModel in indg_history collection', async function(){
    //         const indegoHistoryDA = new IndegoHistoryDA(DBName);
    //         const response: InsertDocumentResponse =  await insertHistory(indegoHistoryDA,new Date());
    //         expect(response.isSuccess).true;
    //         expect(response.insertCount).to.equal(1);
            
    //     }); 
    // });

    describe('History DA Finds', async () => {
        it('should return stations for a saved timestamp', async function() {
            const indegoHistoryDA = new IndegoHistoryDA(DBName);
            const at = new Date();
            // first insert
            const response = await insertHistory(indegoHistoryDA, at);
            if(response.isSuccess){
                const request: HistoryRequest = new HistoryRequest();
                request.At = at;
                const historiesResponse: HistoriesResponse = await indegoHistoryDA.getStationsAtTimestamp(request);
                expect(historiesResponse.Models.length).to.equal(1);
            }
        });

        it('should not return stations for an unsaved timestamp', async function() {
            const indegoHistoryDA = new IndegoHistoryDA(DBName);
            const request: HistoryRequest = new HistoryRequest();
            request.At = new Date();
            const historiesResponse: HistoriesResponse = await indegoHistoryDA.getStationsAtTimestamp(request);
            expect(historiesResponse.Models.length).to.equal(0);
                        
        });
    });
});