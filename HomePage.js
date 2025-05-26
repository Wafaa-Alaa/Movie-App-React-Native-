import React, { useState, useContext, useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, TextInput, View, Text, FlatList, Image } from 'react-native';
import { List } from 'react-native-paper';
import { MyContext } from './ContextApi/MovieContext'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
    const { data, favoriteData, setFavourite, imgUrl } = useContext(MyContext);
    const [movies, setMovies] = useState(data);
    const [filteredMovies, setFilteredMovies] = useState(data);
    const [input, setInput] = useState('');
    const [showFilter, setShowFilter] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All Movies');
    const navigation = useNavigation();

    useEffect(() => {
        setMovies(data);
        setFilteredMovies(data);
    }, [data]);

    const filterOptions = [
        {
            id: '1',
            title: 'Popular',
            sortFn: (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
        },
        {
            id: '2',
            title: 'Top Movies',
            sortFn: (a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average)
        },
        {
            id: '3',
            title: 'Upcoming Movies',
            filterFn: (item) => {
                if (!item.release_date) return false;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const movieDate = new Date(item.release_date);
                return movieDate > today;
            }
        },
        {
            id: '4',
            title: 'Now Playing',
            filterFn: (item) => {
                if (!item.release_date) return false;
                const today = new Date();
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(today.getMonth() - 1);
                const movieDate = new Date(item.release_date);
                return movieDate <= today && movieDate >= oneMonthAgo;
            }
        },
    ];

    const InputHandel = (val) => {
        setInput(val);
        if (val === '') {
            applyCurrentFilter(data);
        } else {
            const filtered = data.filter(item =>
                item.title.toLowerCase().includes(val.toLowerCase())
            );
            applyCurrentFilter(filtered);
        }
    };

    const clearSearch = () => {
        setInput('');
        applyCurrentFilter(data);
    };

    const applyCurrentFilter = (dataToFilter) => {
        if (activeFilter === 'All Movies') {
            setFilteredMovies(dataToFilter);
            return;
        }

        const currentFilter = filterOptions.find(f => f.title === activeFilter);
        if (!currentFilter) {
            setFilteredMovies(dataToFilter);
            return;
        }

        let result = [...dataToFilter];
        if (currentFilter.filterFn) {
            result = result.filter(currentFilter.filterFn);
        } else if (currentFilter.sortFn) {
            result = result.sort(currentFilter.sortFn);
        }
        setFilteredMovies(result);
    };

    const handleFilterPress = (filter) => {
        setActiveFilter(filter.title);
        setShowFilter(false);

        if (filter.title === 'All Movies') {
            setFilteredMovies(data);
            return;
        }

        let result = [...data];
        if (filter.filterFn) {
            result = result.filter(filter.filterFn);
        } else if (filter.sortFn) {
            result = result.sort(filter.sortFn);
        }
        setFilteredMovies(result);
    };

    const addFavourite = (item) => {
        const isFavorite = favoriteData.some(fav => fav.id === item.id);

        if (isFavorite) {
            setFavourite(favoriteData.filter(fav => fav.id !== item.id));
        } else {
            setFavourite([...favoriteData, item]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor="#fff"
                        value={input}
                        onChangeText={InputHandel}
                        style={styles.input}
                    />
                    {input.length > 0 && (
                        <Pressable onPress={clearSearch} style={styles.clearButton}>
                            <Icon name="close" size={20} color="#fff" />
                        </Pressable>
                    )}
                </View>

                <Pressable
                    onPress={() => {
                        setShowFilter(!showFilter);
                        clearSearch();
                    }}
                    style={styles.filterButton}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.filterButtonText}>{activeFilter}</Text>
                        <Icon
                            name={showFilter ? "arrow-drop-up" : "arrow-drop-down"}
                            size={20}
                            color="#fff"
                        />
                    </View>
                </Pressable>
            </View>

            {showFilter && (
                <>
                    <Pressable
                        style={styles.overlay}
                        onPress={() => setShowFilter(false)}
                    />
                    <View style={styles.filterListContainer}>
                        <List.Section style={styles.filterList}>
                            <List.Item
                                key="0"
                                title="All Movies"
                                titleStyle={styles.filterItemText}
                                onPress={() => handleFilterPress({ title: 'All Movies' })}
                                style={styles.listItem}
                            />
                            {filterOptions.map((item) => (
                                <List.Item
                                    key={item.id}
                                    title={item.title}
                                    titleStyle={styles.filterItemText}
                                    onPress={() => handleFilterPress(item)}
                                    style={styles.listItem}
                                />
                            ))}
                        </List.Section>
                    </View>
                </>
            )}

            <FlatList
                data={filteredMovies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => navigation.navigate('MovieDetails', item)}
                        style={styles.movieCard}
                    >
                        <Image
                            source={{ uri: `${imgUrl}${item.poster_path}` }}
                            style={styles.cardImage}
                            resizeMode="cover"
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                            <View style={styles.cardDetails}>
                                <Text style={styles.cardDate}>{item.release_date}</Text>
                                <View style={styles.ratingContainer}>
                                    <Icon name="star" size={14} color="#FFD700" />
                                    <Text style={styles.cardRating}>{item.vote_average}</Text>
                                </View>
                            </View>
                            <View style={styles.favoriteButton}>
                                <Icon
                                    onPress={() => addFavourite(item)}
                                    name={favoriteData.some(fav => fav.id === item.id) ? "favorite" : "favorite-border"}
                                    size={24}
                                    color={favoriteData.some(fav => fav.id === item.id) ? "red" : "#fff"}
                                    style={styles.favoriteIcon}
                                />
                            </View>
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No movies found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#1E1E1E',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    input: {
        flex: 1,
        padding: 10,
        paddingRight: 35,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#252525',
        color: '#fff',
    },
    clearButton: {
        position: 'absolute',
        right: 20,
        padding: 5,
    },
    filterButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: '#252525',
    },
    filterButtonText: {
        color: '#fff',
    },
    filterListContainer: {
        position: 'absolute',
        top: 70,
        right: 16,
        zIndex: 100,
    },
    filterList: {
        backgroundColor: '#252525',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        width: 200,
        maxHeight: 300,
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingVertical: 8,
    },
    filterItemText: {
        color: '#fff',
        fontSize: 14,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 50,
    },
    movieCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        margin: 16,
        marginBottom: 8,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    cardImage: {
        width: '100%',
        height: 220,
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardDate: {
        fontSize: 14,
        color: '#B3B3B3',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardRating: {
        fontSize: 14,
        marginLeft: 4,
        marginBottom: 2,
        color: '#FFD700',
        fontWeight: 'bold',
    },
    favoriteButton: {
        position: 'absolute',
        right: 16,
        bottom: 1,
        marginBottom: 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        color: '#B3B3B3',
    },
});

export default HomePage;