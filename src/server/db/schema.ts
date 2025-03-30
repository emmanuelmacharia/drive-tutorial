// import { mysqlTable, int, varchar, index, mysqlTableCreator } from 'drizzle-orm/mysql-core';

// export const createTable = mysqlTableCreator((name) => `drive-tutorial_${name}`);

// export const files = mysqlTable('files_table', {
//   id: int('id').primaryKey().autoincrement(),
//   name: varchar('name', { length: 255 }),
//   parent: int('parent').notNull(),
//   size: varchar('size', { length: 255 }).notNull(),
//   url: varchar('url', { length: 255 }).notNull()
// },  (table) => {
//   return [index("parent_index").on(table.parent)];
// }
// );

// export const folders = mysqlTable('folders_table', {
//   id: int('id').primaryKey().autoincrement(),
//   name: varchar('name', { length: 255 }),
//   parent: int('parent')
// },  (table) => {
//   return [index("parent_index").on(table.parent)];
// });

import {
  int,
  text,
  index,
  singlestoreTableCreator,
  bigint,
} from "drizzle-orm/singlestore-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = singlestoreTableCreator(
  (name) => `drive-tutorial_${name}`,
);

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    size: int("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export type DB_FileType = typeof files_table.$inferSelect;

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (t) => {
    return [index("parent_index").on(t.parent)];
  },
);

export type DB_FolderType = typeof folders_table.$inferSelect;