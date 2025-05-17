import React from 'react';
import { SectionList, StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';

const Task3SectionList = () => {
  const images = [
    'https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png',
    'https://www.citypng.com/public/uploads/preview/free-round-flat-male-portrait-avatar-user-icon-png-701751695032786rubzjpxmv7.png',
    'https://cdn-icons-png.flaticon.com/512/4042/4042376.png',
    'https://cdn-icons-png.flaticon.com/512/3981/3981379.png',
  ];

  const sections = [
    {
      id: "0",
      title: "basic comps",
      data: [
        { id: "0", text: "View", image: images[0] },
        { id: "1", text: "Text", image: images[1] },
        { id: "2", text: "Image", image: images[2] },
      ]
    },
    {
      id: "1",
      title: "List comps",
      data: [
        { id: "3", text: "ScrollView", image: images[3] },
        { id: "4", text: "ListView", image: images[0] },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SectionList 
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image 
                source={{ uri: item.image }}
                style={styles.itemImage}
                width={40}
                height={40}
              />
              <Text style={styles.itemText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
    marginTop:50,
  },
  container: {
    flex: 1,
  
  },
  headerContainer: {
    backgroundColor: "steelblue",
    padding: 15,
  },
  header: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "skyblue",
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  itemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  }
});

export default Task3SectionList;