import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Share } from 'react-native';


export function useVisitDetailsViewModel(visit, navigation) {
  const [images, setImages] = useState([]);
  const [audioUri, setAudioUri] = useState(null);
  
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadMedia();
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const loadMedia = async () => {
    const db = await SQLite.openDatabaseAsync('yumtam.db');
    // Pobieramy wszystkie media przypisane do tej wizyty z naszej tabeli MediaItems
    const media = await db.getAllAsync('SELECT * FROM MediaItems WHERE visit_id = ?', [visit.id]);
    
    // Rozdzielamy je na zdjęcia i nagranie
    setImages(media.filter(m => m.media_type === 'image').map(m => m.file_path));
    const audio = media.find(m => m.media_type === 'audio');
    if (audio) setAudioUri(audio.file_path);
  };

  const playAudio = async () => {
    if (!audioUri) return;
    try {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setIsPlaying(false);
      });
    } catch (e) {
      console.error("Błąd odtwarzania:", e);
    }
  };

  const handleShare = async (restaurantName) => {
    try {
      await Share.share({
        message: `Hej! Odkryłem super miejsce we Wrocławiu: ${restaurantName}. Dałem mu ${visit.rating} gwiazdek w moim kulinarnym dzienniku YumTam! Musimy tam iść! `,
      });
    } catch (error) {
      console.log('Błąd udostępniania:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert("Usuń", "Na pewno usunąć to wspomnienie z dziennika?", [
      { text: "Anuluj", style: "cancel" },
      { text: "Usuń", style: "destructive", onPress: async () => {
          const db = await SQLite.openDatabaseAsync('yumtam.db');
          // Dzięki temu, że w bazie mamy ON DELETE CASCADE, to usunie też automatycznie zdjęcia z MediaItems!
          await db.runAsync('DELETE FROM Visits WHERE id = ?', [visit.id]);
          navigation.goBack(); // Wracamy do listy po usunięciu
      }}
    ]);
  };

  return { images, audioUri, isPlaying, playAudio, handleShare, handleDelete };
}