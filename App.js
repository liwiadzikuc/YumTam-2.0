import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';

import { initDatabase } from './database';
import AddVisitScreen from './screens/AddVisitScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import JournalScreen from './screens/JournalScreen';
import RestaurantDetailsScreen from './screens/RestaurantDetailsScreen';
import VisitDetailsScreen from './screens/VisitDetailsScreen';
import { ThemeProvider, useTheme } from './theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = route.name === 'Odkrywaj' ? 'map' : 'book';
          if (!focused) iconName += '-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Odkrywaj" component={DiscoverScreen} />
      <Tab.Screen name="Dziennik" component={JournalScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const navigationTheme = scheme === 'dark'
    ? {
        ...NavigationDarkTheme,
        colors: {
          ...NavigationDarkTheme.colors,
          primary: theme.colors.accent,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.accent,
        },
      }
    : {
        ...NavigationDefaultTheme,
        colors: {
          ...NavigationDefaultTheme.colors,
          primary: theme.colors.accent,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.accent,
        },
      };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AddVisit" component={AddVisitScreen} options={{ title: 'Dodaj wspomnienie', headerBackTitle: 'Wróć'}} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetailsScreen} options={{ title: 'Szczegóły', headerBackTitle: 'Wróć'}} />
        <Stack.Screen name="VisitDetails" component={VisitDetailsScreen} options={{ title: 'Wspomnienie', headerBackTitle: 'Wróć' }} />
      </Stack.Navigator>
    </NavigationContainer>
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
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}