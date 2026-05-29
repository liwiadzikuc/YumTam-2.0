import * as SQLite from 'expo-sqlite';

export class VisitModel {
  static async getAllWithMedia() {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    return await db.getAllAsync(`
      SELECT 
        V.*, 
        R.name as resName, 
        (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'image' LIMIT 1) as img,
        (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'audio' LIMIT 1) as audioPath,
        (SELECT GROUP_CONCAT(C.name, ', ') FROM Companions C JOIN Visit_Companion VC ON C.id = VC.companion_id WHERE VC.visit_id = V.id) as companions
      FROM Visits V 
      JOIN Restaurants R ON V.restaurant_id = R.id 
      GROUP BY V.id
    `);
  }

  static async getVisitedRestaurantIds() {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    const visits = await db.getAllAsync('SELECT DISTINCT restaurant_id FROM Visits');
    return visits.map(v => v.restaurant_id);
  }

  static async getHistoryForRestaurant(restaurantId) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    return await db.getAllAsync(`
      SELECT V.*, 
        (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'image' LIMIT 1) as img,
        (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'audio' LIMIT 1) as audioPath
      FROM Visits V 
      WHERE V.restaurant_id = ? 
      ORDER BY V.id DESC
    `, [restaurantId]);
  }

  static async getMediaForVisit(visitId) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    return await db.getAllAsync('SELECT * FROM MediaItems WHERE visit_id = ?', [visitId]);
  }

  static async create(restaurantId, rating, note, date, companionsArray = []) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    const result = await db.runAsync(
      'INSERT INTO Visits (restaurant_id, visit_date, rating, notes) VALUES (?, ?, ?, ?)',
      [restaurantId, date, rating, note]
    );
    const newVisitId = result.lastInsertRowId;

    if (companionsArray && companionsArray.length > 0) {
      for (const companionName of companionsArray) {
        let compRecord = await db.getFirstAsync('SELECT id FROM Companions WHERE name = ?', [companionName]);
        let compId;

        if (!compRecord) {
          const compInsert = await db.runAsync('INSERT INTO Companions (name) VALUES (?)', [companionName]);
          compId = compInsert.lastInsertRowId;
        } else {
          compId = compRecord.id;
        }

        await db.runAsync(
          'INSERT INTO Visit_Companion (visit_id, companion_id) VALUES (?, ?)', 
          [newVisitId, compId]
        );
      }
    }
    return newVisitId;
  }

  static async getAllCompanions() {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    return await db.getAllAsync('SELECT * FROM Companions ORDER BY name ASC');
  }

  static async getCompanionsForVisit(visitId) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    const companions = await db.getAllAsync(`
      SELECT C.name 
      FROM Companions C
      JOIN Visit_Companion VC ON C.id = VC.companion_id
      WHERE VC.visit_id = ?
    `, [visitId]);
    
    return companions.map(c => c.name).join(', ');
  }

  static async addMedia(visitId, mediaType, filePath) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    await db.runAsync(
      'INSERT INTO MediaItems (visit_id, media_type, file_path) VALUES (?, ?, ?)', 
      [visitId, mediaType, filePath]
    );
  }

  static async delete(visitId) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    await db.runAsync('DELETE FROM Visit_Companion WHERE visit_id = ?', [visitId]);
    await db.runAsync('DELETE FROM MediaItems WHERE visit_id = ?', [visitId]);
    await db.runAsync('DELETE FROM Visits WHERE id = ?', [visitId]);
  }
}