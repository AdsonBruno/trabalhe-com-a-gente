import { Request, Response } from 'express';
import { Controller } from '../../presentation/protocols/controller';
import { IHttpRequest } from '../../data/protocols/http/interfaces/IHttpClient';
import { HttpRequest } from '../../presentation/protocols/http';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
