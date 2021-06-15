import React, { useState } from 'react';
import MoreInfo from './MoreInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const MovieList = (props) => {

    const [currentPage, setCurrentPage] = useState(0)
    const [deleted, setDeleted] = useState(false)
    const [toDeleteFlag, setToDeleteFlag] = useState(false)
    const [deletedList, setDeletedList] = useState([])

    async function deleteMultipleMovies(deletedList) {
        for await (const idx of deletedList) {
            axios.delete(`http://localhost:5000/movie/${idx}`)
          }
        alert(`Ilość usuniętych filmów: ${deletedList.length}`)
        await axios.get('http://localhost:5000/movies').then(resp => {
            props.setmovies([...resp.data])
          })
        setToDeleteFlag(false)
        setDeleted(false)
    }

    if (props.movies.length > 8) {
        let page_numbers = Math.ceil(props.movies.length / 8);
        let sliced_movies = []
        for (let i = 0, k = 8, l = 0; i < page_numbers; i++, k += 8, l += 8) {
            sliced_movies.push(props.movies.slice(l, k))
        }

        return (
            <>
                <div className='deletemultiple'>
                    {deleted ? <div><Button className="pgnb1" key='stop' variant="outline-light" onClick={() => { setDeleted(false); setToDeleteFlag(false) }}>
                        Przestań usuwać
                </Button>
                        <Button className="pgnb1" key='start' variant="outline-danger" onClick={() => {
                            deleteMultipleMovies(deletedList)
                        }} >
                            Usuń
                </Button>
                    </div>
                        :
                        <Button className="pgnb1" variant="outline-light" key='multiple' onClick={() => { setDeleted(true); setToDeleteFlag(true) }}>
                            Usuń kilka filmów
                </Button>}
                </div>
                <div className='h-100 w-100 d-inline-flex flex-wrap justify-content-start align-items-start'>
                    {   
                        
                        sliced_movies[currentPage].map((movie, idx) => {
                            return <div key={idx}><div className="image-container" key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={
                                        // movie.image_url
                                        movie.image_url !== null && movie.image_url !== ''
                                            ? movie.image_url : 'https://i.ibb.co/17wwzDF/no-image.jpg'
                                    } alt="movie"></img>
                                </Link>
                                <div className="overlay d-flex align-items-center justify-content-center">
                                    <MoreInfo title={movie.title} rating={movie.rating} rating_count={movie.rating_count} />
                                </div>
                            </div>
                                <div className='todelete'>
                                    {toDeleteFlag ? (deletedList.includes(movie.id) ? <Button size="sm" variant="outline-warning" onClick={() => {
                                        const cos = deletedList.filter(y => y !== movie.id)
                                        setDeletedList(cos)

                                    }
                                    }>
                                        Nie usuwaj
                        </Button> : <Button size="sm" variant="warning" onClick={() => {
                                        const cos = [...deletedList, movie.id]
                                        setDeletedList(cos)
                                    }
                                    }>
                                        Dodaj do usunięcia
                        </Button>
                                    ) : ''}
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="pgn h-100 w-100 d-inline-flex flex-wrap justify-content-center align-items-start">

                    {
                        sliced_movies.map((page, idx) => {
                            if (idx === currentPage) {
                                return <Button className="pgnb1" variant="light" key={idx}
                                    onClick={(e) => setCurrentPage(sliced_movies.indexOf(page))}
                                >
                                    {sliced_movies.indexOf(page) + 1}
                                </Button>
                            } else {
                                return <Button className="pgnb1" variant="outline-light" key={idx}
                                    onClick={(e) => setCurrentPage(sliced_movies.indexOf(page))}
                                >
                                    {sliced_movies.indexOf(page) + 1}
                                </Button>
                            }

                        })
                    }
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className='deletemultiple'>
                    {deleted ? <div><Button className="pgnb1" variant="outline-light" onClick={() => { setDeleted(false); setToDeleteFlag(false) }}>
                        Przestań usuwać
                    </Button>
                        <Button className="pgnb1" variant="outline-danger" onClick={() => {
                            deleteMultipleMovies(deletedList)
                        }} >
                            Usuń
                    </Button>
                    </div>
                        :
                        <Button className="pgnb1" variant="outline-light" onClick={() => { setDeleted(true); setToDeleteFlag(true) }}>
                            Usuń kilka filmów
                    </Button>}
                </div>
                <div className='h-100 w-100 d-inline-flex flex-wrap justify-content-start align-items-start'>
                    {
                        props.movies.map((movie, idx) => {
                            return <div key={idx}><div className="image-container" key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={movie.image_url !== null && movie.image_url !== ''
                                            ? movie.image_url : 'https://i.ibb.co/17wwzDF/no-image.jpg'} alt="movie"></img>
                                </Link>
                                <div className="overlay d-flex align-items-center justify-content-center">
                                <MoreInfo title={movie.title} rating={movie.rating} rating_count={movie.rating_count} />
                                </div>
    
                            </div>
                                <div className='todelete'>
                                    {toDeleteFlag ? (deletedList.includes(movie.id) ? <Button size="sm" variant="outline-warning" onClick={() => {
                                        const cos = deletedList.filter(y => y !== movie.id)
                                        setDeletedList(cos)
    
                                    }
                                    }>
                                        Nie usuwaj
                            </Button> : <Button size="sm" variant="warning" onClick={() => {
                                        const cos = [...deletedList, movie.id]
                                        setDeletedList(cos)
                                    }
                                    }>
                                        Dodaj do usunięcia
                            </Button>
                                    ) : ''}
                                </div>
                            </div>
                        })
                    }
                </div>
            </>
        )
    }

}

export default MovieList;
