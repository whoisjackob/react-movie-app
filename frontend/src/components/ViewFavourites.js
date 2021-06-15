import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


const ViewFavourites = (props) => {
    const [flag, setFlag] = useState(false)

    return (
        <>
            <Button size="sm" variant="danger" className="favb"
                onClick={() => setFlag(!flag)
                }>
                {!flag ? 'Pokaż ulubione' : 'Ukryj ulubione'}

            </Button>
            {

                flag ?
                    <div className="d-inline-flex flex-wrap justify-content-center align-items-start">


                        {props.favourites.length === 0 ? <h1>Brak ulubionych filmów...</h1> :
                            <>
                                <div className='favitemst d-flex flex-column justify-content-start align-items-start'>
                                    <div className='col d-inline-flex flex-wrap justify-content-start align-items-start'>
                                        <h1>Ulubione</h1>
                                    </div>
                                    <div className='d-inline-flex flex-wrap justify-content-start align-items-start'>
                                        {props.favourites.map((movie, idx) => {
                                            return <div key={idx} className="image-container2 ">
                                                <Link to={`/movie/${movie.id}`}>
                                                    <img src={movie.image_url !== null && movie.image_url !== ''
                                            ? movie.image_url : 'https://i.ibb.co/17wwzDF/no-image.jpg'} alt="movie"></img>
                                                </Link>
                                            </div>
                                        })
                                        }
                                    </div>
                                </div>
                            </>

                        }
                    </div> : ''


            }
        </>

    )
}

export default ViewFavourites;