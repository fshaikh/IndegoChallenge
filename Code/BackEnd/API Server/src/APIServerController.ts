import express from 'express';
import { Router } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import AppController from '../node_modules/indego.shared/dist/app/AppController';
import ControllerBootstrapper from './Controllers/ControllerBootstrapper';


export default class APIServerController extends AppController {
    private _app: express.Application;
    private _jsonParser;

    constructor() {
        super();
    }

    public async init(envPath: string): Promise<boolean> {
        var status: boolean = true;
        // Call App controller
        status = await super.init(envPath);
        if(!status){
            return status;
        }
        // Do Express setup here
        this._app = express();
        this.setupMiddlewares();
        
        // bootstrap controllers
        ControllerBootstrapper.bootstrap(this._app);
        
        return status;
    }

    public getApp(): express.Application {
        return this._app;
    }

    private setupMiddlewares() {
        // setup response compression
        //this._app.use(compression);

        // setup body-parsing parsers. Query strings, json, etc
        this.setupBodyParsers();

        // setup cookie parser
        this._app.use(cookieParser());

        
    }

    private setupBodyParsers() {
        // Enable urlencoded to parse query string 
        this._app.use(bodyParser.urlencoded({ extended: true }));
        // Enable JSON parsing. This allows the json posted in body of the request to be available in controllers
        this._jsonParser = bodyParser.json();
        this._app.use(this._jsonParser);
    }
}