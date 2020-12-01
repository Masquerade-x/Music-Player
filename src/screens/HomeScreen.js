import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  DeviceEventEmitter,
  PermissionsAndroid,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function HomeScreen({navigation, route}) {
  const playbackState = usePlaybackState();
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState();

  const trackId = route.params?.currentTrack;

  useEffect(() => {
    setup();
    checkPermission();
  }, []);

  async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem('@songs');
      let jsonData = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonData);
      if (jsonData === null) {
        setLoading(true);
        getSongData();
      } else {
        setSongs(jsonData);
        songData(jsonData);
      }
    } catch (e) {
      // error reading value
    }
  }

  async function checkPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Access',
          message:
            'Music player needs access to your storage ' +
            'so you can view the songs.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
        getData();
      } else {
        console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

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
      getSongs(params.batch);
      setLoading(false);
    });
  }

  function getSongs(data) {
    const playListData = data?.map((i) => {
      let x = {
        id: i.id,
        url: i.path,
        title: i.title,
        duration: i.duration,
        filename: i.fileName,
      };
      return x;
    });
    setSongs(playListData);
    songData(playListData);
  }

  const songData = async (songs) => {
    try {
      const jsonValue = JSON.stringify(songs);
      await AsyncStorage.setItem('@songs', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  async function setup() {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_PLAY_FROM_ID,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  async function togglePlayback() {
    let trackObject = await TrackPlayer.getTrack(trackId);
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (trackId !== undefined) {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackId);
      await TrackPlayer.play();
    }
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
        <ImageBackground
          style={styles.img}
          source={require('../assets/images/guitar.jpg')}>
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LottieView
                style={{
                  height: responsiveScreenHeight(25),
                  width: responsiveScreenWidth(25),
                }}
                source={require('../assets/lottieFiles/rs.json')}
                autoPlay
                duration={2000}
              />
            </View>
          ) : (
            <Player
              onNext={skipToNext}
              style={styles.player}
              onPrevious={skipToPrevious}
              onTogglePlayback={togglePlayback}
            />
          )}
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
