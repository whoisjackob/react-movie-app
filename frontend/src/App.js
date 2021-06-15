import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import axios from 'axios';
import SortingButtons from "./components/SortingButtons";
import MoreInfo from "./components/MoreInfo";
import MovieInfo from "./components/MovieInfo";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import ViewFavourites from './components/ViewFavourites';
import AddMovie from './components/AddMovie';

function App() {
  const [spinnerStatus, setSpinnerStatus] = useState(true);
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])

  //sortowania
  const sortTitle = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.title > b.title
    );
    setMovies(new_movies)
  }

  const sortDirector = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.director > b.director
    );

    setMovies(new_movies)
  }

  const sortId = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.id > b.id
    ); 
    setMovies(new_movies)
  }

  const sortIdReversed = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.id < b.id
    );
    setMovies(new_movies)
  }

  const sortDate = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.year > b.year
    ); 
    setMovies(new_movies)
  }

  const sortDateReversed = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.year < b.year
    );
    setMovies(new_movies)
  }

  const fetchMovies = () => {
    axios.get('http://localhost:5000/movies').then(resp => {
      setMovies(resp.data)
      setSpinnerStatus(false)
    })
  }
  
  const sortRating = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.rating > b.rating
    );
    setMovies(new_movies)
  }

  const sortRatingReversed = (movies) => {
    const new_movies = [...movies].sort(
      (a, b) => a.rating < b.rating
    );
    setMovies(new_movies)
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
              <MovieListHeading heading='Filmy' />
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className="w-100 h-100 d-flex flex-row justify-content-center align-items-center">
              <SortingButtons movies={movies} idup={sortId} iddown={sortIdReversed} alf={sortTitle} sortd={sortDate} sortdrev={sortDateReversed} sortdir={sortDirector} sortrat={sortRating} sortratrev={sortRatingReversed}/>
            </div>
            <div className="favitems w-100 h-100 d-flex flex-column justify-content-center align-items-center">
              <AddMovie setmovies={setMovies}/>
              <ViewFavourites favourites={favourites} />
            </div>
            {spinnerStatus ? <div className='loadings d-flex justify-content-center align-items-center'>
              <Spinner animation="border" variant="light" className="sanim" />
            </div> : ''}
            <div className="h-100 w-100 d-inline-flex flex-wrap justify-content-start align-items-start">
              <MovieList searchValue={searchValue} movies={movies.filter(x => x.title.toLowerCase().includes(searchValue.toLowerCase()) || x.description.toLowerCase().includes(searchValue.toLowerCase()))} setmovies={setMovies} moreInfo={MoreInfo} />
            </div>
          </div>
        </Route>
        <Route exact path="/movie/:id" render={
          props => <div className='bordd'><MovieInfo {...props} favourites={favourites} setFavourites={setFavourites} setMovies={setMovies}/></div>
        } />
      </Switch>
    </Router>
  );
};

export default App;
