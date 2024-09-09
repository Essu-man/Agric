import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EquipmentDetails from '../Screens/EquipmentDetails';
import Home from '../Screens/Home';
import Settings from '../Nav/Settings';
import PostEquipment from '../Screens/PostEquipment'; 
import OrderDetails from '../Screens/OrderDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomPostButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      top: -10, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3d9d75',
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 2,
      borderColor: '#fff',
    }}
    onPress={onPress}
  >
    <Ionicons name="add" size={40} color="#fff" />
  </TouchableOpacity>
);

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
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
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      
      {/* Custom post button in the center */}
      <Tab.Screen
        name="Post"
        component={PostEquipment} // Your post equipment screen
        options={{
          tabBarButton: (props) => (
            <CustomPostButton {...props} onPress={() => navigation.navigate('PostEquipment')} />
          ),
        }}
      />

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
      <Stack.Screen name="PostEquipment" component={PostEquipment} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
