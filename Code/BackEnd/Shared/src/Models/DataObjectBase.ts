import { IdService } from "../sharedExports";

/**
 * Base class for all domain objects
 */

 export default class DataObjectBase {
     constructor(id: string = null){
         this._id = id == null ? new IdService().getUniqueId() : id;
         this.CreatedDate = new Date();
         this.LastModifiedDate = new Date();
     }  
     public _id: string;
     public CreatedDate: Date;
     public LastModifiedDate: Date;
 }