import * as SQLite from 'expo-sqlite';

export class RestaurantModel {
  static async getAll() {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    return await db.getAllAsync(`
      SELECT 
        R.*,
        (SELECT GROUP_CONCAT(C.name, ', ') 
         FROM Categories C 
         JOIN Restaurant_Category RC ON C.id = RC.category_id 
         WHERE RC.restaurant_id = R.id) as rel_categories
      FROM Restaurants R
    `);
  }

  static async getAllCategories() {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    return await db.getAllAsync('SELECT name FROM Categories ORDER BY name ASC');
  }

  static async getMenu(restaurantId) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    return await db.getAllAsync('SELECT * FROM MenuItems WHERE restaurant_id = ?', [restaurantId]);
  }

  static async toggleFavorite(restaurantId, isCurrentlyFav) {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    const newVal = isCurrentlyFav ? 0 : 1;
    await db.runAsync('UPDATE Restaurants SET is_favorite = ? WHERE id = ?', [newVal, restaurantId]);
  }

  static async getStats() {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    const totalRes = await db.getFirstAsync('SELECT COUNT(*) as c FROM Restaurants');
    const discRes = await db.getFirstAsync('SELECT COUNT(DISTINCT restaurant_id) as c FROM Visits');
    const percent = totalRes.c > 0 ? Math.round((discRes.c / totalRes.c) * 100) : 0;
    
    return { total: totalRes.c, discovered: discRes.c, percent };
  }
}