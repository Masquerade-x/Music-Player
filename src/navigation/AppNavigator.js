import React from 'react';
import {SafeAreaView, Text, StatusBar} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SearchScreen from '../screens/SearchScreen';
import {ProgressBar, IconButton} from 'react-native-paper';
import SettingScreen from '../screens/SettingScreen';
import Sidebar from '../components/Sidebar';
import YoutubeScreen from '../screens/YoutubeScreen';
import Player from '../screens/Player';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator({navigation}) {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
        <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Search" component={SearchScreen} />
        <Drawer.Screen name="Youtube" component={YoutubeScreen} />
        <Drawer.Screen name="Player" component={Player} />
        <Drawer.Screen name="Settings" component={SettingScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
