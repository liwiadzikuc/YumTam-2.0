import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StarRating from './StarRating';

export default function VisitCard({ visit, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {visit.img && <Image source={{ uri: visit.img }} style={styles.cardImg} />}
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.resName}>{visit.resName}</Text>
          {visit.audioPath && (
            <View style={styles.audioBadge}>
              <Ionicons name="mic" size={16} color="#FF4500" />
              <Text style={styles.audioText}>Notatka</Text>
            </View>
          )}
        </View>
        
        <View style={styles.ratingRow}>
          <Text style={styles.date}>{visit.visit_date} • </Text>
          <StarRating rating={visit.rating} size={14} />
        </View>

        {visit.notes ? <Text style={styles.notes} numberOfLines={2}>{visit.notes}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 20, backgroundColor: '#fff', marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
  cardImg: { width: '100%', height: 120 },
  cardBody: { padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resName: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 10 },
  audioBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff0eb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  audioText: { color: '#FF4500', fontSize: 10, fontWeight: 'bold', marginLeft: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  date: { color: '#FF4500', fontSize: 12 },
  notes: { color: '#666', fontSize: 14, marginBottom: 5 }
});