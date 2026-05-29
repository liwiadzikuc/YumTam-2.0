import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import { useEffect, useState } from 'react';
import { Alert, Share } from 'react-native';
import { VisitModel } from '../models/VisitModel';

export function useVisitDetailsViewModel(visit, navigation) {
  const [images, setImages] = useState([]);
  const [audioUri, setAudioUri] = useState(null);
  
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [companionsList, setCompanionsList] = useState('');

  useEffect(() => {
    loadMedia();
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const loadMedia = async () => {
    const media = await VisitModel.getMediaForVisit(visit.id);
    setImages(media.filter(m => m.media_type === 'image').map(m => m.file_path));
    const audio = media.find(m => m.media_type === 'audio');
    if (audio) setAudioUri(audio.file_path);

    const comps = await VisitModel.getCompanionsForVisit(visit.id);
    setCompanionsList(comps);
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
    } catch (e) { console.error("Błąd odtwarzania:", e); }
  };

  const handleShare = async (restaurantName) => {
    try {
      await Share.share({
        message: `Hej! Odkryłem super miejsce we Wrocławiu: ${restaurantName}. Dałem mu ${visit.rating} gwiazdek w moim kulinarnym dzienniku YumTam! Musimy tam iść! `,
      });
    } catch (error) { console.log('Błąd udostępniania:', error); }
  };

  const handleDelete = () => {
    Alert.alert("Usuń", "Na pewno usunąć to wspomnienie z dziennika?", [
      { text: "Anuluj", style: "cancel" },
      { text: "Usuń", style: "destructive", onPress: async () => {
          try {
            const media = await VisitModel.getMediaForVisit(visit.id);
            for (const item of media) {
              await FileSystem.deleteAsync(item.file_path, { idempotent: true });
            }

            await VisitModel.delete(visit.id);
            navigation.goBack(); 
          } catch (e) {
            console.error("Błąd podczas usuwania wspomnienia:", e);
          }
      }}
    ]);
  };

  return { images, audioUri, isPlaying, companionsList, setCompanionsList, playAudio, handleShare, handleDelete };
}