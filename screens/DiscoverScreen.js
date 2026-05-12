import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import * as SQLite from 'expo-sqlite';
import { useCallback, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import DiscoverHeader from '../components/DiscoverHeader';
import FilterModal from '../components/FilterModal';
import RestaurantCard from '../components/RestaurantCard';

const CENTER_LAT = 51.1100;
const CENTER_LNG = 17.0325;

export default function DiscoverScreen({ navigation }) {
  const [dbRestaurants, setDbRestaurants] = useState([]);
  const [visitedIds, setVisitedIds] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const mapRef = useRef(null);

  const loadMarkers = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      const restaurants = await db.getAllAsync('SELECT * FROM Restaurants');
      setDbRestaurants(restaurants);

      const visits = await db.getAllAsync('SELECT DISTINCT restaurant_id FROM Visits');
      setVisitedIds(visits.map(v => v.restaurant_id));
    } catch (error) {
      console.error("Błąd ładowania mapy:", error);
    }
  };

  useFocusEffect(useCallback(() => { loadMarkers(); }, []));

  const displayedRestaurants = dbRestaurants.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || 
                           (item.cuisine && selectedCategories.some(cat => item.cuisine.includes(cat)));
    return matchesSearch && matchesCategory;
  });

  const handleRandomize = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (displayedRestaurants.length === 0) return;

    const unvisited = displayedRestaurants.filter(r => !visitedIds.includes(r.id));
    const pool = unvisited.length > 0 ? unvisited : displayedRestaurants;
    const randomPlace = pool[Math.floor(Math.random() * pool.length)];

    setSelectedRestaurant(randomPlace);
    mapRef.current?.animateToRegion({
      latitude: randomPlace.latitude,
      longitude: randomPlace.longitude,
      latitudeDelta: 0.005, longitudeDelta: 0.005,
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: CENTER_LAT, longitude: CENTER_LNG,
          latitudeDelta: 0.02, longitudeDelta: 0.02,
        }}
        onPress={() => { setSelectedRestaurant(null); Keyboard.dismiss(); }}
      >
        {displayedRestaurants.map((marker) => {
          const isVisited = visitedIds.includes(marker.id);
          const isFavorite = marker.is_favorite === 1;

          let pinColor = "#FF5722"; 
          if (isVisited) pinColor = "#4CAF50"; 
          else if (isFavorite) pinColor = "#2196F3"; 

          return (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              onPress={(e) => { e.stopPropagation(); setSelectedRestaurant(marker); }}
              pinColor={pinColor}
            />
          );
        })}
      </MapView>

      <DiscoverHeader 
        searchText={searchText} setSearchText={setSearchText}
        onOpenFilters={() => setModalVisible(true)}
        activeFiltersCount={selectedCategories.length}
      />

      <TouchableOpacity style={styles.diceButton} onPress={handleRandomize}>
        <Ionicons name="dice-outline" size={32} color="white" />
      </TouchableOpacity>

      <FilterModal 
        visible={modalVisible} onClose={() => setModalVisible(false)}
        selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
        onReset={() => setSelectedCategories([])}
      />

      <RestaurantCard 
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        onDetails={() => {
          const res = selectedRestaurant;
          setSelectedRestaurant(null);
          navigation.navigate('RestaurantDetails', { restaurant: res });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  diceButton: {
    position: 'absolute', top: 170, right: 20,
    backgroundColor: '#FF4500', width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center', elevation: 8
  }
});