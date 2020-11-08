import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StateScreen from './screens/StateScreen'
import CountryScreen from './screens/CountryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Country" component={CountryScreen} />
        <Tab.Screen name="State" component={StateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}