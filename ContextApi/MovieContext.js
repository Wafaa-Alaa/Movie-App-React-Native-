import React, { createContext, useState, useEffect } from 'react';

export const MyContext = createContext();

export const MovieContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [favoriteData, setFavourite] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=9eecc30ae89f253bce3cec4140734493'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const imgUrl = `https://image.tmdb.org/t/p/w500`;

  return (
    <MyContext.Provider value={{ data, setData, favoriteData, setFavourite, imgUrl }}>
      {children}
    </MyContext.Provider>
  );
};