import { Router } from 'express';

export class Api {
    public getRouter(): Router {
        const router = Router();
        console.log("TEST MOTHERFUCKER");
        // TODO: You probably want to register your routes here.
        return router;
    }
}
