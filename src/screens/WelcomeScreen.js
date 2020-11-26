import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  useResponsiveScreenWidth,
  useResponsiveScreenHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LottieView from 'lottie-react-native';

export default function WelcomeScreen({navigation}) {
  function timeout() {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 4000);
  }

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#1C1C1C'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        {timeout()}
        <ImageBackground
          source={require('../assets/images/head.png')}
          style={styles.img}>
          <Image
            source={require('../assets/images/wave.png')}
            style={styles.waveImg}
          />
          <View style={styles.container}>
            <View style={{top: 200}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: responsiveFontSize(1.8),
                  alignSelf: 'flex-start',
                  fontWeight: 'bold',
                }}>
                The
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: responsiveFontSize(6),
                  fontWeight: 'bold',
                }}>
                MUSIC<Text style={{color: '#85c034'}}>IDE</Text>
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: responsiveFontSize(1.8),
                  alignSelf: 'flex-end',
                  fontWeight: 'bold',
                }}>
                is your music
              </Text>
            </View>
            <View style={styles.loader}>
              <LottieView
                style={{
                  height: responsiveScreenHeight(30),
                  width: responsiveScreenWidth(30),
                }}
                source={require('../assets/lottieFiles/rs.json')}
                autoPlay
                duration={2000}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  img: {
    height: responsiveScreenHeight(90),
    width: responsiveScreenWidth(100),
    alignItems: 'center',
    backgroundColor: 'black',
  },
  waveImg: {
    height: responsiveScreenHeight(40),
    width: responsiveScreenWidth(100),
    opacity: 0.8,
    top: 70,
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
  loader: {
    position: 'absolute',
    bottom: 0,
  },
});
