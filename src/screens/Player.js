import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import {IconButton} from 'react-native-paper';

function ProgressBar() {
  const progress = useTrackPlayerProgress();

  return (
    <View style={styles.progress}>
      <View style={{flex: progress.position, backgroundColor: 'white'}} />
      <View
        style={{
          flex: progress.duration - progress.position,
          backgroundColor: 'grey',
        }}
      />
    </View>
  );
}

export default function Player(props) {
  const playbackState = usePlaybackState();
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState('');
  useTrackPlayerEvents(['playback-track-changed'], async (event) => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artist, artwork} = track || {};
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const {style, onNext, onPrevious, onTogglePlayback} = props;

  var middleButtonText = 'play-circle';

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = 'pause';
  }

  return (
    <View style={[styles.card, style]}>
      <Image
        style={styles.cover}
        source={require('../assets/images/guitar.jpg')}
      />
      <ProgressBar />
      <Text style={styles.title}>{trackTitle}</Text>
      <Text style={styles.artist}>{trackArtist}</Text>
      <View style={styles.controls}>
        <IconButton
          icon="skip-previous-circle"
          color={'white'}
          size={35}
          onPress={onPrevious}
        />
        <IconButton
          icon={middleButtonText}
          color={'white'}
          size={35}
          onPress={onTogglePlayback}
        />
        <IconButton
          icon="skip-next-circle"
          color={'white'}
          size={35}
          onPress={onNext}
        />
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

Player.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'red',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 1},
  },
  cover: {
    width: '70%',
    height: '30%',
    backgroundColor: 'yellow',
    borderRadius: 30,
  },
  progress: {
    height: 2,
    width: '70%',
    marginTop: 20,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
    color: 'white',
  },
  artist: {
    fontWeight: 'bold',
  },
  controls: {
    marginVertical: 40,
    flexDirection: 'row',
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
});
