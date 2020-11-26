import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <AppNavigator />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
