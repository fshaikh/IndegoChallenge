import { Router } from "express-serve-static-core";
import express from 'express';
import HistoryAPIController from './HistoryAPIController';

export default class ControllerBootstrapper {
    public static bootstrap(app: express.Application, router: Router) {
        // define the base route for all apis
        app.use('/api', router);

        // configure route for all controllers
        new HistoryAPIController().defineRoutes(router);
    }
}