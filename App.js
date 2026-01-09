import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { VisitsProvider } from './context/VisitsContext';
import AddVisitScreen from './screens/AddVisitScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import JournalScreen from './screens/JournalScreen';
import RestaurantDetailsScreen from './screens/RestaurantDetailsScreen';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Odkrywaj') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'Dziennik') iconName = focused ? 'journal' : 'journal-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF4500',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { 
          position: 'absolute', backgroundColor: 'rgba(255,255,255,0.9)', 
          borderTopWidth: 0, elevation: 0, height: 60, paddingBottom: 10
        }
      })}
    >
      <Tab.Screen name="Odkrywaj" component={DiscoverScreen} />
      <Tab.Screen name="Dziennik" component={JournalScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <VisitsProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Screen 
            name="HomeTabs" 
            component={HomeTabs} 
            options={{ headerShown: false }} 
          />
          
          <Stack.Screen 
            name="AddVisit" 
            component={AddVisitScreen}
            options={{ 
              title: 'Dodaj wspomnienie', 
              headerTintColor: '#FF4500',
              headerBackTitleVisible: false, 
              headerBackTitle: 'Wróć'       
            }} 
          />

          <Stack.Screen 
            name="RestaurantDetails" 
            component={RestaurantDetailsScreen}
            options={{ 
              title: 'Szczegóły', 
              headerTintColor: '#FF4500',
              headerBackTitleVisible: false, 
              headerBackTitle: 'Wróć'        
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VisitsProvider>
  );
}