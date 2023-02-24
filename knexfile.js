// Update with your config settings.


const { DB_USER = '', DB_PASSWORD = '', DB_HOST = '', DB_NAME = '', DB_PORT = '' } = process.env;

const DEFAULT_CONNECTION = {
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: 'utf8',
  },
  migrations: {
    directory: `${__dirname}/migrations`,
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: `${__dirname}/seeds`,
    tableName: 'knex_seeds',
  },
  pool: {
    min: 0,
    max: 10,
    createTimeoutMillis: 30000, // 30 secs
    acquireTimeoutMillis: 60000, // 60 secs
    idleTimeoutMillis: 30000, // 30 secs
    reapIntervalMillis: 1000, // 1 secs
    createRetryIntervalMillis: 100, // 0.1 secs
    afterCreate: (conn, done) => {
      console.debug('DB connection created');
      conn.query('SET timezone="UTC";', (err) => {
        if (err) {
          console.error(err);
        }
        done(err, conn);
      });
      done(null, conn);
    },
  },
}


const knexConnections = {
  localTest: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      },
    },
  },

  localDevelopment: {
    client: 'pg',
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      charset: 'utf8',
      port: DB_PORT,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
    pool: {
      afterCreate: (conn, done) => {
        console.debug('DB connection created');
        conn.query('SET timezone="UTC";', (err) => {
          if (err) {
            console.error(err);
          }
          done(err, conn);
        });
      },
    },
  },

  testInMemory: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`
    }
  },

  DEV: {
    ...DEFAULT_CONNECTION,
  },

  TEST: {
    ...DEFAULT_CONNECTION,
  },

  UAT: {
    ...DEFAULT_CONNECTION,
  },

  PROD: {
    ...DEFAULT_CONNECTION,
  },
};

module.exports = knexConnections;