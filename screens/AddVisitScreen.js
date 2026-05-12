import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddVisitScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);
  const [recording, setRecording] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) { Alert.alert("Błąd", "Nie można uruchomić mikrofonu."); }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  };

  const handleSave = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      
      // 1. Zapisujemy główną wizytę
      const result = await db.runAsync(
        'INSERT INTO Visits (restaurant_id, visit_date, rating, notes) VALUES (?, ?, ?, ?)',
        [restaurant.id, new Date().toLocaleDateString(), rating, note]
      );
      
      const newVisitId = result.lastInsertRowId; // Pobieramy ID wizyty

      // 2. Zapisujemy zdjęcie do MediaItems
      if (image) {
        await db.runAsync(
          'INSERT INTO MediaItems (visit_id, media_type, file_path) VALUES (?, ?, ?)',
          [newVisitId, 'image', image]
        );
      }

      // 3. Zapisujemy audio do MediaItems
      const audioUri = recording ? recording.getURI() : null;
      if (audioUri) {
        await db.runAsync(
          'INSERT INTO MediaItems (visit_id, media_type, file_path) VALUES (?, ?, ?)',
          [newVisitId, 'audio', audioUri]
        );
      }

      Alert.alert("Sukces", "Wspomnienie zapisane!");
      navigation.popToTop(); // Powrót do mapy/tabs
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd", "Zapis nieudany.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Jak było w {restaurant.name}?</Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((s) => (
          <TouchableOpacity key={s} onPress={() => setRating(s)}>
            <Ionicons name={s <= rating ? "star" : "star-outline"} size={40} color="#FF4500" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.mediaRow}>
        <TouchableOpacity style={styles.mediaBtn} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="#FF4500" />
          <Text>Foto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.mediaBtn, recording && { backgroundColor: '#ffebee' }]} 
          onPress={recording ? stopRecording : startRecording}
        >
          <Ionicons name={recording ? "stop" : "mic"} size={24} color="red" />
          <Text>{recording ? "Stop" : "Głos"}</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <TextInput
        style={styles.input}
        placeholder="Twoje notatki..."
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Zapisz w Dzienniku</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  stars: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  mediaRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  mediaBtn: { alignItems: 'center', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#eee', width: 100 },
  preview: { width: '100%', height: 200, borderRadius: 15, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 15, padding: 15, height: 120, backgroundColor: '#f9f9f9', textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#FF4500', padding: 20, borderRadius: 30, alignItems: 'center', marginTop: 30, marginBottom: 50 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});