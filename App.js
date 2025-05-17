import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task1 from './task1';
import Task2FlatList from './task2_flatList';
import Box from './box';
import Task3SectionList from './task3_sectionList';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Task1></Task1> */}
      {/* <Task2FlatList></Task2FlatList> */}
      {/* <Box></Box> */}
      <Text>hello</Text>

      {/* <Task3SectionList></Task3SectionList> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});