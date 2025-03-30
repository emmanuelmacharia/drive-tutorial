import { drizzle } from "drizzle-orm/singlestore";
import mysql from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: mysql.Connection | undefined;
};

export const client =
  globalForDb.client ??  (await mysql.createConnection({
    host: env.SINGLE_STORE_HOST,
    port: parseInt(env.SINGLE_STORE_PORT),
    user: env.SINGLE_STORE_USER,
    password: env.SINGLE_STORE_PASS,
    database: env.SINGLE_STORE_DATABASE_NAME,
    ssl: {},
    maxIdle: 0,
  }));

  if (env.NODE_ENV !== "production") globalForDb.client = client;

client.addListener("error", (err) => {
  console.error("Database error", err);
});


export const db = drizzle(client, { schema });