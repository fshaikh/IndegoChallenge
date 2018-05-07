import DABase from '../DABase';
import HistoryModel from '../../Models/HistoryModel';
import HistoryRequest from '../../Models/HistoryRequest';
import { HistoryResponse, HistoriesResponse } from '../../Models/HistoryResponse';
import * as HistoryDACommon from './HistoryDACommon';
import HistoryRangeRequest from '../../Models/HistoryRangeRequest';
import FindDocumentsResponse from '../../Models/FindDocumentsResponse';

/**
 * DA class which defines methods for Querying History collection
 */
export default class IndegoHistoryQueryDA extends DABase {

    constructor(database: string) {
        super(database);
    }

    public async getStationsAtTimestamp(request: HistoryRequest, excludeSystemFields: boolean = true): Promise<HistoryResponse> {
        let historiesResponse: HistoryResponse = new HistoryResponse();
        const response = await this.doFindOne(HistoryDACommon.HISTORY_COLLECTION,
                                              this.getProjection(excludeSystemFields),
                                              this.getQueriedAtFilter(request.At)
                                            );
        if(!response.isSuccess) {
            historiesResponse.isSuccess = false;
            historiesResponse.message = response.message;
            return historiesResponse;
        }
        historiesResponse.Model = this.buildHistoryModel(response);
        return historiesResponse;
    }

    public async getStationAtTimestamp(request: HistoryRequest, excludeSystemFields: boolean = true): Promise<HistoryResponse> {
        let historyResponse: HistoryResponse = new HistoryResponse();
        const response = await this.doFindOne(
                                              HistoryDACommon.HISTORY_COLLECTION,
                                              this.getProjection(excludeSystemFields),
                                              this.getStationFilter(request.At, request.Id)
                                            );
        if(!response.isSuccess) {
            historyResponse.isSuccess = false;
            historyResponse.message = response.message;
            return historyResponse;
        }
        historyResponse.Model = this.buildHistoryModel(response);

        return historyResponse;
    }

    public async getStationWithinRange(request: HistoryRangeRequest, excludeSystemFields: boolean = true): Promise<HistoriesResponse> {
        let historiesResponse: HistoriesResponse = new HistoriesResponse();
        const response: FindDocumentsResponse = await this.doFind(
                                            HistoryDACommon.HISTORY_COLLECTION,
                                            this.getProjection(excludeSystemFields),
                                            this.getStationTimeRangeFilter(request)
                                          );
        if(!response.isSuccess) {
            historiesResponse.isSuccess = false;
            historiesResponse.message = response.message;
            return historiesResponse;
        }
        historiesResponse.Models = response.Documents.map((item: any) => {
            const historyModel : HistoryModel = new HistoryModel();
            historyModel.at = item.at;
            historyModel.stations = item.stations;
            historyModel.weather = item.weather;
            return historyModel;
        });

        return historiesResponse;
    }

    public async removeAll(){
        await this.doRemoveAll(HistoryDACommon.HISTORY_COLLECTION);
    }

    private getProjection(excludeSystemFields: boolean) {
        return excludeSystemFields ? {
            _id: 0,
            CreatedDate: 0,
            LastModifiedDate: 0
        }:{ };
    }

    private buildHistoryModel(findDocumentResponse: any): HistoryModel{
        const historyModel : HistoryModel = new HistoryModel();
        historyModel.at = findDocumentResponse.Document.at;
        historyModel.stations = findDocumentResponse.Document.stations;
        historyModel.weather = findDocumentResponse.Document.weather;
        return historyModel;
    }

    private getQueriedAtFilter(at: Date) {
        return { at: { $gte: at } }
    }

    private getStationFilter(at: Date, stationId: string) {
        return  {
                   $and: [
                    { at: { $gte: at} },
                    { 'stations.features.properties.kioskId': stationId }
                   ]
        };
    }

    private getStationTimeRangeFilter(request: HistoryRangeRequest) {
        return {
                  $and: [
                            { 
                                $and:[
                                    { at: { $gte: request.StartDate} },
                                    { at: { $lte: request.EndDate} }
                                ]
                            },
                            { 'stations.features.properties.kioskId': request.Id }
                        ]
           };
    }
}