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

export default function SettingScreen({navigation}) {
  return (
    <>
      <SafeAreaView style={{backgroundColor: '#393e46'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#393e46'}}>
        <View style={styles.backBtn}>
          <IconButton icon="arrow-left-circle" color={'white'} size={35} />
        </View>
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
