import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function RestaurantCard({ restaurant, onClose, onDetails }) {
  if (!restaurant) return null;

  const cuisineText = Array.isArray(restaurant.cuisine) 
    ? restaurant.cuisine.join(', ') 
    : restaurant.cuisine;

  return (
    <View style={styles.container}>
      
      <Image source={{ uri: restaurant.image_url || 'https://picsum.photos/400/200' }} style={styles.image} />

      <View style={styles.content}>
        
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{restaurant.name}</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Ionicons name="close-circle" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.rating}>★ {restaurant.rating}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.cuisine} numberOfLines={1}>{cuisineText}</Text>
        </View>

        <Text style={styles.address} numberOfLines={1}>{restaurant.address}</Text>

        <TouchableOpacity style={styles.button} onPress={onDetails}>
          <Text style={styles.buttonText}>Szczegóły</Text>
          <Ionicons name="arrow-forward" size={16} color="white" style={{marginLeft: 5}} />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100, 
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    height: 130,
  },
  image: {
    width: 110,
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontWeight: 'bold',
    color: '#FF4500',
  },
  dot: {
    marginHorizontal: 5,
    color: '#ccc',
  },
  cuisine: {
    color: 'gray',
    fontSize: 13,
    flex: 1,
  },
  address: {
    color: '#777',
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});