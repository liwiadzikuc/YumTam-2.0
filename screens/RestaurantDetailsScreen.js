import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [isFav, setIsFav] = useState(restaurant.is_favorite === 1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    const data = await db.getAllAsync('SELECT * FROM Visits WHERE restaurant_id = ? ORDER BY id DESC', [restaurant.id]);
    setHistory(data);
  };

  const toggleFavorite = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      const newVal = isFav ? 0 : 1;
      await db.runAsync('UPDATE Restaurants SET is_favorite = ? WHERE id = ?', [newVal, restaurant.id]);
      setIsFav(!isFav);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) { console.error(e); }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: restaurant.image_url || 'https://picsum.photos/400/200' }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.address}</Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons name={isFav ? "heart" : "heart-outline"} size={32} color="#FF4500" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{restaurant.description}</Text>

        <TouchableOpacity 
          style={styles.addBtn} 
          onPress={() => navigation.navigate('AddVisit', { restaurant })}
        >
          <Text style={styles.addBtnText}>Dodaj wspomnienie</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Twoja historia tutaj:</Text>
        {history.map(visit => (
          <View key={visit.id} style={styles.historyItem}>
            <Text style={styles.historyDate}>{visit.visit_date}</Text>
            <Text>{'⭐'.repeat(visit.rating)}</Text>
            <Text style={styles.historyNote}>{visit.notes}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold' },
  cuisine: { color: '#666', marginTop: 5 },
  description: { fontSize: 16, lineHeight: 24, color: '#444', marginBottom: 20 },
  addBtn: { backgroundColor: '#FF4500', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 30 },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  historyItem: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  historyDate: { fontWeight: 'bold', color: '#FF4500', marginBottom: 5 },
  historyNote: { color: '#666', marginTop: 5 }
});