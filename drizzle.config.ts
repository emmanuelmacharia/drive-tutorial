import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["drive-tutorial_*"],
  dbCredentials: {
    host: env.SINGLE_STORE_HOST,
    port: parseInt(env.SINGLE_STORE_PORT),
    user: env.SINGLE_STORE_USER,
    password: env.SINGLE_STORE_PASS,
    database: env.SINGLE_STORE_DATABASE_NAME,
    ssl: {},
  },
} satisfies Config;