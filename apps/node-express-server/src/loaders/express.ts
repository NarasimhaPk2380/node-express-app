import * as express from 'express';
// import cors from "cors";
// import path from "path";
import routes from '../api';
import { CustomError } from '../utils';

export default ({ app }: { app: express.Application }) => {
  app.use(express.json({}));

  // Load API routes
  app.use('/api', routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    console.log(req);
    const err = new CustomError(404, 'Not Foundasdfsfsdffsdad');
    next(err);
  });

  app.use(
    (
      err: CustomError,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err,
      });
    }
  );
};
