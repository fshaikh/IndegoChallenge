/**
 * Provides Ids related functionality
 */
import uuidV1 from 'uuid/v1';

 export default class IdService {
     /**
      * Returns a UUID
      */
     public getUniqueId(): string {
         return uuidV1();
     }
 }