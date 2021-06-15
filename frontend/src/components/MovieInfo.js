import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import { Link, useHistory  } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const MovieInfo = ({ match: { params: { id } }, favourites, setFavourites, setMovies }) => {
  const [x, setX] = useState(null)
  const [spinnerStatus, setSpinnerStatus] = useState(true);
  const [displayForm, setDisplayForm] = useState(false)
  const [ratingss, setRatingss] = useState('1')
  // const [ratingStart, setRatingStart] = useState(0)

  let history = useHistory();

  useEffect(() => axios.get(`http://localhost:5000/movie/${id}`).then((resp) => {
    setX(resp.data)
    setSpinnerStatus(false)
  }).catch(err => {
    console.log(err.message)
    setSpinnerStatus(false)
  }
  ), [id]);

  async function deleteMovie(x) {
    await axios.delete(`http://localhost:5000/movie/${x.id}`)
    alert(`Pomyślnie usunięto film ${x.title}`)
    await axios.get('http://localhost:5000/movies').then(resp => {
            setMovies([...resp.data])})
    history.push("/");          
  }

  const updateRating = (x) => {
    axios.patch(`http://localhost:5000/movie/${x.id}/rate?score=${ratingss}`).then(() => {
      axios.get(`http://localhost:5000/movie/${x.id}`).then(resp => {
            setX({...resp.data})
            alert(`Pomyślnie oddano głos`)
            axios.get("http://localhost:5000/movies/").then(r => {
              setMovies([...r.data])
            })
    }).catch((err) => {console.log(err)})
    })   
  }

  const starss = (x) => {
    const filled = (((Math.round(x.rating * 100) / 100) % 1) * 10) >= 5 ? Math.ceil(x.rating) : Math.floor(x.rating)
    const unfilled = (5 - filled)
    const items_filled = new Array(filled).fill(null);
    const items_unfilled = new Array(unfilled).fill(null);

    return (
      <>
        <div className='rating'>
          {
            items_filled.map((_, idx) => <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>)

          }
          {
            items_unfilled.map((_, idx) => <svg key={idx + 7} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>)
          }
        </div>
      </>
    )

  }


  const validateTitle = (value) => {
    let error;
    if (!value) {
      error = 'Pole wymagane';
    } else if (parseInt(value)) {
      error = 'Tytuł musi być typu String';
    }
    return error;
  }

  const validateDirector = (value) => {
    let error;
    if (!value) {
      error = 'Pole wymagane';
    } else if (parseInt(value)) {
      error = 'Reżyser musi być typu String';
    }
    return error;
  }

  const validateYear = (value) => {
    let error;
    if (value === '') {
      error = 'Pole wymagane';
    } else if (!parseInt(value)) {
      error = 'Opis musi być typu Number';
    }
    return error;
  }

  const validateDescription = (value) => {
    let error;
    if (!value) {
      error = 'Pole wymagane';
    } else if (parseInt(value)) {
      error = 'Opis musi być typu String';
    }
    return error;
  }

  const validateGenre = (value) => {
    let error;
    if (!value) {
      error = 'Pole wymagane';
    } else if (parseInt(value)) {
      error = 'Gatunek musi być typu String';
    }
    return error;
  }

  const validateImage = (value) => {
    if (value !== '') {
      let error;
      if (!/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm.test(value)) {
        error = 'Podaj prawidłowy format URL';
      }
      return error;
    }
  }




    const formAdd = () => {
      return (displayForm ?
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <Formik
            initialValues={{
              title: x.title,
              director: x.director,
              year: x.year,
              description: x.description,
              genre: x.genre,
              image_url: x.image_url
            }}
            onSubmit={values => {
              axios.put(`http://localhost:5000/movie/${id}`, values).then(data => {
                setX((oldValues) => ({...oldValues, ...values}))
                alert(`Pomyślnie zaktualizowano film: ${values.title}`);
                setDisplayForm(false)
            }).catch(error => {
              console.log(error.response.data.error)
              let yearr = new Date().getFullYear()
              values.year > yearr ? alert(`Nie można podać roku wydania większego niż ${yearr}.`) : alert(`Film o podanej nazwie już istnieje w bazie.`)
              })

            }}
          >

            {({ errors, touched, isValidating }) => (
              <Form>
              <div className='fieldd h-100 d-flex flex-column justify-content-center align-items-end'>
                <div className='fieldd formss d-flex flex-row justify-content-start align-items-start'>
                  <span className="badge badge-pill badge-light">Tytuł</span>
                  <div className='d-flex flex-column'>
                  <Field name="title" validate={validateTitle} />
                  {errors.title && touched.title ? (
                    <div>{errors.title}</div>
                  ) : null}
                  </div>
                </div>
                <div className='fieldd d-inline-flex flex-wrap justify-content-start align-items-start'>
                  <span className="badge badge-pill badge-light">Reżyser</span>
                  <div className='d-flex flex-column'>
                  <Field name="director" validate={validateDirector} />
                  {errors.director && touched.director ? (
                    <div>{errors.director}</div>
                  ) : null}
                  </div>
                </div>
                <div className='fieldd d-inline-flex flex-wrap justify-content-start align-items-start'>
                  <span className="badge badge-pill badge-light">Rok</span>
                  <div className='d-flex flex-column'>
                  <Field type="number" name="year" validate={validateYear} />
                  {errors.year && touched.year ? (
                    <div>{errors.year}</div>
                  ) : null}
                  </div>
                </div>
                <div className='fieldd d-inline-flex flex-wrap justify-content-start align-items-start'>
                  <span className="badge badge-pill badge-light">Opis</span>
                  <div className='d-flex flex-column'>
                  <Field name="description" validate={validateDescription} />
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                  </div>
                </div>
                <div className='fieldd d-inline-flex flex-wrap justify-content-start align-items-start'>
                  <span className="badge badge-pill badge-light">Gatunek</span>
                  <div className='d-flex flex-column'>
                  <Field name="genre" validate={validateGenre} />
                  {errors.genre && touched.genre ? <div>{errors.genre}</div> : null}
                  </div>
                </div>
                <div className='fieldd d-inline-flex flex-wrap justify-content-start align-items-start'>
                  <span className="badge badge-pill badge-light">Okładka [URL]</span>
                  <div className='d-flex flex-column'>
                  <Field name="image_url" validate={validateImage} />
                  {errors.image_url && touched.image_url ? <div>{errors.image_url}</div> : null}
                  </div>
                </div>
                <div className='addmovie w-100 d-flex flex-wrap justify-content-center align-items-center'>
                  <Button type="submit" variant="outline-success" >Zaktualizuj</Button>
                 </div>
              </div>
            </Form>

            )}

          </Formik>
        </div>
        : '')
    }

    const formRate = () => {
        return(
          <div className='addrate d-flex flex-row'>
            <select onChange={(e) => {
              const selectedOption = e.target.value;
              setRatingss(selectedOption)
            }}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <div className='ratebutton'>
            <Button size='sm' variant="info" onClick={() => {
                updateRating(x)
            }}>Oddaj głos</Button>
            </div>
          </div>
        )
    }

  if (spinnerStatus) {
    return <div className='loadings d-flex justify-content-center align-items-center'>
      <Spinner animation="border" variant="light" className="sanim" />
    </div>
  } else if (x === null) {
    return <div className='d-flex flex-column justify-content-center align-items-center'><h1 className="error">Brak wyników...</h1> <Link to="/">
      <Button variant="outline-success" className="backb">Wróć na stronę główną</Button>
    </Link> </div>
  } else {
    let fav_ids = favourites.map(x => x.id)
    return <div className="allmoviedata d-flex flex-row justify-content-center align-items-center">
      <div className="moviedata d-flex flex-column justify-content-center align-items-center">
        <img src={x.image_url !== null && x.image_url !== ''
                                            ? x.image_url : 'https://i.ibb.co/17wwzDF/no-image.jpg'} alt='pic'></img>
        {
          fav_ids.includes(x.id) ?
            <Button variant="outline-light" onClick={() => setFavourites(favourites.filter(y => y.id !== x.id))} className="favb">Usuń z ulubionych</Button> :
            <Button variant="outline-light" onClick={() => setFavourites([...favourites, x])} className="favb">Dodaj do ulubionych</Button>
        }
        <Link to="/">
          <Button variant="outline-success" className="backb">Wróć na stronę główną</Button>
        </Link>
        <Button variant="outline-warning" onClick={() => {
          setDisplayForm(displayForm ? false : true)
        }} className="backb">{displayForm ? 'Zakończ edycję' : 'Edytuj film'}</Button>
        <Button variant="outline-danger" onClick={() => deleteMovie(x)} className="backb">Usuń film</Button>
      </div>
      {
        displayForm ? formAdd() :
          <div className="moviedata">
            <p>Tytuł: {x.title}</p>
            <p>Reżyser: {x.director}</p>
            <p>Rok: {x.year}</p>
            <p>Opis: {x.description}</p>
            <p>Gatunek: {x.genre}</p>
            <p>Ocena: {Math.round(x.rating * 100) / 100}</p>
            {starss(x)}
            <div>
            {formRate()}
            </div>
          </div>
      }
    </div>
  }

}

export default MovieInfo;
