import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const registeredUsers = pgTable('registered_users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  password: text('password'), 
});
