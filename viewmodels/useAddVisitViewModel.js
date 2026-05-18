import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useAddVisitViewModel(restaurant, navigation) {
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(0); // Domyślnie 0 gwiazdek
  const [images, setImages] = useState([]); // TABLICA ZDJĘĆ
  
  // Stany do audio
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sprzątanie pamięci po dźwięku, żeby nie grał w tle po wyjściu z ekranu
  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const pickImage = async () => {
    // JAWNE PYTANIE O GALERIĘ (Dla prowadzącego)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Błąd', 'Brak dostępu do galerii zdjęć.');

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // POZWALAMY NA WIELE ZDJĘĆ
      quality: 0.7,
    });
    if (!result.canceled) {
      const newUris = result.assets.map(a => a.uri);
      setImages(prev => [...prev, ...newUris]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Błąd', 'Musisz zezwolić na dostęp do aparatu!');

    let result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled) {
      setImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return Alert.alert('Błąd', 'Brak dostępu do mikrofonu.');

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) { Alert.alert("Błąd", "Nie można uruchomić mikrofonu."); }
  };

  const stopRecording = async () => {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setAudioUri(recording.getURI()); // Zapisujemy ścieżkę do odtworzenia
  };

  const removeAudio = () => {
    setAudioUri(null);
    if (sound) { sound.unloadAsync(); setSound(null); }
  };

  const playAudio = async () => {
    if (!audioUri) return;
    const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
    setSound(newSound);
    setIsPlaying(true);
    await newSound.playAsync();
    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) setIsPlaying(false);
    });
  };

  const handleSave = async () => {
    if (rating === 0) {
      return Alert.alert("Wymagana ocena", "Proszę ocenić wizytę (minimum 0.5 gwiazdki)!");
    }

    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      
      const result = await db.runAsync(
        'INSERT INTO Visits (restaurant_id, visit_date, rating, notes) VALUES (?, ?, ?, ?)',
        [restaurant.id, new Date().toLocaleDateString(), rating, note]
      );
      const newVisitId = result.lastInsertRowId;

      // Zapisujemy WSZYSTKIE dodane zdjęcia (pętla)
      for (const imgUri of images) {
        await db.runAsync('INSERT INTO MediaItems (visit_id, media_type, file_path) VALUES (?, ?, ?)', [newVisitId, 'image', imgUri]);
      }

      // Zapisujemy audio
      if (audioUri) {
        await db.runAsync('INSERT INTO MediaItems (visit_id, media_type, file_path) VALUES (?, ?, ?)', [newVisitId, 'audio', audioUri]);
      }

      Alert.alert("Sukces", "Wspomnienie zapisane!");
      navigation.popToTop(); 
    } catch (error) {
      console.error(error);
      Alert.alert("Błąd", "Zapis nieudany.");
    }
  };

  return {
    note, setNote, rating, setRating, 
    images, removeImage, pickImage, takePhoto, 
    recording, audioUri, isPlaying, startRecording, stopRecording, playAudio, removeAudio,
    handleSave
  };
}