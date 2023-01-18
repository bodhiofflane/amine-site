
import { memo } from 'react'
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage as ErrorMessageFormik } from "formik";
import { object, string } from 'yup';


const SearchBar = () => {

    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{ search: '' }}
            validationSchema={object({
                search: string()
                    .min(2, 'You must enter at least two letters')
                    .required('Required field')
            })}
            onSubmit={(values) => {
                navigate(`/search/${encodeURIComponent(values.search)}`)
            }}
        >
            <Form className="random__search">
                <label htmlFor="search" className="random__search-title">Поиск аниме по названию</label>
                <Field
                    className='random__search-bar'
                    name="search"
                    id="search"
                    type="search" placeholder='Введите название аниме'
                />
                <button type="submit" className='btn'>Search</button>
                <ErrorMessageFormik
                    style={{'backgroungColor': 'red'}}
                    className="btn"
                    name="search"
                    component={'div'}
                />

            </Form>
        </Formik>
    );
}

export default memo(SearchBar);