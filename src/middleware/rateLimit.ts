import { MiddlewareFn } from 'type-graphql';
import { getGraphQLRateLimiter } from 'graphql-rate-limit';
import { MyContext } from '../MyContext';

const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id });

export const rateLimit: MiddlewareFn<MyContext> = async (
  {
    root, args, context, info,
  },
  next,
) => {
  const errorMessage = await rateLimiter(
    {
      parent: root, args, context, info,
    },
    { max: 5, window: '10s' },
  );

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return next();
};
