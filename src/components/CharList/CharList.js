import { useState } from "react";
import { array } from "prop-types";

import { Link } from "react-router-dom";

import noImage from '../../image/noImage.svg';

import './charList.scss';

const CharList = ({ chars }) => {

    const [counter, setCounter] = useState(3);

    console.log(chars)

    const viewChars = chars.filter((char, index) => {
        return index < counter;
    })

    console.log(chars)

    return (
        <div className="char-list">
            <p
                style={{ "textAlign": "center", "fontSize": "30px" }}
                className="single__description"
            >
                Characters and voice actors
            </p>

            {viewChars.map(char => {
                return (
                    <div className="char-list__chars" key={char.charId}>

                        <Link className="char-list__link" to={`/character/${char.charId}`}>
                            <div className="char-list__char-card">
                                <img className="char-list__char-img" src={char.thumbnail} alt={char.name} />

                                <div className="char-list__char-info">
                                    <p className="single__description no-border">
                                        Name: <span className="single__important">{char.name}</span>
                                    </p>
                                    <p className="single__description no-border">
                                        Role: <span className="single__important">{char.role}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {
                            char.voiceActors !== undefined ?
                                <Link className="char-list__link" to={`/person/${char.voiceActors.person.mal_id}`}>
                                    <div className="char-list__char-card">

                                        <img
                                            className="char-list__char-img"
                                            src={char.voiceActors !== undefined ? char.voiceActors.person.images.jpg.image_url : noImage}
                                            alt={char.voiceActors !== undefined ? char.voiceActors.person.name : 'no-info'} />

                                        <div className="char-list__char-info">

                                            <p className="single__description no-border">
                                                Name:
                                                <span className="single__important">
                                                    {char.voiceActors !== undefined ? char.voiceActors.person.name : 'no-info'}
                                                </span>
                                            </p>
                                            <p className="single__description no-border">
                                                Language:
                                                <span className="single__important">
                                                    {char.voiceActors !== undefined ? char.voiceActors.language : 'no info'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </Link> :
                                <div className="char-list__char-card">
                                    <img className="char-list__char-img" src={noImage} alt="noInfo"/>
                                    <div className="char-list__char-info">
                                    <p className="single__description no-border">No info</p>
                                    </div>
                                </div>

                        }








                    </div>
                )
            })}
            {
                counter >= chars.length ? null :
                    <button
                        className="btn no-border-radius"
                        onClick={() => {
                            setCounter((prev) => prev + 3);
                        }}
                    >
                        More characters...
                    </button>
            }

        </div >
    );
}
CharList.propTypes = {
    chars: array.isRequired,
}

export default CharList;