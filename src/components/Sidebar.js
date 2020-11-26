import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {IconButton, Searchbar} from 'react-native-paper';

export default function Sidebar(navigation) {
  return (
    <SafeAreaView>
      <View>
        <IconButton
          icon="home-circle-outline"
          color={'black'}
          size={35}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </SafeAreaView>
  );
}
