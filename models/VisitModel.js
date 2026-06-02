import { desc, eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { companionsTable, mediaItemsTable, restaurantsTable, visitCompanionTable, visitsTable } from '../schema';

const getDb = async () => {
  const sqliteDb = await SQLite.openDatabaseAsync('yumtam.db');
  return drizzle(sqliteDb);
};

export class VisitModel {
  static async getAllWithMedia() {
    const db = await getDb();
    return await db.select({
      id: visitsTable.id,
      restaurant_id: visitsTable.restaurant_id,
      visit_date: visitsTable.visit_date,
      rating: visitsTable.rating,
      notes: visitsTable.notes,
      resName: restaurantsTable.name,
      img: sql`(SELECT file_path FROM MediaItems WHERE visit_id = Visits.id AND media_type = 'image' LIMIT 1)`,
      audioPath: sql`(SELECT file_path FROM MediaItems WHERE visit_id = Visits.id AND media_type = 'audio' LIMIT 1)`,
      companions: sql`(SELECT GROUP_CONCAT(C.name, ', ') FROM Companions C JOIN Visit_Companion VC ON C.id = VC.companion_id WHERE VC.visit_id = Visits.id)`
    })
    .from(visitsTable)
    .innerJoin(restaurantsTable, eq(visitsTable.restaurant_id, restaurantsTable.id))
    .groupBy(visitsTable.id);
  }

  static async getVisitedRestaurantIds() {
    const db = await getDb();
    const visits = await db.select({ restaurant_id: visitsTable.restaurant_id }).from(visitsTable).groupBy(visitsTable.restaurant_id);
    return visits.map(v => v.restaurant_id);
  }

  static async getHistoryForRestaurant(restaurantId) {
    const db = await getDb();
    return await db.select({
      ...visitsTable,
      img: sql`(SELECT file_path FROM MediaItems WHERE visit_id = Visits.id AND media_type = 'image' LIMIT 1)`,
      audioPath: sql`(SELECT file_path FROM MediaItems WHERE visit_id = Visits.id AND media_type = 'audio' LIMIT 1)`
    })
    .from(visitsTable)
    .where(eq(visitsTable.restaurant_id, restaurantId))
    .orderBy(desc(visitsTable.id));
  }

  static async getMediaForVisit(visitId) {
    const db = await getDb();
    return await db.select().from(mediaItemsTable).where(eq(mediaItemsTable.visit_id, visitId));
  }

  static async create(restaurantId, rating, note, date, companionsArray = []) {
    const db = await getDb();
    
    const result = await db.insert(visitsTable).values({
      restaurant_id: restaurantId,
      visit_date: date,
      rating: rating,
      notes: note
    });
    const newVisitId = result.lastInsertRowId;

    if (companionsArray && companionsArray.length > 0) {
      for (const companionName of companionsArray) {
        let compRecord = await db.select().from(companionsTable).where(eq(companionsTable.name, companionName));
        let compId;

        if (compRecord.length === 0) {
          const compInsert = await db.insert(companionsTable).values({ name: companionName });
          compId = compInsert.lastInsertRowId;
        } else {
          compId = compRecord[0].id;
        }

        await db.insert(visitCompanionTable).values({ visit_id: newVisitId, companion_id: compId });
      }
    }
    return newVisitId;
  }

  static async getAllCompanions() {
    const db = await getDb();
    return await db.select().from(companionsTable).orderBy(companionsTable.name);
  }

  static async getCompanionsForVisit(visitId) {
    const db = await getDb();
    const companions = await db.select({ name: companionsTable.name })
      .from(companionsTable)
      .innerJoin(visitCompanionTable, eq(companionsTable.id, visitCompanionTable.companion_id))
      .where(eq(visitCompanionTable.visit_id, visitId));
    return companions.map(c => c.name).join(', ');
  }

  static async addMedia(visitId, mediaType, filePath) {
    const db = await getDb();
    await db.insert(mediaItemsTable).values({ visit_id: visitId, media_type: mediaType, file_path: filePath });
  }

  static async delete(visitId) {
    const db = await getDb();
    await db.delete(visitsTable).where(eq(visitsTable.id, visitId));
  }
}