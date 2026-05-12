import * as SQLite from 'expo-sqlite';

export async function initDatabase() {
  const db = await SQLite.openDatabaseAsync('yumtam.db');
  await db.execAsync('PRAGMA foreign_keys = ON;');

  // Jeśli chcesz wymusić przebudowę bazy, odkomentuj poniższą linię:
  // await db.execAsync('DROP TABLE IF EXISTS MediaItems; DROP TABLE IF EXISTS Visit_Companion; DROP TABLE IF EXISTS Companions; DROP TABLE IF EXISTS Visits; DROP TABLE IF EXISTS MenuItems; DROP TABLE IF EXISTS Restaurant_Category; DROP TABLE IF EXISTS Categories; DROP TABLE IF EXISTS Restaurants;');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        address TEXT,      -- Dodane dla widoku szczegółów
        cuisine TEXT,      -- Dodane dla filtrowania
        description TEXT,
        image_url TEXT,
        is_favorite INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS Categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Restaurant_Category (
        restaurant_id INTEGER,
        category_id INTEGER,
        FOREIGN KEY(restaurant_id) REFERENCES Restaurants(id),
        FOREIGN KEY(category_id) REFERENCES Categories(id),
        PRIMARY KEY(restaurant_id, category_id)
    );

    CREATE TABLE IF NOT EXISTS MenuItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_id INTEGER,
        name TEXT NOT NULL,
        price REAL,
        FOREIGN KEY(restaurant_id) REFERENCES Restaurants(id)
    );

    CREATE TABLE IF NOT EXISTS Visits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        restaurant_id INTEGER,
        visit_date TEXT,
        rating INTEGER,
        notes TEXT,
        FOREIGN KEY(restaurant_id) REFERENCES Restaurants(id)
    );

    CREATE TABLE IF NOT EXISTS Companions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Visit_Companion (
        visit_id INTEGER,
        companion_id INTEGER,
        FOREIGN KEY(visit_id) REFERENCES Visits(id),
        FOREIGN KEY(companion_id) REFERENCES Companions(id),
        PRIMARY KEY(visit_id, companion_id)
    );

    CREATE TABLE IF NOT EXISTS MediaItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        visit_id INTEGER,
        media_type TEXT,
        file_path TEXT NOT NULL,
        FOREIGN KEY(visit_id) REFERENCES Visits(id) ON DELETE CASCADE 
    );
  `);

  const check = await db.getFirstAsync('SELECT COUNT(*) as count FROM Restaurants');
  if (check.count === 0) {
    console.log("Inicjalizacja restauracji w rozbudowanej bazie...");
    await db.runAsync(
      `INSERT INTO Restaurants (name, latitude, longitude, address, cuisine, description) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['Sushi Corner', 51.1105, 17.0312, 'ul. Kuźnicza 42', 'Japanese', 'Kultowe sushi.']
    );
    await db.runAsync(
      `INSERT INTO Restaurants (name, latitude, longitude, address, cuisine, description) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      ['Pueblo', 51.1095, 17.0325, 'ul. Włodkowica 2', 'Mexican', 'Tacos i margarita.']
    );
  }

  return db;
}

export async function getExistingTables(db) {
  const result = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
  );
  return result.map(row => row.name);
}