import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const restaurantsTable = sqliteTable('Restaurants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  address: text('address'),
  description: text('description'),
  image_url: text('image_url'),
  video_url: text('video_url'),
  is_favorite: integer('is_favorite').default(0),
  has_lunch: integer('has_lunch').default(0),
  has_cheap_beer: integer('has_cheap_beer').default(0),
  rating: real('rating'),
  reviews_count: integer('reviews_count'),
  google_maps_url: text('google_maps_url'),
  instagram_url: text('instagram_url')
});

export const categoriesTable = sqliteTable('Categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull()
});

export const restaurantCategoryTable = sqliteTable('Restaurant_Category', {
  restaurant_id: integer('restaurant_id').references(() => restaurantsTable.id, { onDelete: 'cascade' }),
  category_id: integer('category_id').references(() => categoriesTable.id, { onDelete: 'cascade' })
});

export const menuItemsTable = sqliteTable('MenuItems', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  restaurant_id: integer('restaurant_id').references(() => restaurantsTable.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  price: real('price')
});

export const visitsTable = sqliteTable('Visits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  restaurant_id: integer('restaurant_id').references(() => restaurantsTable.id, { onDelete: 'cascade' }),
  visit_date: text('visit_date'),
  rating: integer('rating'),
  notes: text('notes')
});

export const companionsTable = sqliteTable('Companions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull()
});

export const visitCompanionTable = sqliteTable('Visit_Companion', {
  visit_id: integer('visit_id').references(() => visitsTable.id, { onDelete: 'cascade' }),
  companion_id: integer('companion_id').references(() => companionsTable.id, { onDelete: 'cascade' })
});

export const mediaItemsTable = sqliteTable('MediaItems', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  visit_id: integer('visit_id').references(() => visitsTable.id, { onDelete: 'cascade' }),
  media_type: text('media_type'),
  file_path: text('file_path').notNull()
});