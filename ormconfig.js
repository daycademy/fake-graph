const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: isProd ? [`${__dirname}/entity/**/*.ts`] : [`${__dirname}/src/entity/**/*.ts`],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: isProd ? [`${__dirname}/entity/**/*.ts`] : [`${__dirname}/src/entity/**/*.ts`],
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
