import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function StarRating({ rating, size = 16 }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((i) => {
        let name = 'star-outline';
        if (rating >= i) name = 'star';
        else if (rating >= i - 0.5) name = 'star-half';
        
        return <Ionicons key={i} name={name} size={size} color="#FF4500" style={{ marginRight: 2 }} />;
      })}
    </View>
  );
}