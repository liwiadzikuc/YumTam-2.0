import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AudioPlayer from '../components/AudioPlayer';
import { useTheme } from '../theme';
import { useAddVisitViewModel } from '../viewmodels/useAddVisitViewModel';

export default function AddVisitScreen({ route, navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { restaurant } = route.params;
  
  const {
    note, setNote, rating, setRating, 
    availableCompanions, selectedCompanions, companionSearchText, setCompanionSearchText, toggleCompanion, addNewCompanion,
    images, removeImage, pickImage, takePhoto, 
    recording, audioUri, isPlaying, startRecording, stopRecording, playAudio, removeAudio,
    handleSave
  } = useAddVisitViewModel(restaurant, navigation);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Jak było w {restaurant.name}?</Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((i) => {
          let iconName = 'star-outline';
          if (rating >= i) iconName = 'star';
          else if (rating >= i - 0.5) iconName = 'star-half';

          return (
            <View key={i} style={{ position: 'relative', width: 40, height: 40, marginHorizontal: 5 }}>
              <TouchableOpacity style={{ position: 'absolute', left: 0, width: 20, height: 40, zIndex: 1 }} onPress={() => setRating(i - 0.5)} />
              <TouchableOpacity style={{ position: 'absolute', right: 0, width: 20, height: 40, zIndex: 1 }} onPress={() => setRating(i)} />
              <Ionicons name={iconName} size={40} color={theme.colors.accent} />
            </View>
          );
        })}
      </View>
      
      {rating === 0 && <Text style={styles.ratingText}>Wymagana ocena</Text>}
      {rating > 0 && <View style={{ height: 20, marginBottom: 25 }} />}

      <View style={styles.mediaRow}>
        <TouchableOpacity style={styles.mediaBtn} onPress={pickImage}>
          <Ionicons name="images" size={24} color={theme.colors.accent} />
          <Text style={{fontSize: 12, color: theme.colors.text}}>Galeria</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaBtn} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color={theme.colors.accent} />
          <Text style={{fontSize: 12, color: theme.colors.text}}>Aparat</Text>
        </TouchableOpacity>
        
        {!audioUri ? (
          <TouchableOpacity 
            style={[styles.mediaBtn, recording && { backgroundColor: theme.colors.surface }]} 
            onPress={recording ? stopRecording : startRecording}
          >
            <Ionicons name={recording ? "stop" : "mic"} size={24} color={theme.colors.danger} />
            <Text style={{fontSize: 12, color: theme.colors.text}}>{recording ? "Stop" : "Głos"}</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.mediaBtn, { backgroundColor: theme.colors.success, borderColor: theme.colors.success }]}> 
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.surface} />
            <Text style={{fontSize: 12, color: theme.colors.surface}}>Nagrane</Text>
          </View>
        )}
      </View>

      {audioUri && (
        <AudioPlayer isPlaying={isPlaying} onPlayPause={playAudio} onDelete={removeAudio} />
      )}

      {images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageGallery}>
          {images.map((img, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: img }} style={styles.preview} />
              <TouchableOpacity style={styles.deleteImgBtn} onPress={() => removeImage(index)}>
                <Ionicons name="close-circle" size={28} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}


      <Text style={styles.sectionTitle}>Z kim tu byłeś?</Text>

      {selectedCompanions.length > 0 && (
        <View style={styles.chipsContainer}>
          {selectedCompanions.map((comp, idx) => (
            <TouchableOpacity key={idx} style={styles.chipSelected} onPress={() => toggleCompanion(comp)}>
              <Text style={styles.chipSelectedText}>{comp}  ✕</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.companionInputRow}>
        <TextInput
          style={styles.companionInput}
          placeholder="Wyszukaj lub wpisz imię..."
          value={companionSearchText}
          onChangeText={setCompanionSearchText}
          onSubmitEditing={addNewCompanion}
        />
        {companionSearchText.trim().length > 0 && (
          <TouchableOpacity style={styles.addCompanionBtn} onPress={addNewCompanion}>
            <Ionicons name="add" size={24} color={theme.colors.surface} />
          </TouchableOpacity>
        )}
      </View>

      {availableCompanions.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsContainer}>
          {availableCompanions
            .filter(c => c.toLowerCase().includes(companionSearchText.toLowerCase()) && !selectedCompanions.includes(c))
            .map((comp, idx) => (
              <TouchableOpacity key={idx} style={styles.chipUnselected} onPress={() => toggleCompanion(comp)}>
                <Text style={styles.chipUnselectedText}>+ {comp}</Text>
              </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Notatki z wizyty:</Text>
      <TextInput
        style={styles.input}
        placeholder="Opisz swoje wrażenia..."
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={[styles.saveBtn, rating === 0 && {backgroundColor: theme.colors.border}]} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Zapisz w Dzienniku</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const makeStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: theme.colors.text },
  stars: { flexDirection: 'row', justifyContent: 'center', marginBottom: 5 },
  ratingText: { textAlign: 'center', color: theme.colors.accent, marginBottom: 25, fontWeight: '600', fontSize: 12 },
  mediaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  mediaBtn: { alignItems: 'center', padding: 12, borderRadius: 15, borderWidth: 1, borderColor: theme.colors.borderAlt, flex: 1, marginHorizontal: 5, backgroundColor: theme.colors.card },

  imageGallery: { marginBottom: 20 },
  imageContainer: { position: 'relative', marginRight: 15 },
  preview: { width: 150, height: 150, borderRadius: 15 },
  deleteImgBtn: { position: 'absolute', top: 5, right: 5, backgroundColor: theme.colors.overlay, borderRadius: 15 },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: theme.colors.borderAlt, borderRadius: 15, padding: 15, height: 120, backgroundColor: theme.colors.surface, color: theme.colors.text, textAlignVertical: 'top' },
  
  companionInputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  companionInput: { flex: 1, borderWidth: 1, borderColor: theme.colors.borderAlt, borderRadius: 15, padding: 12, backgroundColor: theme.colors.surface, color: theme.colors.text },
  addCompanionBtn: { backgroundColor: theme.colors.accent, padding: 10, borderRadius: 15, marginLeft: 10 },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  chipSelected: { backgroundColor: theme.colors.accent, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, margin: 4 },
  chipSelectedText: { color: theme.colors.surface, fontWeight: 'bold', fontSize: 13 },
  suggestionsContainer: { flexDirection: 'row', marginBottom: 10 },
  chipUnselected: { backgroundColor: theme.colors.borderAlt, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, margin: 4 },
  chipUnselectedText: { color: theme.colors.text, fontSize: 13, fontWeight: '500' },

  saveBtn: { backgroundColor: theme.colors.accent, padding: 20, borderRadius: 30, alignItems: 'center', marginTop: 20, marginBottom: 50 },
  saveBtnText: { color: theme.colors.surface, fontSize: 18, fontWeight: 'bold' }
});