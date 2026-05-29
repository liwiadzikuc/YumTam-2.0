import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { VisitModel } from '../models/VisitModel';

export function useAddVisitViewModel(restaurant, navigation) {
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(0); 
  const [images, setImages] = useState([]); 
  
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [availableCompanions, setAvailableCompanions] = useState([]); 
  const [selectedCompanions, setSelectedCompanions] = useState([]);   
  const [companionSearchText, setCompanionSearchText] = useState('');

  useEffect(() => {
    loadCompanions();
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const loadCompanions = async () => {
    try {
      const comps = await VisitModel.getAllCompanions();
      setAvailableCompanions(comps.map(c => c.name));
    } catch (e) { console.error(e); }
  };

  const toggleCompanion = (name) => {
    if (selectedCompanions.includes(name)) {
      setSelectedCompanions(prev => prev.filter(c => c !== name));
    } else {
      setSelectedCompanions(prev => [...prev, name]);
    }
  };

  const addNewCompanion = () => {
    const trimmed = companionSearchText.trim();
    if (trimmed && !selectedCompanions.includes(trimmed)) {
      setSelectedCompanions(prev => [...prev, trimmed]);
      if (!availableCompanions.includes(trimmed)) {
        setAvailableCompanions(prev => [trimmed, ...prev]);
      }
    }
    setCompanionSearchText('');
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Błąd', 'Brak dostępu do galerii zdjęć.');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, 
      quality: 0.7,
    });
    if (!result.canceled) setImages(prev => [...prev, ...result.assets.map(a => a.uri)]);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Błąd', 'Musisz zezwolić na dostęp do aparatu!');
    let result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled) setImages(prev => [...prev, result.assets[0].uri]);
  };

  const removeImage = (indexToRemove) => setImages(prev => prev.filter((_, index) => index !== indexToRemove));

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
    setAudioUri(recording.getURI()); 
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
    if (rating === 0) return Alert.alert("Wymagana ocena", "Proszę ocenić wizytę (minimum 0.5 gwiazdki)!");

    try {
      const date = new Date().toLocaleDateString();
      const newVisitId = await VisitModel.create(restaurant.id, rating, note, date, selectedCompanions);

      for (const imgUri of images) {
        const filename = imgUri.split('/').pop(); 
        const permanentUri = `${FileSystem.documentDirectory}${filename}`; 
        await FileSystem.copyAsync({ from: imgUri, to: permanentUri });
        await VisitModel.addMedia(newVisitId, 'image', permanentUri);
      }

      if (audioUri) {
        const filename = audioUri.split('/').pop(); 
        const permanentUri = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({ from: audioUri, to: permanentUri });
        await VisitModel.addMedia(newVisitId, 'audio', permanentUri);
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
    availableCompanions, selectedCompanions, companionSearchText, setCompanionSearchText, toggleCompanion, addNewCompanion,
    images, removeImage, pickImage, takePhoto, 
    recording, audioUri, isPlaying, startRecording, stopRecording, playAudio, removeAudio,
    handleSave
  };
}