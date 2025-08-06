import { Request, Response } from 'express';
import { Controller } from '../../presentation/protocols/Controller';
import { HttpRequest } from '../../presentation/protocols/Http';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
