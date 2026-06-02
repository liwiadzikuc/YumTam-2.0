import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';
import StarRating from './StarRating';

export default function VisitCard({ visit, onPress }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {visit.img && <Image source={{ uri: visit.img }} style={styles.cardImg} />}
      <View style={styles.cardBody}>
        <View style={styles.cardHeader}>
          <Text style={styles.resName}>{visit.resName}</Text>
          {visit.audioPath && (
            <View style={styles.audioBadge}>
              <Ionicons name="mic" size={16} color={theme.colors.accent} />
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

const makeStyles = (theme) => StyleSheet.create({
  card: { borderRadius: 20, backgroundColor: theme.colors.surface, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.borderAlt },
  cardImg: { width: '100%', height: 120 },
  cardBody: { padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resName: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 10, color: theme.colors.text },
  audioBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  audioText: { color: theme.colors.accent, fontSize: 10, fontWeight: 'bold', marginLeft: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  date: { color: theme.colors.accent, fontSize: 12 },
  notes: { color: theme.colors.muted, fontSize: 14, marginBottom: 5 }
});