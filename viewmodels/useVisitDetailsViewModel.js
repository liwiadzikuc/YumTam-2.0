import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
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
    const media = await db.getAllAsync('SELECT * FROM MediaItems WHERE visit_id = ?', [visit.id]);
    
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
          try {
            const db = await SQLite.openDatabaseAsync('yumtam.db');
            
            const media = await db.getAllAsync('SELECT file_path FROM MediaItems WHERE visit_id = ?', [visit.id]);
            
            for (const item of media) {
              await FileSystem.deleteAsync(item.file_path, { idempotent: true });
            }

            await db.runAsync('DELETE FROM Visits WHERE id = ?', [visit.id]);
            navigation.goBack(); 
          } catch (e) {
            console.error("Błąd podczas usuwania wspomnienia:", e);
          }
      }}
    ]);
  };

  return { images, audioUri, isPlaying, playAudio, handleShare, handleDelete };
}