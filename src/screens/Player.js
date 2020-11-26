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
  useResponsiveScreenWidth,
  useResponsiveScreenHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {IconButton, Searchbar} from 'react-native-paper';
import BottomBar from '../components/BottomBar';

export default function Player({navigation}) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#808080'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#404040'}}>
        <IconButton
          icon="arrow-left-circle"
          color={'white'}
          size={35}
          onPress={() => navigation.goBack()}
        />
        <BottomBar
          onSearchPress={() => navigation.navigate('Search')}
          onHomePress={() => navigation.navigate('Home')}
          onYoutubePress={() => navigation.navigate('Youtube')}
          onUserPress={() => navigation.navigate('User')}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  backBtn: {},
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: responsiveScreenWidth(100),
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
  },
});
