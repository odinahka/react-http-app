import React, { useState, Fragment, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchMoviesHandler()
  }, []);

  const fetchMoviesHandler = useCallback( async ()  => {
    setIsLoading(true);
    setError(null);
    try{
 const response = await fetch('https://swapi.dev/api/films/')
 if(!response.ok){
   throw new Error(`${response.status} - an error occured`)
 }
 const data = await response.json();
 const transformedMovies = data.results.map((movie)=> { return{
    id: movie.episode_id,
    title: movie.title,
    openingText: movie.opening_crawl,
    releaseDate: movie.release_date
  }});
 
   setMovies(transformedMovies);
  }
  catch(exception){
    setError(exception.message)
  }
  setIsLoading(false);
 }, []);
   
 let content = <p>No movie found</p>
 if(error) {
   content = <p>{error}</p>
 }
if(movies.length > 0){
 content = <MoviesList movies={movies} />
}
if(isLoading){
 content = <p>Loading...</p>
}
  return (
    <Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {content}
      </section>
    </Fragment>
  );
}

export default App;
