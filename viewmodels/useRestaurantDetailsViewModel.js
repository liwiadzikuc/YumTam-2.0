import * as Haptics from 'expo-haptics';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

export function useRestaurantDetailsViewModel(restaurant) {
  const [isFav, setIsFav] = useState(restaurant.is_favorite === 1);
  const [history, setHistory] = useState([]);
  const [menu, setMenu] = useState([]);

  const loadData = async () => {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    
    const historyData = await db.getAllAsync(`
      SELECT V.*, 
        (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'image' LIMIT 1) as img,
        (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'audio' LIMIT 1) as audioPath
      FROM Visits V 
      WHERE V.restaurant_id = ? 
      ORDER BY V.id DESC
    `, [restaurant.id]);

    const enrichedHistory = historyData.map(v => ({ ...v, resName: restaurant.name }));
    setHistory(enrichedHistory);

    const menuData = await db.getAllAsync('SELECT * FROM MenuItems WHERE restaurant_id = ?', [restaurant.id]);
    setMenu(menuData);
  };

  // Automatycznie ładujemy dane po wejściu na ekran
  useEffect(() => {
    loadData();
  }, []);

  // BRAKUJĄCA FUNKCJA - Dodawanie do ulubionych (serduszko)
  const toggleFavorite = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      const newVal = isFav ? 0 : 1;
      await db.runAsync('UPDATE Restaurants SET is_favorite = ? WHERE id = ?', [newVal, restaurant.id]);
      setIsFav(!isFav);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      console.error(e);
    }
  };

  const openLink = (url) => {
    if (url) Linking.openURL(url);
  };

  return { isFav, history, menu, toggleFavorite, openLink };
}