import { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import useTransfomData from "../../Hooks/useTransformData";
import { viewContent } from "../../utilits/viewContent";

import { object } from "prop-types";

import './singlePage.scss';
import CharList from "../CharList/CharList";


const SinglePage = () => {

    const [anime, setAnime] = useState(null);
    const [chars, setChars] = useState(null);

    const { animeId } = useParams();

    const { getAnimeById, getAnimeCharacters, process, setProcess } = useTransfomData();

    const getData = useCallback(() => {
        Promise.all([getAnimeById(animeId), getAnimeCharacters(animeId)])
            .then(res => {
                setAnime(res[0]);
                setChars(res[1]);

                setProcess('complited');
            })
            .catch((e) => {
                throw new Error(e.message);
            })

    }, [getAnimeById, getAnimeCharacters, animeId, setProcess])

    useEffect(() => {
        getData();
    }, [getData])

    return (
        viewContent(process, Content, anime, chars)
    );

}
export default SinglePage;

const Content = ({ data, chars }) => {

    const {
        /* id,  */title, description, thumbnail, rating,
        score, rank, popularity, trailer, background,
        members, type, episodes, status, aired,
        studios, source, genres, duration, themes,
    } = data;

    return (
        <>
            <h1 className="general-title">{title}</h1>
            <div className="single">
                <div className="single__info">
                    <img className="single__img" src={thumbnail} alt={title} />
                    {
                        type && type.length !== 0 ?
                            <p className="single__description">Type: <span className="single__important">{type}</span></p>
                            : null
                    }
                    {
                        aired && aired.length !== 0 ?
                            <p className="single__description">Date of release: <span className="single__important">{aired}</span></p>
                            : null
                    }
                    {
                        status && status.length !== 0 ?
                            <p className="single__description">Status: <span className="single__important">{status}</span></p>
                            : null
                    }
                    {
                        duration && duration.length !== 0 ?
                            <p className="single__description">Duration: <span className="single__important">{duration}</span></p>
                            : null
                    }
                    {
                        episodes && episodes.length !== 0 ?
                            <p className="single__description">Episodes: <span className="single__important">{episodes}</span></p>
                            : null
                    }
                    {
                        studios && studios.length !== 0 ?
                            <p className="single__description">
                                Studios: <span className="single__important">
                                    {studios.map(item => item.name).join(', ')}
                                </span>
                            </p>
                            : null
                    }
                    {
                        source && source.length !== 0 ?
                            <p className="single__description">Source: <span className="single__important">{source}</span></p>
                            : null
                    }
                    {
                        genres && genres.length !== 0 ?
                            <p className="single__description">
                                Genres: <span className="single__important">
                                    {genres.map(item => item.name).join(', ')}
                                </span>
                            </p>
                            : null
                    }
                    {
                        themes && themes.length !== 0 ?
                            <p className="single__description">
                                Themes: <span className="single__important">
                                    {themes.map(item => item.name).join(', ')}</span>
                            </p>
                            : null
                    }
                    {
                        rating && rating.length !== 0 ?
                            <p className="single__description">Rating: <span className="single__important">{rating}</span></p>
                            : null
                    }
                </div>

                <div className="single__more-info">
                    <div className="single__score">
                        <p className="single__description no-border">
                            Score: <span className="single__important">{score || 'No score'}</span>
                        </p>
                        <p className="single__description no-border">
                            Ranked: <span className="single__important">#{rank || 'No Rank'}</span>
                        </p>
                        <p className="single__description no-border">
                            Popularity: <span className="single__important">#{popularity || 'No information'}</span>
                        </p>
                        <p className="single__description no-border">
                            Members: <span className="single__important">{members || 'No information'}</span>
                        </p>
                    </div>
                    {
                        description && description.length ?
                            <p className="single__description">{description}</p>
                            : null
                    }
                    {
                        trailer.embed_url && trailer.embed_url.lenght !== 0 ?
                            <iframe
                                className="single__video"
                                src={trailer.embed_url}
                                title={'trailer'}
                                allowFullScreen
                            >
                                Браузер не поддеживает видео
                            </iframe> : null
                    }
                    {chars.length > 0 ? <CharList chars={chars} /> : null}
                    {
                        background && background.length !== 0 ?
                            <p className="single__description">{background}</p>
                            : null
                    }


                </div>
            </div>
        </>
    );
}
Content.propTypes = {
    data: object.isRequired,
}