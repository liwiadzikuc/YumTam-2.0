import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { categoriesTable, menuItemsTable, restaurantCategoryTable, restaurantsTable, visitsTable } from '../schema';

const getDb = async () => {
  const sqliteDb = await SQLite.openDatabaseAsync('yumtam.db');
  return drizzle(sqliteDb);
};

export class RestaurantModel {
  static async getAll() {
    const db = await getDb();
    return await db.select({
        ...restaurantsTable,
        rel_categories: sql`GROUP_CONCAT(${categoriesTable.name}, ', ')`
      })
      .from(restaurantsTable)
      .leftJoin(restaurantCategoryTable, eq(restaurantsTable.id, restaurantCategoryTable.restaurant_id))
      .leftJoin(categoriesTable, eq(restaurantCategoryTable.category_id, categoriesTable.id))
      .groupBy(restaurantsTable.id);
  }

  static async getAllCategories() {
    const db = await getDb();
    return await db.select({ name: categoriesTable.name }).from(categoriesTable).orderBy(categoriesTable.name);
  }

  static async getMenu(restaurantId) {
    const db = await getDb();
    return await db.select().from(menuItemsTable).where(eq(menuItemsTable.restaurant_id, restaurantId));
  }

  static async toggleFavorite(restaurantId, isCurrentlyFav) {
    const db = await getDb();
    const newVal = isCurrentlyFav ? 0 : 1;
    await db.update(restaurantsTable).set({ is_favorite: newVal }).where(eq(restaurantsTable.id, restaurantId));
  }

  static async getStats() {
    const db = await getDb();
    const totalResResult = await db.select({ count: sql`COUNT(*)` }).from(restaurantsTable);
    const discResResult = await db.select({ count: sql`COUNT(DISTINCT ${visitsTable.restaurant_id})` }).from(visitsTable);
    
    const totalRes = totalResResult[0].count;
    const discRes = discResResult[0].count;
    const percent = totalRes > 0 ? Math.round((discRes / totalRes) * 100) : 0;
    
    return { total: totalRes, discovered: discRes, percent };
  }
}