/**
 * Handles all global events/exceptions
 */
import http from 'http';

 export default class GlobalHandler {
     constructor(server: http.Server) {
         server.on('error', this.handleHttpError);
         // Register catchall uncaught exception at process level
         process.on('uncaughtException', this.handleUncaughtException);
     }

     /**
        * Event handler for error event from http
        * @param err - Object containing error information
    */
    handleHttpError(err) {
        console.log(`Error in http connection: ${err}`);
    }

    /**
     * Event handler for uncaught exception
     * @param err - Object containing error information
     */
    handleUncaughtException(err) {
        console.log(`Uncaught Exception: ${err}`);
    }
}