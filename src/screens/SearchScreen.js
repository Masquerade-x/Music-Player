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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

export default function PlaylistScreen({navigation}) {
  const playbackState = usePlaybackState();
  const [songs, setSongs] = useState();
  const [searchedSongs, setSearchedSongs] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const jsonValue = await AsyncStorage.getItem('@songs');
      let jsonData = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log(jsonData);
      setSongs(jsonData);
    } catch (e) {
      // error reading value
    }
  }

  const renderItem = (i) => {
    return (
      <TouchableOpacity
        key={i.item.id}
        style={styles.card}
        onPress={() => navigation.navigate('Home', {currentTrack: i.item})}>
        <Text style={{color: 'white', fontSize: 18}}>{i.item.filename}</Text>
      </TouchableOpacity>
    );
  };

  const searchSong = () => {
    let recievedSong = songs.filter(
      (i) => i.filename.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1,
    );
    setSearchedSongs(recievedSong);
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#808080'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#404040'}}>
        <ImageBackground
          style={styles.img}
          source={require('../assets/images/guitar.jpg')}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              width: '100%',
              flex: 1,
            }}>
            <Searchbar
              iconColor="white"
              onSubmitEditing={searchSong}
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
            />
            <FlatList
              data={
                searchedSongs === '' || searchQuery === ''
                  ? songs
                  : searchedSongs
              }
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: 150,
                paddingHorizontal: 10,
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
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
    marginVertical: 10,
    width: '95%',
    height: 50,
    justifyContent: 'center',
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
