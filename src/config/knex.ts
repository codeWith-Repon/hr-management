import knex, { Knex } from 'knex';
import config from '.';

const dbConfig: Knex.Config = {
    client: 'pg',
    connection: {
        connectionString: config.dbUrl,
        ssl: { rejectUnauthorized: false }
    },
    pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
    },
    migrations: {
        directory: './src/app/database/migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './src/app/database/seeds',
        extension: 'ts',
    },
    debug: process.env.NODE_ENV === 'development',
};

let knexInstance: Knex | null = null;

export const getKnex = (): Knex => {
    if (!knexInstance) {
        knexInstance = knex(dbConfig);
        console.log('🔌 Knex PostgreSQL connection initialized');
    }
    return knexInstance;
};


export const knexConfig = dbConfig;