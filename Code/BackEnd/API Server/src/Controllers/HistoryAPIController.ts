import APIControllerBase from "./APIControllerBase";
import { Router } from "express-serve-static-core";
import { NextFunction } from "connect";
import express from 'express';
import ResponseBase from '../../node_modules/indego.shared/dist/Models/ResponseBase';
import HistoryRequest from '../../node_modules/indego.shared/dist/Models/HistoryRequest';
import UtilService from '../../node_modules/indego.shared/dist/services/UtilService';
import HistoryService from "../services/HistoryService";
import { HistoryResponse, HistoriesResponse } from '../../node_modules/indego.shared/dist/Models/HistoryResponse';
import HistoryResponseDTO from "../Models/HistoryResponseDTO";
import HistoryRangeRequest from '../../node_modules/indego.shared/dist/Models/HistoryRangeRequest';
import StationResponseDTO from "../Models/StationResponseDTO";
/**
 * API Controller for History
 */

 export default class HistoryAPIController extends APIControllerBase {
     constructor(){
         super();
     }

     public defineRoutes(router: Router){
        // GET /api/v1/stations?at=2017-11-01T11:00:00
        router.get('/stations',this.GetAllStationsAtTimestamp.bind(this));
        
        // Since Express doesnt support routing based on query string, the requests for 3rd will always be handled by 2nd
        // so we write a route handler which then routes to respective route handlers
        router.get('/stations/:id', this.RouteHandlerForIds.bind(this));
        
        // GET /api/v1/stations/id?at=2017-11-01T11:00:00
        //router.get('/stations/:id', this.GetStationAtTimestamp.bind(this));
        // GET /api/v1/stations/id?from=2017-11-01T11:00:00&to=2017-12-01T11:00:00
        router.get('/stations/:id', this.GetStationsWithinTimestampRange.bind(this));
     }

     public async RouteHandlerForIds(httpRequest: express.Request, httpResponse: express.Response, next: express.NextFunction) {
         if(httpRequest.query.from && httpRequest.query.to) {
            return next();
         }
         return this.GetStationAtTimestamp(httpRequest, httpResponse, next);
     }

     public async GetAllStationsAtTimestamp(httpRequest: express.Request, httpResponse: express.Response, next: express.NextFunction){
        let historiesResponse: HistoryResponse = new HistoryResponse();
         // Read the timestamp from query string
         const queryTimestamp = httpRequest.query.at;

         if(queryTimestamp == null || !UtilService.isValidDate(queryTimestamp)){
            historiesResponse.isSuccess = false;
            historiesResponse.message = 'at query param missing OR at is not a valid date';
             return this.BadRequest(historiesResponse, httpResponse);
         }

         const historyService: HistoryService = new HistoryService();
         const historyRequest: HistoryRequest = new HistoryRequest();
         let historyResponseDTO: HistoryResponseDTO; 
         try{
            historyRequest.At = new Date(queryTimestamp);
            historiesResponse = await historyService.getStationsAtTimestamp(historyRequest);
            historyResponseDTO = this.GetHistoryResponseDTO(historiesResponse);
         } catch(e) {
             console.log(e);
             historiesResponse.isSuccess = false;
             return this.InternalServerError(historiesResponse,httpResponse);
         }
         return historyResponseDTO != null ?
            this.Ok(historyResponseDTO, httpResponse):
            this.handleNotFound(httpResponse);
     }     

     public async GetStationsWithinTimestampRange(httpRequest: express.Request, httpResponse: express.Response, next: express.NextFunction){
         let historyResponse: HistoryResponse = new HistoryResponse();
         // Read the station id
         const stationId = httpRequest.params.id;
         // Read the timestamps from query string
         const startDate = httpRequest.query.from;
         const endDate = httpRequest.query.to;

         if(startDate == null ||
            endDate == null ||
            !UtilService.isValidDate(startDate) ||
            !UtilService.isValidDate(endDate)) {
            historyResponse.isSuccess = false;
            historyResponse.message = 'from/to query param missing OR from/to not valid date';
            return this.BadRequest(historyResponse, httpResponse);
         }

         const historyService: HistoryService = new HistoryService();
         const historyRangeRequest: HistoryRangeRequest = new HistoryRangeRequest();
         let stationResponseDTO: StationResponseDTO;

         try{
            historyRangeRequest.StartDate = new Date(startDate);
            historyRangeRequest.EndDate = new Date(endDate);
            historyRangeRequest.Id = stationId;
            historyResponse = await historyService.getStationWithinRange(historyRangeRequest);
         } catch(e) {
             console.log(e);
             historyResponse.isSuccess = false;
             return this.InternalServerError(historyResponse,httpResponse);
         }
         return  this.Ok(historyResponse, httpResponse);
     }

     public async GetStationAtTimestamp(httpRequest: express.Request, httpResponse: express.Response, next: express.NextFunction){
        let historyResponse: HistoryResponse = new HistoryResponse();
        // Read the station id
        const stationId = httpRequest.params.id;
        // Read the timestamp from query string
        const queryTimestamp = httpRequest.query.at;

        if(queryTimestamp == null || !UtilService.isValidDate(queryTimestamp)){
           historyResponse.isSuccess = false;
           historyResponse.message = 'at query param missing OR at is not a valid date';
           return this.BadRequest(historyResponse, httpResponse);
        }

        const historyService: HistoryService = new HistoryService();
        const historyRequest: HistoryRequest = new HistoryRequest();
        let stationResponseDTO: StationResponseDTO;

        try{
           historyRequest.At = new Date(queryTimestamp);
           historyRequest.Id = stationId;
           historyResponse = await historyService.getStationAtTimestamp(historyRequest);
           stationResponseDTO = this.GetStationResponseDTO(historyResponse);
        } catch(e) {
            console.log(e);
            historyResponse.isSuccess = false;
            return this.InternalServerError(historyResponse,httpResponse);
        }
        return stationResponseDTO != null ?
           this.Ok(stationResponseDTO, httpResponse):
           this.handleNotFound(httpResponse);
    } 

     private GetHistoryResponseDTO(historiesResponse: HistoryResponse): HistoryResponseDTO{
         if(historiesResponse.Model == null){
             return null;
         }
         let historyResponseDTO: HistoryResponseDTO = new HistoryResponseDTO();
         historyResponseDTO.at = historiesResponse.Model.at;
         historyResponseDTO.stations = historiesResponse.Model.stations;
         historyResponseDTO.weather = historiesResponse.Model.weather;
         return historyResponseDTO;
     }

     private GetStationResponseDTO(historyResponse: HistoryResponse): StationResponseDTO {
         let stationResponseDTO: StationResponseDTO = new StationResponseDTO();
         if(historyResponse.Model == null || historyResponse.Model.stations.length === 0) {
             return null;
         }
         stationResponseDTO.at = historyResponse.Model.at;
         stationResponseDTO.weather = historyResponse.Model.weather;
         stationResponseDTO.station = historyResponse.Model.stations[0];

         return stationResponseDTO;
     }

     private handleNotFound(httpResponse: express.Response){
        let response: ResponseBase = new ResponseBase();
        response.isSuccess = false;
        response.message = 'No suitable data for requested timestamp or station id';
        return this.NotFound(response, httpResponse);
     }
 }