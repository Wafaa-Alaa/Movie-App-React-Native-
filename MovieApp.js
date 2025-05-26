import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { MovieContext } from './ContextApi/MovieContext';
import HomeDetailPage from './Home&DetailsPage';
import FavoritesPage from './FavoritesPage';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('./task/assets/Images/IconMovie.png')}
          style={styles.drawerImage}
          resizeMode="cover"
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FFFFFF',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#333333',
    notification: '#FF0000',
  },
};

const MovieApp = () => {
  return (
    <MovieContext>
      <NavigationContainer theme={CustomDarkTheme}>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1E1E1E',
            },
            headerTintColor: '#FFFFFF',
            drawerStyle: {
              backgroundColor: '#1E1E1E',
              width: 240,
            },
            drawerActiveTintColor: '#FFFFFF',
            drawerInactiveTintColor: '#B3B3B3',
            drawerActiveBackgroundColor: '#333333',
          }}
        >
          <Drawer.Screen
            name="Home"
            component={HomeDetailPage}
            options={{
              title: 'Movie Browser',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Drawer.Screen
            name="Favorites"
            component={FavoritesPage}
            options={{
              title: 'My Favorites',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </MovieContext>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  drawerImage: {
    height: '100%',
    width: '100%',
  },
});

export default MovieApp;