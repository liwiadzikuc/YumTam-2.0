import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useJournalViewModel } from '../viewmodels/useJournalViewModel';

import StatsCard from '../components/StatsCard';
import VisitCard from '../components/VisitCard';

export default function JournalScreen({ navigation }) {
  const { stats, loadData, sortBy, setSortBy, displayedVisits } = useJournalViewModel();

  useFocusEffect(useCallback(() => { loadData(); }, []));

  return (
    <View style={styles.container}>
        
      <StatsCard discovered={stats.discovered} total={stats.total} percent={stats.percent} />

      <View style={styles.sortRow}>
        <TouchableOpacity style={[styles.sortChip, sortBy === 'newest' && styles.activeChip]} onPress={() => setSortBy('newest')}>
          <Text style={[styles.sortText, sortBy === 'newest' && styles.activeText]}>Najnowsze</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortChip, sortBy === 'rating' && styles.activeChip]} onPress={() => setSortBy('rating')}>
          <Text style={[styles.sortText, sortBy === 'rating' && styles.activeText]}>Najlepsze</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortChip, sortBy === 'alpha' && styles.activeChip]} onPress={() => setSortBy('alpha')}>
          <Text style={[styles.sortText, sortBy === 'alpha' && styles.activeText]}>A-Z</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedVisits}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Brak wizyt w dzienniku.</Text>}
        renderItem={({ item }) => (
          <VisitCard 
            visit={item} 
            onPress={() => navigation.navigate('VisitDetails', { visit: item, restaurantName: item.resName })} 
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingTop: 60 },
  sortRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  sortChip: { flex: 1, backgroundColor: '#e0e0e0', paddingVertical: 10, borderRadius: 20, alignItems: 'center', marginHorizontal: 4 },
  activeChip: { backgroundColor: '#333' },
  sortText: { fontSize: 13, fontWeight: '600', color: '#555' },
  activeText: { color: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 20, color: 'gray' }
});