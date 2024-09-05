import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from './Src/Screens/Login';
import Signup from './Src/Screens/Signup';
import Splash from './Src/Screens/Splash';
import AppNavigator from './Src/Navigation/AppNavigator';

const Stack = createStackNavigator();

const App = () => {
  console.log("App Component Loaded");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
