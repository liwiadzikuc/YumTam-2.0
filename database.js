import * as SQLite from 'expo-sqlite';
import { restaurants } from './data/restaurants';

export async function initDatabase() {
  const db = await SQLite.openDatabaseAsync('yumtam.db');
  await db.execAsync('PRAGMA foreign_keys = ON;');

  // ODKOMENTUJ TĘ LINIJĘ NA JEDNO URUCHOMIENIE
  // await db.execAsync('DROP TABLE IF EXISTS MediaItems; DROP TABLE IF EXISTS Visit_Companion; DROP TABLE IF EXISTS Companions; DROP TABLE IF EXISTS Visits; DROP TABLE IF EXISTS MenuItems; DROP TABLE IF EXISTS Restaurant_Category; DROP TABLE IF EXISTS Categories; DROP TABLE IF EXISTS Restaurants;');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        address TEXT,
        cuisine TEXT,
        description TEXT,
        image_url TEXT,
        is_favorite INTEGER DEFAULT 0,
        has_lunch INTEGER DEFAULT 0,
        has_cheap_beer INTEGER DEFAULT 0,
        rating REAL,
        reviews_count INTEGER,
        google_maps_url TEXT,
        instagram_url TEXT
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
    console.log("Ładowanie bazy z nowymi danymi (Menu, Linki, Oceny)...");
    
    for (const rest of restaurants) {
      const cheapBeer = rest.menu?.some(m => m.name.toLowerCase().includes('piwo') && m.price <= 10) ? 1 : 0;
      const hasLunch = rest.hasLunch ? 1 : 0;

      const result = await db.runAsync(
        `INSERT INTO Restaurants (name, latitude, longitude, address, cuisine, description, image_url, has_lunch, has_cheap_beer, rating, reviews_count, google_maps_url, instagram_url) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          rest.name, rest.coordinates.latitude, rest.coordinates.longitude, rest.address, 
          rest.cuisine.join(', '), rest.description, rest.image, hasLunch, cheapBeer, 
          rest.rating, rest.reviewsCount, rest.googleMapsUrl, rest.instagramUrl
        ]
      );
      
      const newRestaurantId = result.lastInsertRowId;

      if (rest.menu) {
        for (const item of rest.menu) {
          await db.runAsync(
            'INSERT INTO MenuItems (restaurant_id, name, price) VALUES (?, ?, ?)',
            [newRestaurantId, item.name, item.price]
          );
        }
      }
    }
    console.log("Baza załadowana pomyślnie!");
  }
  return db;
}

export async function getExistingTables(db) {
  const result = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
  );
  return result.map(row => row.name);
}