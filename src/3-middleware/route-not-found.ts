import { NextFunction, Request, Response } from "express";
import { RouteNotFoundErrorModel } from "../4-models/error-models";

function routeNotFound(request: Request, response: Response, next: NextFunction) {
    
    //Sends to the user an error message when he tries to browse to a route that doesn't exist
    const err = new RouteNotFoundErrorModel(request.originalUrl);

    next(err);
}

export default routeNotFound;
