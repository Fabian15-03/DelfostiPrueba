import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

// Importando las pantallas
import Login from '../screens/login';
import Home from '../screens/home';
import Favorites from '../screens/Favorites';

// Crea el navegador tabBottom
const Tab = createBottomTabNavigator();

// Pantallas del tabnavigator y sin headershown
const TabNavigator = () => (
  <Tab.Navigator initialRouteName="home" screenOptions={{headerShown: false}}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <MaterialCommunity
            name={focused ? 'home' : 'home-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{
        tabBarIcon: ({focused, color, size}) => (
          <MaterialCommunity
            name={focused ? 'star' : 'star-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

// Switch navigation para cambiar el stack
const Navigation = () => {
  const [auth, setAuth] = useState(false);

  const handleLogin = (authStatus: boolean) => {
    setAuth(authStatus);
  };

  return (
    <NavigationContainer>
      {auth ? (
        <TabNavigator />
      ) : (
        <View>
          <Login onLogin={handleLogin} />
        </View>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
