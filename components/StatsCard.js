import { StyleSheet, Text, View } from 'react-native';

export default function StatsCard({ discovered, total, percent }) {
  return (
    <View style={styles.orangeCard}>
      <View style={styles.statsTextRow}>
        <Text style={styles.statsLabel}>Odkryte miejsca</Text>
        <Text style={styles.statsNum}>{discovered} / {total}</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.percentText}>{percent}% postępu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  orangeCard: { backgroundColor: '#FF4500', borderRadius: 25, padding: 25, marginBottom: 15, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5 },
  statsTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 },
  statsLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
  statsNum: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  progressBarBg: { height: 10, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  progressBarFill: { height: '100%', backgroundColor: '#fff', borderRadius: 5 },
  percentText: { color: '#fff', fontSize: 13, fontWeight: 'bold', textAlign: 'right' }
});