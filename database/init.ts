import { runMigrations } from "./migrations";

export async function initDatabase(db: any) {
  await runMigrations(db);
}
