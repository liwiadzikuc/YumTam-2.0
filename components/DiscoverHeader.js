import { Ionicons } from '@expo/vector-icons';
import { FlatList, Platform, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';

export default function DiscoverHeader({ 
  searchText, 
  setSearchText, 
  onOpenFilters, 
  activeFiltersCount,
  displayedRestaurants, 
  onSelectRestaurant,
  isListView,      
  onToggleView    
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.topContainer}>
      
      <Text style={styles.appName}>YumTam</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.colors.muted} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Szukaj knajpy..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={theme.colors.placeholder}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color={theme.colors.muted} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={onToggleView}>
          <Ionicons name={isListView ? "map" : "list"} size={24} color={theme.mode === 'dark' ? '#000000' : '#ffffff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterButton} onPress={onOpenFilters}>
          <Ionicons name="options" size={24} color={theme.mode === 'dark' ? '#000000' : '#ffffff'} />
          {activeFiltersCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>


      {searchText.trim().length > 0 && (
        <View style={styles.searchResultsContainer}>
          <FlatList
            data={displayedRestaurants}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchResultItem}
                onPress={() => onSelectRestaurant(item)}
              >
                <Text style={styles.searchResultName}>{item.name}</Text>
                <Text style={styles.searchResultAddress}>{item.address}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.searchResultItem}>
                <Text style={{ color: theme.colors.muted, fontStyle: 'italic' }}>Brak wyników...</Text>
              </View>
            }
          />
        </View>
      )}

    </View>
  );
}

const makeStyles = (theme) => StyleSheet.create({
  topContainer: {
    position: 'absolute', top: 0, left: 0, right: 0,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    paddingHorizontal: 20, paddingBottom: 15,
    backgroundColor: theme.colors.sheetBackground,
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
    elevation: 8, shadowColor: '#000', shadowOpacity: 0.15,
    shadowRadius: 10, shadowOffset: { width: 0, height: 5 },
    zIndex: 100, 
  },
  appName: { fontSize: 24, fontWeight: '800', color: theme.colors.accent, marginBottom: 10 },
  
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  
  searchContainer: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.card,
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: theme.colors.text },

  filterButton: {
    backgroundColor: theme.colors.accent, width: 48, height: 48, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center'
  },
  badge: {
    position: 'absolute', top: -5, right: -5, backgroundColor: theme.colors.accent,
    width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: theme.colors.surface
  },
  badgeText: { color: theme.colors.surface, fontSize: 10, fontWeight: 'bold' },

  searchResultsContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 115 : 145, 
    left: 20,
    right: 20,
    backgroundColor: theme.colors.card,
    borderRadius: 15,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderAlt,
  },
  searchResultName: { fontWeight: 'bold', fontSize: 15, color: theme.colors.text },
  searchResultAddress: { fontSize: 12, color: theme.colors.muted, marginTop: 4 },
});