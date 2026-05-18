import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AudioPlayer from '../components/AudioPlayer';
import StarRating from '../components/StarRating';
import { useVisitDetailsViewModel } from '../viewmodels/useVisitDetailsViewModel';

export default function VisitDetailsScreen({ route, navigation }) {
  const { visit, restaurantName } = route.params;
  const { images, audioUri, isPlaying, playAudio, handleShare, handleDelete } = useVisitDetailsViewModel(visit, navigation);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{restaurantName}</Text>
      <Text style={styles.date}>{visit.visit_date}</Text>

      <View style={styles.ratingBox}>
        <StarRating rating={visit.rating} size={28} />
      </View>

      {visit.notes ? (
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>"{visit.notes}"</Text>
        </View>
      ) : null}

      {audioUri && (
        <AudioPlayer isPlaying={isPlaying} onPlayPause={playAudio} />
      )}

      {images.length > 0 && (
        <View style={styles.gallery}>
          <Text style={styles.galleryTitle}>Zdjęcia z wizyty:</Text>
          {images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.image} />
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={[styles.deleteBtn, { backgroundColor: '#2196F3', marginBottom: 15 }]} 
        onPress={() => handleShare(restaurantName)}
      >
        <Ionicons name="share-social-outline" size={20} color="white" />
        <Text style={styles.deleteBtnText}>Udostępnij znajomym</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="white" />
        <Text style={styles.deleteBtnText}>Usuń to wspomnienie</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  date: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 15 },
  ratingBox: { alignItems: 'center', marginBottom: 20 },
  noteBox: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 15, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#FF4500' },
  noteText: { fontSize: 16, color: '#444', fontStyle: 'italic', lineHeight: 24 },
  
  gallery: { marginBottom: 30 },
  galleryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  image: { width: '100%', height: 250, borderRadius: 15, marginBottom: 15 },

  deleteBtn: { flexDirection: 'row', backgroundColor: '#e53935', padding: 15, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 50 },
  deleteBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 10 }
});