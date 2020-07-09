import { Request, Response } from 'express';
import loaders from './loaders';

export interface MyContext {
  req: Request;
  res: Response;
  loaders: typeof loaders;
}
