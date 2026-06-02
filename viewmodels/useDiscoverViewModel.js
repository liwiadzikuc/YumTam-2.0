import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';
import { useState } from 'react';

import { RestaurantModel } from '../models/RestaurantModel';
import { VisitModel } from '../models/VisitModel';

export function useDiscoverViewModel() {
  const [dbRestaurants, setDbRestaurants] = useState([]);
  const [visitedIds, setVisitedIds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCheapBeer, setIsCheapBeer] = useState(false);
  const [hasLunch, setHasLunch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isListView, setIsListView] = useState(false);

  const [rolledIds, setRolledIds] = useState([]);
  const [mapCenter, setMapCenter] = useState({ latitude: 51.1100, longitude: 17.0325 });

  const [UNIQUE_CATEGORIES, setUniqueCategories] = useState([]);

  const loadInitialData = async () => {
    try {
      const restaurants = await RestaurantModel.getAll();
      setDbRestaurants(restaurants);

      const categoriesData = await RestaurantModel.getAllCategories();
      setUniqueCategories(categoriesData.map(c => c.name));

      const visits = await VisitModel.getVisitedRestaurantIds();
      setVisitedIds(visits);

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

  const displayedRestaurants = dbRestaurants.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
      (item.rel_categories && selectedCategories.some(cat => item.rel_categories.includes(cat)));
      
    const matchesLunch = !hasLunch || item.has_lunch === 1;
    const matchesBeer = !isCheapBeer || item.has_cheap_beer === 1;
    return matchesSearch && matchesCategory && matchesLunch && matchesBeer;
  });

  const handleRandomize = (mapRef) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (displayedRestaurants.length === 0) return;

    let pool = displayedRestaurants.filter(r => !rolledIds.includes(r.id));

    if (pool.length === 0) {
      pool = displayedRestaurants.filter(r => selectedRestaurant ? r.id !== selectedRestaurant.id : true);
      setRolledIds([]); 
    }

    const unvisited = pool.filter(r => !visitedIds.includes(r.id));
    const finalPool = unvisited.length > 0 ? unvisited : pool;

    const randomPlace = finalPool[Math.floor(Math.random() * finalPool.length)];

    setRolledIds(prev => [...prev, randomPlace.id]);
    setSelectedRestaurant(randomPlace);

    mapRef.current?.animateToRegion({ 
      latitude: randomPlace.latitude, 
      longitude: randomPlace.longitude, 
      latitudeDelta: 0.005, 
      longitudeDelta: 0.005 
    }, 1000);
  };

  return {
    searchText, setSearchText, selectedCategories, setSelectedCategories,
    isCheapBeer, setIsCheapBeer, hasLunch, setHasLunch,
    UNIQUE_CATEGORIES, modalVisible, setModalVisible,
    selectedRestaurant, setSelectedRestaurant,
    displayedRestaurants, visitedIds,
    loadInitialData, handleRandomize,
    mapCenter,
    isListView, setIsListView
  };
}