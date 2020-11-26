/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  useResponsiveScreenWidth,
  useResponsiveScreenHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {IconButton, Searchbar, Card, Button, Title} from 'react-native-paper';
import BottomBar from '../components/BottomBar';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import ActionSheet from 'react-native-actions-sheet';

export default function YoutubeScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState();
  const [thumbnails, setThumbnails] = useState();
  const onChangeSearch = (query) => setSearchQuery(query);
  const actionSheetRef = useRef(null);

  const Search = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: `https://second.cadence.moe/api/v1/search?q=${searchQuery}`,
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(thumbnails);

  const renderItem = (i) => {
    console.log(i, 'i');
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          actionSheetRef.current?.setModalVisible();
          setThumbnails(i);
        }}>
        <Image
          resizeMode="contain"
          source={{uri: i.item?.videoThumbnails[0].url}}
          style={styles.img}
        />
        <View
          style={{
            position: 'absolute',
            justifyContent: 'flex-end',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            paddingVertical: 20,
            paddingHorizontal: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontSize: 15,
              width: '86%',
            }}>
            {i.item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  let minData = data?.slice(0, 20);

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#808080'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#404040'}}>
        <Searchbar
          iconColor="white"
          onSubmitEditing={Search}
          style={{
            elevation: 1,
            backgroundColor: '#1C1C1C',
            alignSelf: 'center',
            width: '90%',
            borderRadius: 50,
            marginVertical: 20,
          }}
          color="white"
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading ? (
            <LottieView
              style={{
                height: responsiveScreenHeight(25),
                width: responsiveScreenWidth(25),
              }}
              source={require('../assets/lottieFiles/rs.json')}
              autoPlay
              duration={2000}
            />
          ) : (
            <FlatList
              numColumns={2}
              data={minData}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: 150}}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <ActionSheet
          containerStyle={styles.actions}
          ref={actionSheetRef}
          bounceOnOpen={true}
          bounciness={20}
          elevation={10}
          defaultOverlayOpacity={0.1}>
          <ImageBackground
            source={require('../assets/images/guitar.jpg')}
            style={{height: 600}}>
            <View style={styles.container}>
              <Image
                source={{uri: thumbnails?.item.videoThumbnails[0].url}}
                style={styles.actionImg}
              />
              <View
                style={{
                  alignSelf: 'center',
                  width: '80%',
                  paddingVertical: 25,
                  paddingHorizontal: 5,
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {thumbnails?.item.title}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </ActionSheet>
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
  img: {
    width: responsiveScreenWidth(50),
    height: 250,
    resizeMode: 'cover',
  },
  card: {
    alignSelf: 'center',
    marginVertical: 2,
    marginHorizontal: 2,
    width: '50%',
    flexDirection: 'row',
    height: 250,
  },
  actions: {
    backgroundColor: '#404040',
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
  actionImg: {
    width: responsiveScreenWidth(80),
    height: responsiveScreenHeight(30),
    alignSelf: 'center',
    elevation: 1,
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 30,
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
});
