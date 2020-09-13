import { createConnection } from 'typeorm';

export const testConn = (drop = false) => createConnection({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  dropSchema: drop,
  entities: ['src/entity/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
  },
});
