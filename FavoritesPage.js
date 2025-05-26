import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Image, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MyContext } from './ContextApi/MovieContext';

const FavoritesPage = () => {
    const { favoriteData, setFavourite, imgUrl } = useContext(MyContext);
    const [data, setData] = useState(favoriteData);

    useEffect(() => {
        setFavourite(favoriteData);
    }, [favoriteData]);

    const deleteFavourite = (id) => {
        const updatedData = favoriteData.filter(item => item.id !== id);
        setFavourite(updatedData);
        setData(updatedData);
    }

    if (favoriteData.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Image
                    source={require('./assets/Images/splash.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <Text style={styles.emptyText}>No favorites yet</Text>
                    <Text style={styles.emptySubText}>Add some movies to your favorites list</Text>
                </View>
            </View>
        );
    }

    return (
        <FlatList
            data={favoriteData}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <Image
                        source={{ uri: `${imgUrl}${item.poster_path}` }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.detail}>Release Date : {item.release_date}</Text>
                        <Text style={styles.detail}>Rating : {item.vote_average}/10</Text>
                        <Pressable
                            onPress={() => deleteFavourite(item.id)}
                            style={styles.deleteButton}
                        >
                            <Icon name="delete" size={20} color="white" />
                            <Text style={styles.deleteText}>Remove</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        />
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
        backgroundColor: '#121212',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: 90,
        height: 120,
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#FFFFFF',
    },
    detail: {
        fontSize: 14,
        color: '#B3B3B3',
        marginBottom: 3,
    },
    deleteButton: {
        width: 90,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        alignSelf: 'flex-end',
        backgroundColor: 'red',
        borderRadius: 6,
    },
    deleteText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    backgroundImage: {
        width: width,
        height: height,
        position: 'absolute',
        opacity: 0.7,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptySubText: {
        fontSize: 16,
        color: '#B3B3B3',
    }
});

export default FavoritesPage;