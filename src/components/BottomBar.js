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
import {IconButton, Colors} from 'react-native-paper';

export default function BottomBar({
  navigation,
  onHomePress,
  onSearchPress,
  onBellPress,
  onYoutubePress,
}) {
  return (
    <View style={styles.bottomBar}>
      <IconButton
        icon="home-circle-outline"
        color={'white'}
        size={35}
        onPress={onHomePress}
      />
      <IconButton
        icon="folder-search"
        color={'white'}
        size={35}
        onPress={onSearchPress}
      />
      <IconButton
        icon="youtube"
        color={'white'}
        size={35}
        onPress={onYoutubePress}
      />
      <IconButton
        icon="bag-personal"
        color={'white'}
        size={35}
        onPress={onBellPress}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: responsiveScreenWidth(100),
    backgroundColor: '#1C1C1C',
    position: 'absolute',
    bottom: 0,
  },
});
