import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Linking,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieDetailsPage = ({ route }) => {
  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    release_date,
    original_language,
    popularity,
    vote_count,
    id,
    genres = ['Adventure', 'Comedy', 'Fantasy', 'Family']
  } = route.params;

  const [loading, setLoading] = useState(false);
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const screenWidth = Dimensions.get('window').width;

  const handleImagePress = async () => {
    setLoading(true);
    try {
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}+trailer`;

      const supported = await Linking.canOpenURL(youtubeUrl);

      if (supported) {
        await Linking.openURL(youtubeUrl);
      } else {
        Alert.alert(
          'Trailer Not Available',
          'Would you like to search for the trailer in your browser?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Browser', onPress: () => Linking.openURL(youtubeUrl) }
          ]
        );
      }
    } catch (error) {
      console.error('Error opening trailer:', error);
      Alert.alert('Error', 'Failed to open trailer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
        <Image
          source={{ uri: `${imgUrl}${backdrop_path}` }}
          style={[styles.backdropImage, { width: screenWidth }]}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Icon name="play-circle-filled" size={60} color="rgba(255, 255, 255, 0.8)" />
        </View>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
          <Image
            source={{ uri: `${imgUrl}${poster_path}` }}
            style={styles.posterImage}
            resizeMode="cover"
          />
          <View style={styles.smallPlayButton}>
            <Icon name="play-circle-filled" size={30} color="rgba(255, 255, 255, 0.8)" />
          </View>
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{release_date} • {original_language.toUpperCase()}</Text>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>{vote_average}/10</Text>
            <Text style={styles.popularity}>({Math.round(popularity)} popularity)</Text>
          </View>

          <View style={styles.genreContainer}>
            {genres.map((genre, index) => (
              <View key={index} style={styles.genrePill}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overviewText}>{overview}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Icon name="date-range" size={20} color="#666" />
            <Text style={styles.detailText}>{release_date}</Text>
          </View>

          <View style={styles.detailItem}>
            <Icon name="language" size={20} color="#666" />
            <Text style={styles.detailText}>{original_language.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Icon name="thumb-up" size={20} color="#666" />
          <Text style={styles.detailText}>{vote_average}/10 ({vote_count} votes)</Text>
        </View>
      </View>

      {loading && (
        <Modal transparent={true} visible={loading}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Loading trailer...</Text>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backdropImage: {
    height: 200,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30,
    marginTop: -30,
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 20,
    marginTop: -50,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  smallPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#B3B3B3',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#FFFFFF',
  },
  popularity: {
    marginLeft: 10,
    fontSize: 14,
    color: '#B3B3B3',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  genrePill: {
    backgroundColor: '#333333',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  overviewText: {
    fontSize: 15,
    color: '#E0E0E0',
    lineHeight: 22,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#E0E0E0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16
  }
});

export default MovieDetailsPage;