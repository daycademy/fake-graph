import { createConnection } from 'typeorm';

export const testConn = (drop = false) => createConnection({
  type: 'sqlite',
  database: 'database-test.sqlite',
  synchronize: true,
  dropSchema: drop,
  entities: ['src/entity/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
  },
});
