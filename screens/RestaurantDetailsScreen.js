import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import VisitCard from '../components/VisitCard';
import { useTheme } from '../theme';
import { useRestaurantDetailsViewModel } from '../viewmodels/useRestaurantDetailsViewModel';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { restaurant } = route.params;
  const { isFav, history, menu, videoSource, toggleFavorite, openLink } = useRestaurantDetailsViewModel(restaurant);
  const animatedScale = useRef(new Animated.Value(1)).current;

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.muted = true;
    player.play(); 
  });

  const handleLikePress = () => {
    toggleFavorite(); 
    animatedScale.setValue(1); 

    Animated.sequence([
      Animated.timing(animatedScale, { toValue: 1.4, duration: 120, useNativeDriver: true }),
      Animated.spring(animatedScale, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }),
    ]).start();
  };

  const animatedStyle = { transform: [{ scale: animatedScale }] };

  return (
    <ScrollView style={styles.container}>
      {videoSource ? (
        <VideoView
          style={styles.image}
          player={player}
          contentFit="cover"
          nativeControls={false}
        />
      ) : (
       <Image 
          source={{ uri: restaurant.image_url || 'https://picsum.photos/400/200' }} 
          style={styles.image} 
          contentFit="cover"
          transition={500} 
          cachePolicy="memory-disk" 
        />
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{restaurant.name}</Text>
            
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
              <Text style={styles.reviewsCount}>({restaurant.reviews_count} opinii)</Text>
            </View>

            <Text style={styles.cuisine}>{restaurant.rel_categories} • {restaurant.address}</Text>
          </View>
          
          <TouchableOpacity onPress={handleLikePress} activeOpacity={0.7}>
            <Animated.View style={animatedStyle}>
              <Ionicons name={isFav ? "heart" : "heart-outline"} size={35} color={theme.colors.accent} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <View style={styles.linksRow}>
          {restaurant.google_maps_url ? (
            <TouchableOpacity style={styles.linkBtn} onPress={() => openLink(restaurant.google_maps_url)}>
              <Ionicons name="map" size={18} color={theme.colors.accent} />
              <Text style={styles.linkText}>Google Maps</Text>
            </TouchableOpacity>
          ) : null}
          
          {restaurant.instagram_url ? (
            <TouchableOpacity style={styles.linkBtn} onPress={() => openLink(restaurant.instagram_url)}>
              <Ionicons name="logo-instagram" size={18} color="#E1306C" />
              <Text style={[styles.linkText, {color: '#E1306C'}]}>Instagram</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <Text style={styles.description}>{restaurant.description}</Text>

        {menu.length > 0 && (
          <View style={styles.menuSection}>
            <Text style={styles.subTitle}>Wybrane z Menu:</Text>
            {menu.map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>{item.price} zł</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddVisit', { restaurant })}>
          <Text style={styles.addBtnText}>Dodaj wspomnienie</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Twoja historia tutaj:</Text>
        {history.length === 0 && <Text style={{color: theme.colors.muted}}>Nie masz tu jeszcze wspomnień.</Text>}
        
        {history.map(visit => (
          <VisitCard 
            key={visit.id} 
            visit={visit} 
            onPress={() => navigation.navigate('VisitDetails', { visit: visit, restaurantName: restaurant.name })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const makeStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  image: { width: '100%', height: 250 },
  content: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { fontWeight: 'bold', fontSize: 16, color: theme.colors.text },
  reviewsCount: { color: theme.colors.muted, marginLeft: 8, fontSize: 14 },
  cuisine: { color: theme.colors.muted, marginTop: 5 },
  linksRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  linkBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  linkText: { color: theme.colors.accent, fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
  description: { fontSize: 16, lineHeight: 24, color: theme.colors.text, marginBottom: 20 },
  menuSection: { marginBottom: 25, backgroundColor: theme.colors.card, padding: 15, borderRadius: 15, borderWidth: 1, borderColor: theme.colors.borderAlt },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: theme.colors.borderAlt },
  menuName: { fontSize: 15, color: theme.colors.text },
  menuPrice: { fontSize: 15, fontWeight: 'bold', color: theme.colors.accent },
  addBtn: { backgroundColor: theme.colors.accent, padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 30 },
  addBtnText: { color: theme.colors.surface, fontWeight: 'bold', fontSize: 16 },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: theme.colors.text },
});