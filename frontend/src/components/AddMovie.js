import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { Formik, Form, Field } from 'formik';

const AddMovie = (props) => {

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
    if (!value) {
      error = 'Pole wymagane';
    } else if (!parseInt(value)) {
      error = 'Rok musi być typu Number'
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
    // let error;
    // if (!value) {
    //   error = 'Pole wymagane';
    // } else if (parseInt(value)) {
    //   error = 'Gatunek musi być typu String';
    // }
    // return error;
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

  const [displayForm, setDisplayForm] = useState(false)

  const formAdd = () => {
    return (displayForm ?
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <Formik
          initialValues={{
            title: '',
            director: '',
            year: 2021,
            description: '',
            genre: null,
            image_url: ''
          }}
          onSubmit={async values => {
            try {
              await axios.post('http://localhost:5000/movie', values)
              alert(`Pomyślnie dodano film: ${values.title}`)
              setDisplayForm(false)
              await axios.get('http://localhost:5000/movies').then(resp => {
                props.setmovies([...resp.data])
              })
            } catch (err) {
              if (err.response.data === 'TITLE_DUPLICATE') {
                alert('Film o podanej nazwie już istnieje w bazie.')
              } 

              // alert(`Film o nazwie "${values.title}" już istnieje w bazie.`)
            }
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
                  <Button type="submit" variant="outline-success" >Dodaj</Button>
                 </div>
              </div>
            </Form>

          )}

        </Formik>
      </div>
      : '')
  }

  return (
    <div className='d-inline-flex flex-column justify-content-center align-items-center'>
      <Button variant={displayForm ? 'outline-light' : 'light'} className="addb" onClick={() => {
        displayForm ? setDisplayForm(false) : setDisplayForm(true)
      }}>{displayForm ? 'Ukryj' : 'Dodaj nowy film'}</Button>
      {formAdd()}

    </div>
  )
};


export default AddMovie;