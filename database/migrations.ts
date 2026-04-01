export const runMigrations = async (db: any) => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS bikes (
    id INTEGER PRIMARY KEY NOT NULL, 
    brand TEXT NOT NULL, 
    model TEXT NOT NULL, 
    year INTEGER NOT NULL, 
    currentKm INTEGER DEFAULT 0
  );

    CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY NOT NULL, 
    changeEvery INTEGER NOT NULL, 
    title TEXT NOT NULL, 
    icon TEXT NOT NULL
  );

    CREATE TABLE IF NOT EXISTS service_logs (
    id INTEGER PRIMARY KEY NOT NULL, 
    bikeId INTEGER NOT NULL, 
    serviceId INTEGER NOT NULL,
    mileage INTEGER NOT NULL, 
    date TEXT NOT NULL, 
    cost INTEGER DEFAULT 0, 
    note TEXT,
    FOREIGN KEY (bikeId) REFERENCES bikes(id)
    FOREIGN KEY (serviceId) REFERENCES services(id)
  );
`);
};
