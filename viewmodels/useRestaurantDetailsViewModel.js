import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { RestaurantModel } from '../models/RestaurantModel';
import { VisitModel } from '../models/VisitModel';

const RESTAURANT_VIDEOS = {
  1: require('../assets/video/restaurant4k.mp4'), 
};

export function useRestaurantDetailsViewModel(restaurant) {
  const [isFav, setIsFav] = useState(restaurant.is_favorite === 1);
  const [history, setHistory] = useState([]);
  const [menu, setMenu] = useState([]);

  const videoSource = RESTAURANT_VIDEOS[restaurant.id] || null;

  const loadData = async () => {
    const historyData = await VisitModel.getHistoryForRestaurant(restaurant.id);
    const enrichedHistory = historyData.map(v => ({ ...v, resName: restaurant.name }));
    setHistory(enrichedHistory);

    const menuData = await RestaurantModel.getMenu(restaurant.id);
    setMenu(menuData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleFavorite = async () => {
    try {
      await RestaurantModel.toggleFavorite(restaurant.id, isFav);
      setIsFav(!isFav);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {
      console.error(e);
    }
  };

  const openLink = (url) => {
    if (url) Linking.openURL(url);
  };

  return { isFav, history, menu, videoSource, toggleFavorite, openLink }; 
}