import { Router } from "express-serve-static-core";
import express from 'express';
import HistoryAPIController from './HistoryAPIController';

export default class ControllerBootstrapper {
    public static bootstrap(app: express.Application) {
        // define the base route for all apis
        const v1Router = express.Router();
        app.use('/api/v1', v1Router);
        
        // configure route for all v1 controllers
        new HistoryAPIController().defineRoutes(v1Router);

        // To setup /v2
        // const v2Router = express.Router();
        // app.use('/api/v2', express.Router());
        // configure route for all v1 controllers
        //new HistoryAPIController2().defineRoutes(v2Router);
    }
}