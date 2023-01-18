import { useState, useEffect, useCallback } from 'react';

import { Link } from "react-router-dom";

import './randomItems.scss';

import SearchBar from '../SearchBar/SearchBar';

import useTransfomData from '../../Hooks/useTransformData';

import { viewContent } from "../../utilits/viewContent";

import { object, array } from "prop-types";




const RandomItems = () => {

    const [randomAnime, setRandomAnime] = useState({});

    const { getRandomAnime, process, setProcess } = useTransfomData();

    const getData = useCallback(() => {
        getRandomAnime() // и как она страбатыват?
            .then(randomAnime => {
                setRandomAnime(randomAnime);
                setProcess('complited');
            });
    }, [getRandomAnime, setProcess]);

    useEffect(() => {
        getData();
    }, [getData])

    return (
        viewContent(process, Content, randomAnime, null, getData)
    );

}
export default RandomItems;

const Content = ({ data, functions }) => {

    const { id, title, description, thumbnail, genres, score, aired } = data;

    const [getData] = functions;

    return (
        <div className="random">
            <h1 className="general-title">Welcome to the main page of the test site devoted to anime</h1>
            <div className="random__grid-container">
                    <div className="random__random-item">
                        <img className="random__random-img" src={thumbnail} alt={title} />

                        <div className="random__random-info">
                            <h3 className="random__random-name">{title}</h3>
                            {
                                score && score.lenght !== 0 ?
                                    <p className="random__random-description">
                                        Score: <span className="random__important">{score}</span>
                                    </p>
                                    : null
                            }
                            {
                                genres && genres.length !== 0 ?
                                    <p className="random__random-description">
                                        Genre: <span className="random__important">
                                            {genres.map(item => item.name).join(', ')}</span>
                                    </p>
                                    : null
                            }
                            {
                                aired && aired.lenght !== 0 ?
                                    <p className="random__random-description">
                                        Date of release: <span className="random__important">{aired}</span>
                                    </p>
                                    : null
                            }
                            {
                                description && description.lenght !== 0 ?
                                    <p className="random__random-description">
                                        {typeof description === 'string' ? description.substring(0, 500) + '....' : null}
                                    </p>
                                    : null
                            }
                        </div>
                        <div className="random__buttons">
                            <Link
                                to={`/anime/${id}`}
                                className="btn no-border-radius "
                            >
                                Go to anime page
                            </Link>
                        </div>
                    </div>

                <div className="random__random-navigation">

                    <SearchBar />

                    <div className='random__try-it'>
                        <h3 className="random__search-title">Get random anime</h3>
                        <button
                            className="btn"
                            onClick={getData}
                        >
                            Get anime!
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
Content.propTypes = {
    data: object.isRequired,
    functions: array.isRequired,
}