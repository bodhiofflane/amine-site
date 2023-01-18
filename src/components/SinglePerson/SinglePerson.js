import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useTransfomData from "../../Hooks/useTransformData";
import { viewContent } from "../../utilits/viewContent";

const SinglePerson = () => {

    const { personId } = useParams();

    const [person, setPerson] = useState(null);

    const { getPerson, process, setProcess } = useTransfomData();

    useEffect(() => {
        getPerson(personId)
            .then(res => {
                setPerson(res);
                setProcess('complited');
            })
    }, [getPerson, personId, setProcess, setPerson])

    console.log(process);
    console.log(person);

    return (
        viewContent(process, Content, person)
    );

}
export default SinglePerson;

const Content = ({data}) => {

    const {name, givenName, familyName, about, thumbnail, birthday, altName, favorites, website} = data;
    
    console.log()

    return (
        <>
            <h1 className="general-title">{name}</h1>
            <div className="single">
                <div className="single__info">
                    <img className="single__img" src={thumbnail} alt={name} />
                    <p className="single__description">Name: <span className="single__important">{name}</span></p>
                    <p className="single__description">Given name: <span className="single__important">{givenName}</span></p>
                    <p className="single__description">Family name: <span className="single__important">{familyName}</span></p>
                    <p className="single__description">Birthday: <span className="single__important">{birthday}</span></p>
                    {
                        altName.length > 0 ?
                            <p className="single__description">
                                Alternate names: <span className="single__important">{altName}</span>
                            </p>
                            : null
                    }
                    
                    <p className="single__description">Favorites: <span className="single__important">{favorites}</span></p>
                    <p className="single__description">Website: <span className="single__important"><a href={website}>Link</a></span></p>
                </div>

                <div className="single__more-info">
                    
                    <p className="single__description">{about}</p>


                </div>
            </div>
        </>
    );

}