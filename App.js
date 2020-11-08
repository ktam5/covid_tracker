import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StateScreen from './screens/StateScreen'
import CountryScreen from './screens/CountryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconLocation;

            if (route.name === 'Country') {
              return <Image
                source={require('./assets/world.png')}
                style={{ width: 30, height: 30 }} />;
            } else if (route.name === 'State') {
              return <Image
                source={require('./assets/states.png')}
                style={{ width: 30, height: 30 }} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Country" component={CountryScreen} />
        <Tab.Screen name="State" component={StateScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}