import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';

export default function AudioPlayer({ isPlaying, onPlayPause, onDelete, title = "Notatka głosowa" }) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.audioPlayer}>
      <TouchableOpacity onPress={onPlayPause} style={styles.playBtn}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={24} color={theme.colors.surface} />
      </TouchableOpacity>
      
      <Text style={styles.audioText}>
        {title} 
      </Text>
      
      {onDelete && (
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={24} color={theme.colors.muted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const makeStyles = (theme) => StyleSheet.create({
  audioPlayer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, 
    padding: 10, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: theme.colors.borderAlt 
  },
  playBtn: { 
    backgroundColor: theme.colors.accent, borderRadius: 20, width: 40, height: 40, 
    justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  audioText: { flex: 1, color: theme.colors.text, fontWeight: '500' }
});