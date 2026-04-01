import { db } from "./db";
import { runMigrations } from "./migrations";

export async function initDatabase() {
  await runMigrations(db);
}
