import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EquipmentDetails from '../Screens/EquipmentDetails';
import Home from '../Screens/Home';
import Post from '../Nav/Post'; 
import Settings from '../Nav/Settings';
import OrderDetails from '../Screens/OrderDetails';
import ManagePosts from '../Screens/ManagePosts';
import EditPost from '../Screens/EditPost';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Post':
              iconName = focused ? 'add-circle' : 'add-circle-outline'; 
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3d9d75',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 80,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3d9d75',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="EquipmentDetails" component={EquipmentDetails} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />
      <Stack.Screen name="EditPost" component={EditPost} options={{ headerShown: false }} />
      <Stack.Screen name="ManagePosts" component={ManagePosts} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
