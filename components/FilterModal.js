import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';

export default function FilterModal({ 
  visible, onClose, 
  availableCategories, 
  selectedCategories, setSelectedCategories,
  isCheapBeer, setIsCheapBeer,
  hasLunch, setHasLunch,
  onReset 
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const toggleCategory = (catName) => {
    if (selectedCategories.includes(catName)) setSelectedCategories(selectedCategories.filter(c => c !== catName));
    else setSelectedCategories([...selectedCategories, catName]);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtry</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={onReset} style={{ marginRight: 15 }}>
                <Text style={styles.resetText}>Wyczyść</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={28} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Kuchnie dostępne na mapie:</Text>
            <View style={styles.chipsContainer}>
              {availableCategories.map((cat, index) => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => toggleCategory(cat)}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{cat}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.optionText}>Tanie piwo (do 10zł)</Text>
              <Switch 
                value={isCheapBeer} 
                onValueChange={setIsCheapBeer} 
                trackColor={{ false: theme.colors.borderAlt, true: theme.colors.accent }}
                thumbColor={isCheapBeer ? theme.colors.surface : theme.colors.background}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.optionText}>Oferta Lunchowa</Text>
              <Switch 
                value={hasLunch} 
                onValueChange={setHasLunch} 
                trackColor={{ false: theme.colors.borderAlt, true: theme.colors.accent }}
                thumbColor={hasLunch ? theme.colors.surface : theme.colors.background}
              />
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (theme) => StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: theme.colors.overlay, justifyContent: 'flex-end' },
  modalContent: { backgroundColor: theme.colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text },
  resetText: { color: theme.colors.accent, fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: theme.colors.text },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.borderAlt },
  chipSelected: { backgroundColor: theme.colors.accent, borderColor: theme.colors.accent },
  chipText: { color: theme.colors.text },
  chipTextSelected: { color: theme.colors.surface, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: theme.colors.borderAlt, marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  optionText: { fontSize: 16, color: theme.colors.text },
});