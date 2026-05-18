import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location'; // NOWY IMPORT
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

export function useDiscoverViewModel() {
  const [dbRestaurants, setDbRestaurants] = useState([]);
  const [visitedIds, setVisitedIds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCheapBeer, setIsCheapBeer] = useState(false);
  const [hasLunch, setHasLunch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [mapCenter, setMapCenter] = useState({ latitude: 51.1100, longitude: 17.0325 });

  const loadInitialData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      const restaurants = await db.getAllAsync('SELECT * FROM Restaurants');
      setDbRestaurants(restaurants);

      const visits = await db.getAllAsync('SELECT DISTINCT restaurant_id FROM Visits');
      setVisitedIds(visits.map(v => v.restaurant_id));

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setMapCenter({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (error) { 
      console.error("Błąd ładowania danych:", error); 
    }
  };

  const allCategories = dbRestaurants.flatMap(r => r.cuisine ? r.cuisine.split(', ') : []);
  const UNIQUE_CATEGORIES = [...new Set(allCategories)].sort();

  const displayedRestaurants = dbRestaurants.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || (item.cuisine && selectedCategories.some(cat => item.cuisine.includes(cat)));
    const matchesLunch = !hasLunch || item.has_lunch === 1;
    const matchesBeer = !isCheapBeer || item.has_cheap_beer === 1;
    return matchesSearch && matchesCategory && matchesLunch && matchesBeer;
  });

  const handleRandomize = (mapRef) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (displayedRestaurants.length === 0) return;
    const unvisited = displayedRestaurants.filter(r => !visitedIds.includes(r.id));
    const pool = unvisited.length > 0 ? unvisited : displayedRestaurants;
    const randomPlace = pool[Math.floor(Math.random() * pool.length)];
    setSelectedRestaurant(randomPlace);
    mapRef.current?.animateToRegion({ latitude: randomPlace.latitude, longitude: randomPlace.longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
  };

  return {
    searchText, setSearchText, selectedCategories, setSelectedCategories,
    isCheapBeer, setIsCheapBeer, hasLunch, setHasLunch,
    UNIQUE_CATEGORIES, modalVisible, setModalVisible,
    selectedRestaurant, setSelectedRestaurant,
    displayedRestaurants, visitedIds,
    loadInitialData, handleRandomize,
    mapCenter 
  };
}