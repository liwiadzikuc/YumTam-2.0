// import { Ionicons } from '@expo/vector-icons';
// import { useFocusEffect } from '@react-navigation/native';
// import * as SQLite from 'expo-sqlite';
// import { useCallback, useState } from 'react';
// import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function JournalScreen() {
//   const [visits, setVisits] = useState([]);
//   const [stats, setStats] = useState({ total: 0, discovered: 0, percent: 0 });

//   const loadData = async () => {
//     try {
//       const db = await SQLite.openDatabaseAsync('yumtam.db');
      
//       // Pobieranie wizyt wraz z ich pierwszym zdjęciem
//       const vData = await db.getAllAsync(`
//         SELECT V.*, R.name as resName, M.file_path as img 
//         FROM Visits V 
//         JOIN Restaurants R ON V.restaurant_id = R.id 
//         LEFT JOIN MediaItems M ON M.visit_id = V.id AND M.media_type = 'image'
//         GROUP BY V.id ORDER BY V.id DESC
//       `);
//       setVisits(vData);

//       // Statystyki dla pomarańczowego panelu
//       const totalRes = await db.getFirstAsync('SELECT COUNT(*) as c FROM Restaurants');
//       const discRes = await db.getFirstAsync('SELECT COUNT(DISTINCT restaurant_id) as c FROM Visits');
//       const p = totalRes.c > 0 ? Math.round((discRes.c / totalRes.c) * 100) : 0;
//       setStats({ total: totalRes.c, discovered: discRes.c, percent: p });
//     } catch (error) { console.error(error); }
//   };

//   useFocusEffect(useCallback(() => { loadData(); }, []));

//   const deleteVisit = async (id) => {
//     Alert.alert("Usuń", "Czy na pewno usunąć to wspomnienie?", [
//       { text: "Anuluj" },
//       { text: "Usuń", style: 'destructive', onPress: async () => {
//           const db = await SQLite.openDatabaseAsync('yumtam.db');
//           await db.runAsync('DELETE FROM Visits WHERE id = ?', [id]);
//           loadData();
//       }}
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.orangeCard}>
//         <View>
//           <Text style={styles.statsLabel}>Odkryte miejsca</Text>
//           <Text style={styles.statsNum}>{stats.discovered} / {stats.total}</Text>
//         </View>
//         <View style={styles.circle}><Text style={styles.percentText}>{stats.percent}%</Text></View>
//       </View>

//       <FlatList
//         data={visits}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             {item.img && <Image source={{ uri: item.img }} style={styles.cardImg} />}
//             <View style={styles.cardBody}>
//               <View style={styles.cardHeader}>
//                 <Text style={styles.resName}>{item.resName}</Text>
//                 <TouchableOpacity onPress={() => deleteVisit(item.id)}>
//                   <Ionicons name="trash-outline" size={20} color="#FF4500" />
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.date}>{item.visit_date} • {'⭐'.repeat(item.rating)}</Text>
//               {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
//   orangeCard: { backgroundColor: '#FF4500', borderRadius: 25, padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   statsLabel: { color: '#fff', fontSize: 14 },
//   statsNum: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
//   circle: { width: 60, height: 60, borderRadius: 30, borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
//   percentText: { color: '#fff', fontWeight: 'bold' },
//   card: { borderRadius: 20, backgroundColor: '#fff', marginBottom: 15, elevation: 3, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
//   cardImg: { width: '100%', height: 120 },
//   cardBody: { padding: 15 },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
//   resName: { fontSize: 18, fontWeight: 'bold' },
//   date: { color: '#FF4500', fontSize: 12, marginVertical: 5 },
//   notes: { color: '#666', fontSize: 14 }
// });
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function JournalScreen() {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({ total: 0, discovered: 0, percent: 0 });

  const loadData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('yumtam.db');
      
      const vData = await db.getAllAsync(`
        SELECT 
          V.*, 
          R.name as resName, 
          (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'image' LIMIT 1) as img,
          (SELECT file_path FROM MediaItems WHERE visit_id = V.id AND media_type = 'audio' LIMIT 1) as audioPath
        FROM Visits V 
        JOIN Restaurants R ON V.restaurant_id = R.id 
        GROUP BY V.id 
        ORDER BY V.id DESC
      `);
      setVisits(vData);

      const totalRes = await db.getFirstAsync('SELECT COUNT(*) as c FROM Restaurants');
      const discRes = await db.getFirstAsync('SELECT COUNT(DISTINCT restaurant_id) as c FROM Visits');
      const p = totalRes.c > 0 ? Math.round((discRes.c / totalRes.c) * 100) : 0;
      setStats({ total: totalRes.c, discovered: discRes.c, percent: p });
    } catch (error) { console.error(error); }
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));

  return (
    <View style={styles.container}>
      <View style={styles.orangeCard}>
        <View>
          <Text style={styles.statsLabel}>Odkryte miejsca</Text>
          <Text style={styles.statsNum}>{stats.discovered} / {stats.total}</Text>
        </View>
        <View style={styles.circle}><Text style={styles.percentText}>{stats.percent}%</Text></View>
      </View>

      <FlatList
        data={visits}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.img && <Image source={{ uri: item.img }} style={styles.cardImg} />}
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={styles.resName}>{item.resName}</Text>
                {item.audioPath && (
                  <View style={styles.audioBadge}>
                    <Ionicons name="mic" size={16} color="#FF4500" />
                    <Text style={styles.audioText}>Notatka</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.date}>{item.visit_date} • {'⭐'.repeat(item.rating)}</Text>
              {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}

              {item.audioPath && (
                <TouchableOpacity 
                  style={styles.playButtonDisabled} 
                  disabled={true} 
                >
                  <Ionicons name="play-circle" size={24} color="#ccc" />
                  <Text style={styles.playTextDisabled}>Odtwórz wspomnienie (wkrótce)</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  orangeCard: { backgroundColor: '#FF4500', borderRadius: 25, padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statsLabel: { color: '#fff', fontSize: 14 },
  statsNum: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  circle: { width: 60, height: 60, borderRadius: 30, borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  percentText: { color: '#fff', fontWeight: 'bold' },
  card: { borderRadius: 20, backgroundColor: '#fff', marginBottom: 15, elevation: 3, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
  cardImg: { width: '100%', height: 120 },
  cardBody: { padding: 15 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resName: { fontSize: 18, fontWeight: 'bold' },
  audioBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff0eb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  audioText: { color: '#FF4500', fontSize: 10, fontWeight: 'bold', marginLeft: 4 },
  date: { color: '#FF4500', fontSize: 12, marginVertical: 5 },
  notes: { color: '#666', fontSize: 14, marginBottom: 10 },
  playButtonDisabled: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 8, borderRadius: 10, marginTop: 5 },
  playTextDisabled: { color: '#bbb', fontSize: 12, marginLeft: 8 },
});