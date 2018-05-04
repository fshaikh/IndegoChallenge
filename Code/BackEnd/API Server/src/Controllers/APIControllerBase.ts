/**
 * Base class for all API Controllers
 */
import express from 'express';
import ResponseBase from '../../node_modules/indego.shared/dist/Models/ResponseBase';
export default abstract class APIControllerBase {
    constructor(){

    }

    protected BadRequest(response: ResponseBase, httpResponse: express.Response): express.Response {
        return this.SendResponse(400 , response , httpResponse);
    }

    protected Ok(response: ResponseBase, httpResponse: express.Response): express.Response {
        return this.SendResponse(200 , response, httpResponse);
    }

    protected NotFound(response: ResponseBase, httpResponse: express.Response): express.Response {
        return this.SendResponse(404 , response, httpResponse);
    }

    protected InternalServerError(response: ResponseBase, httpResponse: express.Response): express.Response {
        return this.SendResponse(500 , response , httpResponse);
    }

    private SendResponse(status: number,response: ResponseBase, httpResponse: express.Response): express.Response {
        return httpResponse.status(status).send(response);
    }
}