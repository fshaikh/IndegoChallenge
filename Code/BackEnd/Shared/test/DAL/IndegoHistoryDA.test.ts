import 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';

import * as DatabaseConnectionManager from '../../src/DAL/DatabaseConnectionManager';
import IndegoHistoryCommandDA from '../../src/DAL//History/IndegoHistoryCommandDA';
import IndegoHistoryQueryDA from '../../src/DAL//History/IndegoHistoryQueryDA';
import HistoryModel from '../../src/Models/HistoryModel';
import InsertDocumentResponse from '../../src/Models/InsertDocumentResponse';
import IdService from '../../src/services/IdService';
import HistoryRequest from '../../src/Models/HistoryRequest';
import { HistoriesResponse, HistoryResponse } from '../../src/Models/HistoryResponse';

describe('IndegoHistoryDA' , () => {
     const DBName = 'IndegoDb';
     before( async function(){
        const status = await DatabaseConnectionManager.connect(DBName,'mongodb://127.0.0.1');
     });

     async function insertHistory(indegoHistoryDA, at: Date,stations=null){
        const historyModel = new HistoryModel();
        historyModel._id = new IdService().getUniqueId();
        historyModel.at = at;
        historyModel.stations = stations || {};
        historyModel.weather = {};
        const response: InsertDocumentResponse =  await indegoHistoryDA.saveHistoryData(historyModel);
        return response;
    }

    // describe('DA Connection', () => {
    //     it('should create IndegoHistoryCommandDA instance correctly', async function(){
    //         const indegoHistoryDA = new IndegoHistoryCommandDA(DBName);
    //         expect(indegoHistoryDA.getDatabase()).to.equal(DatabaseConnectionManager.getDatabaseConnection(DBName));
    //     });

    //     it('should create IndegoHistoryQueryDA instance correctly', async function(){
    //         const indegoHistoryDA = new IndegoHistoryQueryDA(DBName);
    //         expect(indegoHistoryDA.getDatabase()).to.equal(DatabaseConnectionManager.getDatabaseConnection(DBName));
    //     });

    //     it('should not call connect when creating IndegoHistoryCommandDA instance', async function(){
    //         const connectSpy = sinon.spy(DatabaseConnectionManager,'connect');

    //         const indegoHistoryDA = new IndegoHistoryCommandDA(DBName);
    //         expect(connectSpy.notCalled).true;
    //     });  

    //     it('should not call connect when creating IndegoHistoryQueryDA instance', async function(){
    //         const connectSpy = sinon.spy(DatabaseConnectionManager,'connect');

    //         const indegoHistoryDA = new IndegoHistoryQueryDA(DBName);
    //         expect(connectSpy.notCalled).true;
    //     });  
    // });

    // describe('History DA Inserts', async () =>  {
    //     it('should insert HistoryModel in indg_history collection', async function(){
    //         const indegoHistoryDA = new IndegoHistoryDA(DBName);
    //         const response: InsertDocumentResponse =  await insertHistory(indegoHistoryDA,new Date());
    //         expect(response.isSuccess).true;
    //         expect(response.insertCount).to.equal(1);
            
    //     }); 
    // });
    describe('IndegoHistoryQueryDA',  async () => {
        describe('History DA Finds', async () => {
            // it('should return stations for a saved timestamp', async function() {
            //     const indegoHistoryCommandDA = new IndegoHistoryCommandDA(DBName);
            //     const at = new Date();
            //     // first insert
            //     const response = await insertHistory(indegoHistoryCommandDA, at);
            //     if(response.isSuccess){
            //         const request: HistoryRequest = new HistoryRequest();
            //         request.At = at;
            //         let indegoHistoryQueryDA: IndegoHistoryQueryDA = new IndegoHistoryQueryDA(DBName);
            //         const historiesResponse: HistoryResponse = await indegoHistoryQueryDA.getStationsAtTimestamp(request);
            //         console.log(historiesResponse);
            //         expect(historiesResponse.Model.at).to.not.null;
            //     }
            // });
    
            // it('should not return stations for an unsaved timestamp', async function() {
            //     const indegoHistoryDA = new IndegoHistoryQueryDA(DBName);
            //     const request: HistoryRequest = new HistoryRequest();
            //     request.At = new Date();
            //     const historiesResponse: HistoryResponse = await indegoHistoryDA.getStationsAtTimestamp(request);
            //     expect(historiesResponse..length).to.equal(0);
                            
            // });

            it('should return station with a station id and for a saved timestamp', async function() {
                const indegoHistoryCommandDA = new IndegoHistoryCommandDA(DBName);
                const at = new Date();
                // first insert
                const response = await insertHistory(indegoHistoryCommandDA, at , {
                    'features':[
                        {
                            'properties':{
                                'kioskId': '1234'
                            }
                        },
                        {
                            'properties':{
                                'kioskId': '1111'
                            }
                        }
                    ]
                });
                if(response.isSuccess){
                    const request: HistoryRequest = new HistoryRequest();
                    request.At = at;
                    request.Id = '1234';
                    let indegoHistoryQueryDA: IndegoHistoryQueryDA = new IndegoHistoryQueryDA(DBName);
                    const historyResponse: HistoryResponse = await indegoHistoryQueryDA.getStationAtTimestamp(request);
                    expect(historyResponse.Model).to.not.null;
                }
            });
        });
    });
    
});