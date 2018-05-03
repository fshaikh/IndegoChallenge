import APIControllerBase from "./APIControllerBase";
import { Router } from "express-serve-static-core";
import { NextFunction } from "connect";
import express from 'express';
import ResponseBase from '../../node_modules/indego.shared/dist/Models/ResponseBase';
import HistoryRequest from '../../node_modules/indego.shared/dist/Models/HistoryRequest';
import UtilService from '../../node_modules/indego.shared/dist/services/UtilService';
import HistoryService from "../services/HistoryService";
import { HistoryResponse, HistoriesResponse } from '../../node_modules/indego.shared/dist/Models/HistoryResponse';
/**
 * API Controller for History
 */

 export default class HistoryAPIController extends APIControllerBase {
     constructor(){
         super();
     }

     public defineRoutes(router: Router){
        // GET /api/v1/stations?at=2017-11-01T11:00:00
        router.get('/stations',this.GetAllStationsAtTimestamp);
     }

     public async GetAllStationsAtTimestamp(httpRequest: express.Request, httpResponse: express.Response, next: express.NextFunction){
         console.log('in controller');
        let historiesResponse: HistoriesResponse = new HistoriesResponse();
         // Read the timestamp from query string
         const queryTimestamp = httpRequest.query.at;

         if(queryTimestamp == null || !UtilService.isValidDate(queryTimestamp)){
            historiesResponse.isSuccess = false;
            historiesResponse.message = 'at query param missing OR at is not a valid date';
             return super.BadRequest(historiesResponse, httpResponse);
         }

         const historyService: HistoryService = new HistoryService();
         const historyRequest: HistoryRequest = new HistoryRequest();

         try{
            historyRequest.At = new Date(queryTimestamp);
            historiesResponse = await historyService.getStationsAtTimestamp(historyRequest);
         } catch(e) {
             console.log(e);
             historiesResponse.isSuccess = false;
             return super.InternalServerError(historiesResponse,httpResponse);
         }
         return super.Ok(historiesResponse, httpResponse);
     }     
 }