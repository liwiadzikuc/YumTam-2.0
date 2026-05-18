import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

export function useJournalViewModel() {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({ total: 0, discovered: 0, percent: 0 });
  
  // NOWE: Zmienna sterująca sortowaniem (domyślnie: od najnowszych)
  const [sortBy, setSortBy] = useState('newest'); // Możliwe wartości: 'newest', 'rating', 'alpha'

  const loadData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      
      // Wyciągamy wizyty bez wymuszania ORDER BY w SQL, posortujemy je za chwilę dynamicznie w kodzie
      const vData = await db.getAllAsync(`
        SELECT 
          V.*, 
          R.name as resName, 
          (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'image' LIMIT 1) as img,
          (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'audio' LIMIT 1) as audioPath
        FROM Visits V 
        JOIN Restaurants R ON V.restaurant_id = R.id 
        GROUP BY V.id
      `);
      setVisits(vData);

      const totalRes = await db.getFirstAsync('SELECT COUNT(*) as c FROM Restaurants');
      const discRes = await db.getFirstAsync('SELECT COUNT(DISTINCT restaurant_id) as c FROM Visits');
      const p = totalRes.c > 0 ? Math.round((discRes.c / totalRes.c) * 100) : 0;
      setStats({ total: totalRes.c, discovered: discRes.c, percent: p });
    } catch (error) { console.error(error); }
  };

  // NOWA LOGIKA: Dynamiczne sortowanie danych
  const displayedVisits = [...visits].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id; // Najwyższe ID = najnowsze
    if (sortBy === 'rating') return b.rating - a.rating; // Najwięcej gwiazdek na górze
    if (sortBy === 'alpha') return a.resName.localeCompare(b.resName); // Alfabetycznie po nazwie A-Z
    return 0;
  });

  return {
    stats, loadData,
    sortBy, setSortBy, // Eksportujemy sortowanie do ekranu
    displayedVisits
  };
}