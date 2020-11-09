import { Request, Response } from 'express';
import { PubSub } from 'graphql-subscriptions';
import loaders from './loaders';

export interface MyContext {
  req: Request;
  res: Response;
  loaders: typeof loaders;
  pubsub: PubSub;
}
