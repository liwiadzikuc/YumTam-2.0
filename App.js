import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { initDatabase } from './database';
import AddVisitScreen from './screens/AddVisitScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import JournalScreen from './screens/JournalScreen';
import RestaurantDetailsScreen from './screens/RestaurantDetailsScreen';
import VisitDetailsScreen from './screens/VisitDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = route.name === 'Odkrywaj' ? 'map' : 'book';
          if (!focused) iconName += '-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4500',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Odkrywaj" component={DiscoverScreen} />
      <Tab.Screen name="Dziennik" component={JournalScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => {
        console.log("Baza danych gotowa!");
        setDbReady(true);
      })
      .catch(err => console.error("Błąd bazy:", err));
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inicjalizacja bazy danych...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddVisit" component={AddVisitScreen} options={{ title: 'Dodaj wspomnienie', headerBackTitle: 'Wróć'}} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} options={{ title: 'Szczegóły', headerBackTitle: 'Wróć'}} />
        <Stack.Screen name="VisitDetails" component={VisitDetailsScreen} options={{ title: 'Wspomnienie', headerBackTitle: 'Wróć' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}