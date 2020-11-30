import React, {useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  ImageBackground,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import MusicFiles from 'react-native-get-music-files';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  useResponsiveScreenWidth,
  useResponsiveScreenHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Player from './Player';
import BottomBar from '../components/BottomBar';
import {Searchbar, ProgressBar} from 'react-native-paper';

export default function PlaylistScreen({navigation}) {
  const playbackState = usePlaybackState();
  const [songs, setSongs] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
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
      ],
    });

    DeviceEventEmitter.addListener('onBatchReceived', (params) => {
      console.log(params.batch);
    });
  }, []);

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
    console.log(playListData);
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
  console.log(songs);

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

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#808080'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#404040'}}>
        <ImageBackground
          style={styles.img}
          source={require('../assets/images/guitar.jpg')}>
          {/* <Searchbar
            iconColor="white"
            // onSubmitEditing={}
            style={{
              elevation: 1,
              backgroundColor: '#1C1C1C',
              alignSelf: 'center',
              width: '90%',
              borderRadius: 50,
              marginTop: 20,
            }}
            color="white"
            placeholder="Search"
            placeholderTextColor="white"
            onChangeText={onChangeSearch}
            value={searchQuery}
          /> */}
          {/* <Player
            onNext={skipToNext}
            style={styles.player}
            onPrevious={skipToPrevious}
            onTogglePlayback={togglePlayback}
          /> */}

          {/* <Text style={styles.state}>{getStateName(playbackState)}</Text> */}
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

const styles = StyleSheet.create({
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
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
  card: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '50%',
    flexDirection: 'row',
    height: 250,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  backBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  player: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
});
