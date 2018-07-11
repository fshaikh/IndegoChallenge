/**
 * Middleware to add keep-alive related headers to response.
 * Advantages:
 * 1. Keeps the connection on which reduces the usage of sockets/ports. There is a max limit on the 
 *    number of file descriptors and this helps to keep it under limits (though not the only way)
 * 2. Reduces the connection time as the same connection can be reused
 * 3. Also allows to reuse connections between load balancer and node machine
 */
import express from 'express';
export function keepAlive(req: express.Request, res: express.Response, next: express.NextFunction){
    res.setHeader('Connection','keep-alive');
    res.setHeader('Keep-Alive', 'timeout:200');
    next();
}