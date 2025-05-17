import React from 'react';
import { FlatList, StyleSheet, View, Text, SafeAreaView } from 'react-native';

const Task2FlatList = () => {
  const COLORS = [
    {colorName: 'Base03', hexCode: '#002b36'},
    {colorName: 'Base02', hexCode: '#073642'},
    {colorName: 'Base01', hexCode: '#586e75'},
    {colorName: 'Base00', hexCode: '#657b83'},
    {colorName: 'Base0', hexCode: '#839496'},
    {colorName: 'Base1', hexCode: '#93a1a1'},
    {colorName: 'Base2', hexCode: '#eee8d5'},
    {colorName: 'Base3', hexCode: '#fdf6e3'},
    {colorName: 'Yellow', hexCode: '#b58900'},
    {colorName: 'Orange', hexCode: '#cb4b16'},
    {colorName: 'Red', hexCode: '#dc322f'},
    {colorName: 'Magenta', hexCode: '#d33682'},
    {colorName: 'Cyan', hexCode: '#2aa198'},
    {colorName: 'Green', hexCode: '#859900'},
    {colorName: 'Orange', hexCode: '#cb4b17'},
    {colorName: 'Red', hexCode: '#dc3221'},
    {colorName: 'Magenta', hexCode: '#d33683'},
    {colorName: 'Cyan', hexCode: '#2aa199'},
    {colorName: 'Green', hexCode: '#859910'},
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList 
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        data={COLORS}
        renderItem={({item}) => (
          <View style={[styles.boxStyle, {backgroundColor: item.hexCode}]}>
            <Text style={styles.text}>{item.colorName + " " + item.hexCode}</Text>
          </View>
        )}
        ListHeaderComponent={
          <Text style={styles.headerText}>
            Here are some boxes of different colors
          </Text>
        }
        ListEmptyComponent={<Text>No Data</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    marginTop:40 ,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  boxStyle: {
    height: 80,
    paddingHorizontal: 15,
    marginHorizontal: 18,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 17,
    marginHorizontal: 17,
    marginBottom: 8,
    marginTop: 12,
    color: '#333',
    textAlign:'center',
  },
});

export default Task2FlatList;