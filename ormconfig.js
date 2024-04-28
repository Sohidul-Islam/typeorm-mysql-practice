/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv from "dotenv";
dotenv.config();

const Config = {
  type: "mysql",
  host: process.env.MYSQLHOST,
  port: 3306,
  username: process.env.MYSQLUSERNAME,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: ["src/api/entities/*{.ts,.js,.ejs}"],
  cli: {
    entitiesDir: "src/api/entities",
  },
};

const distConfig = {
  type: "mysql",
  host: process.env.MYSQLHOST,
  port: 3306,
  username: process.env.MYSQLUSERNAME,
  password: process.env.MYSQLPASSWORD,
  database: process.env.DATABASE,
  synchronize: process.env.DBSYNC,
  logging: process.env.LOGGING,
  entities: ["dist/api/entities/*{.ts,.js}"],
  cli: {
    entitiesDir: "dist/api/entities",
  },
};

module.exports = process.env.NODE_ENV === "production" ? distConfig : Config;
