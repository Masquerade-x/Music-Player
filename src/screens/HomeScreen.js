import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  DeviceEventEmitter,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  useResponsiveScreenWidth,
  useResponsiveScreenHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {IconButton, Colors} from 'react-native-paper';
import BottomBar from '../components/BottomBar';
import MusicFiles from 'react-native-get-music-files';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import Player from './Player';

export default function HomeScreen({navigation}) {
  const playbackState = usePlaybackState();
  const [songs, setSongs] = useState();

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    getSongData();
  }, []);
  function getSongData() {
    MusicFiles.getAll({
      id: true,
      blured: false,
      artist: true,
      duration: true, //default : true
      cover: true, //default : true,
      title: true,
      batchNumber: 5, //get 5 songs per batch
      minimumSongDuration: 10000, //in miliseconds,
      fields: [
        'title',
        'artwork',
        'duration',
        'artist',
        'genre',
        'lyrics',
        'albumTitle',
        'cover',
      ],
    });
    DeviceEventEmitter.addListener('onBatchReceived', (params) => {
      console.log(params.batch);
      getSongs(params.batch);
    });
  }

  function getSongs(data) {
    const playListData = data?.map((i) => {
      let x = {
        id: i.id,
        url: i.path,
        title: i.title,
        duration: i.duration,
      };
      return x;
    });
    setSongs(playListData);
  }

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(songs);
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  function getStateName(state) {
    switch (state) {
      case TrackPlayer.STATE_NONE:
        return 'None';
      case TrackPlayer.STATE_PLAYING:
      case TrackPlayer.STATE_PAUSED:
        return 'Paused';
      case TrackPlayer.STATE_STOPPED:
        return 'Stopped';
      case TrackPlayer.STATE_BUFFERING:
        return 'Buffering';
    }
  }

  async function skipToNext() {
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  }

  async function skipToPrevious() {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#808080'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#404040'}}>
        <IconButton
          icon="menu"
          style={styles.icon}
          color={'white'}
          size={35}
          onPress={() => navigation.openDrawer()}
        />
        <ImageBackground
          style={styles.img}
          source={require('../assets/images/guitar.jpg')}>
          <Player
            onNext={skipToNext}
            style={styles.player}
            onPrevious={skipToPrevious}
            onTogglePlayback={togglePlayback}
          />
        </ImageBackground>
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
  icon: {
    backgroundColor: 'transparent',
  },
  state: {
    marginTop: 20,
  },
  img: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(100),
    resizeMode: 'cover',
    alignItems: 'center',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: responsiveScreenWidth(100),
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
  },

  player: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
