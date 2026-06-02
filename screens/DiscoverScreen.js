import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { FlatList, Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import DiscoverHeader from '../components/DiscoverHeader';
import FilterModal from '../components/FilterModal';
import RestaurantCard from '../components/RestaurantCard';

import { useDiscoverViewModel } from '../viewmodels/useDiscoverViewModel';

const CENTER_LAT = 51.1100;
const CENTER_LNG = 17.0325;

export default function DiscoverScreen({ navigation }) {
  const mapRef = useRef(null);
  
  const {
    searchText, setSearchText, selectedCategories, setSelectedCategories,
    isCheapBeer, setIsCheapBeer, hasLunch, setHasLunch, UNIQUE_CATEGORIES,
    modalVisible, setModalVisible, selectedRestaurant, setSelectedRestaurant,
    displayedRestaurants, visitedIds, loadInitialData, handleRandomize,
    mapCenter, isListView, setIsListView
  } = useDiscoverViewModel();

  useFocusEffect(useCallback(() => { loadInitialData(); }, []));

  const handleRegionChangeComplete = (region) => {
    const latDiff = Math.abs(region.latitude - mapCenter.latitude);
    const lngDiff = Math.abs(region.longitude - mapCenter.longitude);
    if (latDiff > 0.1 || lngDiff > 0.1) {
      mapRef.current?.animateToRegion({ latitude: mapCenter.latitude, longitude: mapCenter.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 1000); 
    }
  };

  return (
    <View style={styles.container}>

      {isListView ? (
        <FlatList
          data={displayedRestaurants}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 160, paddingBottom: 40, paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.listCard}
              activeOpacity={0.8}
              onPress={() => {
                Keyboard.dismiss();
                navigation.navigate('RestaurantDetails', { restaurant: item });
              }}
            >
              <Image source={{ uri: item.image_url || 'https://picsum.photos/400/200' }} style={styles.listCardImage} />
              <View style={styles.listCardContent}>
                <Text style={styles.listCardTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.listCardRating}>⭐ {item.rating} • {Array.isArray(item.cuisine) ? item.cuisine.join(', ') : item.cuisine}</Text>
                <Text style={styles.listCardAddress} numberOfLines={2}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{ latitude: mapCenter.latitude, longitude: mapCenter.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
          showsUserLocation={true} 
          onRegionChangeComplete={handleRegionChangeComplete}
          onPress={() => { setSelectedRestaurant(null); Keyboard.dismiss(); }}
        >
          {displayedRestaurants.map((marker) => {
            const isVisited = visitedIds.includes(marker.id);
            const isFavorite = marker.is_favorite === 1;
            
            let pinColor = isVisited ? "#4CAF50" : (isFavorite ? "#2196F3" : "#FF5722"); 
            
            return (
              <Marker 
                key={`marker-${marker.id}`} 
                pinColor={pinColor} 
                coordinate={{ 
                  latitude: parseFloat(marker.latitude), 
                  longitude: parseFloat(marker.longitude) 
                }} 
                onPress={(e) => { 
                  e.stopPropagation(); 
                  setSelectedRestaurant(marker); 
                  Keyboard.dismiss(); 
                  
                  mapRef.current?.animateToRegion({
                    latitude: parseFloat(marker.latitude),
                    longitude: parseFloat(marker.longitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                  }, 500);
                }} 
              />
            );
          })}
        </MapView>
      )}

      <DiscoverHeader 
        searchText={searchText} 
        setSearchText={setSearchText} 
        onOpenFilters={() => setModalVisible(true)} 
        activeFiltersCount={selectedCategories.length} 
        displayedRestaurants={displayedRestaurants}
        onSelectRestaurant={(item) => {
          Keyboard.dismiss(); 
          setSearchText('');  
          setSelectedRestaurant(item); 
          
          if (!isListView) {
            mapRef.current?.animateToRegion({
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }, 1000);
          }
        }}
        isListView={isListView}
        onToggleView={() => setIsListView(!isListView)}
      />

      {!isListView && (
        <TouchableOpacity style={styles.diceButton} onPress={() => handleRandomize(mapRef)}>
          <Ionicons name="dice-outline" size={32} color="white" />
        </TouchableOpacity>
      )}

      <FilterModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        availableCategories={UNIQUE_CATEGORIES}
        selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
        isCheapBeer={isCheapBeer} setIsCheapBeer={setIsCheapBeer}
        hasLunch={hasLunch} setHasLunch={setHasLunch}
        onReset={() => {
          setSelectedCategories([]);
          setIsCheapBeer(false);
          setHasLunch(false);
        }}
      />
      
      {!isListView && (
        <RestaurantCard 
          restaurant={selectedRestaurant} 
          onClose={() => setSelectedRestaurant(null)} 
          onDetails={() => { 
            const res = selectedRestaurant; 
            setSelectedRestaurant(null); 
            navigation.navigate('RestaurantDetails', { restaurant: res }); 
          }} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  map: { width: '100%', height: '100%' },
  diceButton: {
    position: 'absolute', top: 170, right: 20,
    backgroundColor: '#FF4500', width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center', elevation: 8
  },
  
  listCard: {
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    marginBottom: 10,
    padding: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 4
  },
  listCardImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 10,
    backgroundColor: '#eee' 
  },
  listCardContent: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: 'center' 
  },
  listCardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 5 
  },
  listCardRating: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#FF4500', 
    marginBottom: 5 
  },
  listCardAddress: { 
    fontSize: 12, 
    color: '#666' 
  }
});