import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../theme';
import { useJournalViewModel } from '../viewmodels/useJournalViewModel';

import StatsCard from '../components/StatsCard';
import VisitCard from '../components/VisitCard';

export default function JournalScreen({ navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { 
    stats, loadData, sortBy, setSortBy, displayedVisits, 
    availableCompanions, selectedCompanionsFilter, toggleCompanionFilter 
  } = useJournalViewModel();

  const [isFilterVisible, setIsFilterVisible] = useState(false);

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

      {availableCompanions.length > 0 && (
        <View style={styles.filterSection}>
          <TouchableOpacity 
            style={styles.filterToggleBtn} 
            activeOpacity={0.7}
            onPress={() => setIsFilterVisible(!isFilterVisible)}
          >
            <Ionicons 
              name="people" 
              size={20} 
              color={selectedCompanionsFilter.length > 0 ? theme.colors.accent : theme.colors.muted} 
            />
            <Text style={[styles.filterTitle, selectedCompanionsFilter.length > 0 && { color: theme.colors.accent }]}>
              {selectedCompanionsFilter.length > 0 
                ? `Aktywne filtry znajomych: ${selectedCompanionsFilter.length}` 
                : 'Filtruj wg znajomych'}
            </Text>
            <Ionicons 
              name={isFilterVisible ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={theme.colors.muted} 
              style={{ marginLeft: 'auto' }} 
            />
          </TouchableOpacity>

          {isFilterVisible && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
              {availableCompanions.map(comp => {
                const isSelected = selectedCompanionsFilter.includes(comp);
                return (
                  <TouchableOpacity
                    key={comp}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => toggleCompanionFilter(comp)}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {comp}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
      )}

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

const makeStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 20, paddingTop: 60 },
  sortRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  sortChip: { flex: 1, backgroundColor: theme.colors.card, paddingVertical: 10, borderRadius: 20, alignItems: 'center', marginHorizontal: 4 },
  activeChip: { backgroundColor: theme.colors.text },
  sortText: { fontSize: 13, fontWeight: '600', color: theme.colors.muted },
  activeText: { color: theme.colors.surface },
  emptyText: { textAlign: 'center', marginTop: 20, color: theme.colors.muted },

  filterSection: { marginBottom: 15, paddingHorizontal: 15 },
  filterToggleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card, padding: 12, borderRadius: 15 },
  filterTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.text, marginLeft: 10 },
  chipScroll: { marginTop: 10 },
  chip: { backgroundColor: theme.colors.borderAlt, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 8 },
  chipSelected: { backgroundColor: theme.colors.accent },
  chipText: { color: theme.colors.text, fontSize: 14, fontWeight: '600' },
  chipTextSelected: { color: theme.colors.surface },
});