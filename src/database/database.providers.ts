import { DataSource } from 'typeorm';

export const databaseProviders = {
  development: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USERNAME || 'root',
            password: process.env.POSTGRES_PASSWORD || 'root',
            database: process.env.POSTGRES_DATABASE || 'test',
            entities: [__dirname + '/Entities/*.entity{.ts,.js}'],
            synchronize: true,
          });
          console.log('hello');
          await dataSource.initialize();
          console.log(
            `Database connected successfully on port ${dataSource.options['port']}`,
          );
          return dataSource;
        } catch (error) {
          console.log(`Error connecting to database\ncode: ${error.code}`);
          throw error;
        }
      },
    },
  ],
  test: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: Number(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_USERNAME || 'root',
            password: process.env.POSTGRES_PASSWORD || 'root',
            database: process.env.POSTGRES_TEST_DATABASE || 'test',
            entities: [
              __dirname + '/../../src/database' + '/Entities/*.entity{.ts,.js}',
            ],
            synchronize: true,
          });
          await dataSource.initialize();
          console.log(
            `Test database connected successfully on port ${dataSource.options['port']}`,
          );
          return dataSource;
        } catch (error) {
          console.log(`Error connecting to test database\ncode: ${error.code}`);
          throw error;
        }
      },
    },
  ],
};
