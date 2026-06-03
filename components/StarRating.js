import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';

export default function StarRating({ rating, size = 16, onRatingChange }) {
  const theme = useTheme();
  
  const isInteractive = !!onRatingChange; 

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((i) => {
        let name = 'star-outline';
        if (rating >= i) name = 'star';
        else if (rating >= i - 0.5) name = 'star-half';
        
        return (
          <View key={i} style={{ position: 'relative', width: size, height: size, marginHorizontal: isInteractive ? 5 : 2 }}>
            
            {isInteractive && (
              <>
                <TouchableOpacity 
                  style={{ position: 'absolute', left: 0, width: size / 2, height: size, zIndex: 1 }} 
                  onPress={() => onRatingChange(i - 0.5)} 
                />
                <TouchableOpacity 
                  style={{ position: 'absolute', right: 0, width: size / 2, height: size, zIndex: 1 }} 
                  onPress={() => onRatingChange(i)} 
                />
              </>
            )}
            
            <Ionicons name={name} size={size} color={theme.colors.accent} />
          </View>
        );
      })}
    </View>
  );
}