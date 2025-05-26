import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MovieApp from './MovieApp';
export default function App() {
  return (
    <View style={styles.container}>
     <MovieApp></MovieApp>
    </View>
  );
}


