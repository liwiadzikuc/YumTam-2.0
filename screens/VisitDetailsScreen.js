import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AudioPlayer from '../components/AudioPlayer';
import StarRating from '../components/StarRating';
import { useVisitDetailsViewModel } from '../viewmodels/useVisitDetailsViewModel';

const { width, height } = Dimensions.get('window');

export default function VisitDetailsScreen({ route, navigation }) {
  const { visit, restaurantName } = route.params;
  const { images, audioUri, isPlaying, playAudio, handleDelete, handleShare, companionsList } = useVisitDetailsViewModel(visit, navigation);
  const [activeImage, setActiveImage] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.header}>{restaurantName}</Text>
        <Text style={styles.date}>{visit.visit_date}</Text>
        {companionsList ? (
        <Text style={{ textAlign: 'center', color: '#FF4500', fontWeight: 'bold', marginBottom: 15 }}>
          W towarzystwie: {companionsList}
        </Text>
      ) : null}

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
              <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => setActiveImage(img)}>
                <Image source={{ uri: img }} style={styles.image} />
              </TouchableOpacity>
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

      <Modal visible={!!activeImage} transparent={true} animationType="fade">
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.closeModalBtn} onPress={() => setActiveImage(null)}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          <ScrollView
            maximumZoomScale={4}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScroll}
          >
            {activeImage && (
              <Image 
                source={{ uri: activeImage }} 
                style={styles.fullImage} 
                resizeMode="contain" 
              />
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10 },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  date: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 15 },
  ratingBox: { alignItems: 'center', marginBottom: 20 },
  noteBox: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 15, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#FF4500' },
  noteText: { fontSize: 16, color: '#444', fontStyle: 'italic', lineHeight: 24 },

  gallery: { marginBottom: 30 },
  galleryTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  image: { width: '100%', height: 250, borderRadius: 15, marginBottom: 15 },

  deleteBtn: { flexDirection: 'row', backgroundColor: '#e53935', padding: 15, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  deleteBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },

  modalBg: { flex: 1, backgroundColor: 'black' },
  closeModalBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.3)', padding: 5, borderRadius: 20 },
  modalScroll: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: width, height: height * 0.8 }
});