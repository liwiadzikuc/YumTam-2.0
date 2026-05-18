import { Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function FilterModal({ 
  visible, onClose, 
  availableCategories, // NOWY PROP: Dostajemy kategorie z bazy od ViewModelu
  selectedCategories, setSelectedCategories,
  isCheapBeer, setIsCheapBeer,
  hasLunch, setHasLunch,
  onReset 
}) {

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
                <Text style={{ color: '#FF4500', fontSize: 16, fontWeight: '600' }}>Wyczyść</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Kuchnie dostępne na mapie:</Text>
            <View style={styles.chipsContainer}>
              {/* ITERUJEMY PO BAZIE, A NIE PO PLIKU */}
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
              <Text style={styles.optionText}>Tanie piwo (do 10zł) </Text>
              <Switch 
                value={isCheapBeer} 
                onValueChange={setIsCheapBeer} // TO TERAZ ZADZIAŁA
                trackColor={{ false: "#767577", true: "#FF4500" }}
                thumbColor={"#f4f3f4"}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.optionText}>Oferta Lunchowa </Text>
              <Switch 
                value={hasLunch} 
                onValueChange={setHasLunch} // TO TERAZ ZADZIAŁA
                trackColor={{ false: "#767577", true: "#FF4500" }}
                thumbColor={"#f4f3f4"}
              />
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#555' },
  
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#eee' },
  chipSelected: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  chipText: { color: '#333' },
  chipTextSelected: { color: 'white', fontWeight: 'bold' },

  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  optionText: { fontSize: 16 },
});