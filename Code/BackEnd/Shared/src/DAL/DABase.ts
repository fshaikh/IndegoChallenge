/**
 * Base class for all DA 
 */
import { Db, Collection, InsertOneWriteOpResult } from 'mongodb';
import { getDatabaseConnection } from './DatabaseConnectionManager';
import { timingSafeEqual } from 'crypto';
import InsertDocumentResponse from '../Models/InsertDocumentResponse';
import DataObjectBase from '../Models/DataObjectBase';
import FindDocumentsResponse from '../Models/FindDocumentsResponse';
import FindDocumentResponse from '../Models/FindDocumentResponse';

 export default abstract class DABase {
    protected _database: Db;

    constructor(database: string) {
        this._database = getDatabaseConnection(database);
    }
    
    protected async doInsert(collection: string, data: DataObjectBase): Promise<InsertDocumentResponse> {
        let response: InsertDocumentResponse = new InsertDocumentResponse();
        // Stripping the type from InsertOneWriteOpResult since mongoDb returns 
        // insertedIds as an object and @types define it as an ObjectID
        let insertResponse: any;
        try{
            insertResponse = await this.getCollection(collection).insert(data);
            if (insertResponse == null || !insertResponse.result.ok) {
                return this.getInsertErrorResponse(insertResponse, 'Failed to insert document');
            }
            response.insertCount = insertResponse.insertedCount;
            response.insertedId = insertResponse.insertedIds['0'];
            return response;
        } catch(ex) {
            return this.getInsertErrorResponse(insertResponse, ex);
        }
    }

    protected async doFind(collection: string, projection: object, filter: object): Promise<FindDocumentsResponse> {
        let response: FindDocumentsResponse = new FindDocumentsResponse();
        try {
            const records = await this.getCollection(collection).find(filter, projection).toArray();
            response.Documents = records;
            return response;
        } catch(e) {
            console.log(e);
            response.isSuccess = false;
            return response;
        }
    }

    protected async doFindOne(collection: string, projection: object, filter: object): Promise<FindDocumentResponse> {
        let response: FindDocumentResponse = new FindDocumentResponse();
        try {
            const document = await this.getCollection(collection).findOne(filter, projection);
            response.Document = document;
            return response;
        } catch(e) {
            console.log(e);
            response.isSuccess = false;
            return response;
        }
    }

    private getCollection(collection: string): Collection {
        return this._database.collection(collection);
    }

    private getInsertErrorResponse(insertResponse: InsertOneWriteOpResult, message: string): InsertDocumentResponse{
        let response: InsertDocumentResponse = new InsertDocumentResponse();
        response.isSuccess = false;
        response.insertCount = insertResponse ? insertResponse.insertedCount: 0;
        response.message = message;
        return response;
    }

    protected doInsertValidate(data: any): boolean {
        if(data.Id == null){
            return false;
        }
        return true;
    }

    public getDatabase(): Db{
        return this._database;
    }
    
 }