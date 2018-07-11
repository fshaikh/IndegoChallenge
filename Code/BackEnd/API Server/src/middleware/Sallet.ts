/**
 * Middleware to improve security
 */

import express from 'express';
export function sallet(req: express.Request, res: express.Response, next: express.NextFunction){
    res.removeHeader('x-powered-by');
    next();
}