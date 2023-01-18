import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useTransfomData from "../../Hooks/useTransformData";
import { viewContent } from "../../utilits/viewContent";

import './singleChar.scss';

const SingleChar = (props) => {

    const { charId } = useParams();

    const [char, setChar] = useState(null)

    const { getCharacter, process, setProcess } = useTransfomData();

    const getData = useCallback((id) => {
        getCharacter(id)
            .then(res => {
                setChar(res);
                setProcess('complited');
            })
    }, [getCharacter, setProcess])

    useEffect(() => {
        getData(charId)
    }, [getData, charId])


    console.log(char, process)



    return (
        viewContent(process, Content, char)
    );

}
export default SingleChar;


const Content = ({ data }) => {

    const { name, nameKanji, about, favorites, thumbnail, nicknames, url } = data;

    console.log(about)

    return (
        <>
            <h1 className="general-title">{name} character page</h1>
            <div className="single">
                <div className="single__info">
                    <img className="single__img" src={thumbnail} alt={name} />
                    {
                        name && name.length > 0 ?
                            <p className="single__description">Name: <span className="single__important">{name}</span></p>
                            : null
                    }
                    {
                        nameKanji && nameKanji.length > 0 ?
                            <p className="single__description">Name Kanji: <span className="single__important">{nameKanji}</span></p>
                            : null
                    }
                    {
                        favorites && favorites.length > 0 ?
                            <p className="single__description">Favorites: <span className="single__important">{favorites}</span></p>
                            : null
                    }

                    {
                        nicknames && nicknames.length > 0 ?
                            <p className="single__description">
                                Nicknames: <span className="single__important">{nicknames.join(', ')}</span>
                            </p> :
                            null
                    }
                </div>

                <div className="single__more-info">
                    {
                        about && about.length ? <p className="single__description">{about}</p> : null
                    }

                    <a style={{ 'width': '100%' }} className="btn no-border-radius" href={url}>К странице {name}</a>
                </div>
            </div>
        </>
    );

}
