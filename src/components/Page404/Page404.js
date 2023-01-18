import { Link } from "react-router-dom";

import './page404.scss';
import gif404 from './page404.gif';

const Page404 = ({message}) => {
    return (
        <div className="page-404">
            <h1 className="general-title">{message}</h1>
            <img className="general-title shadow" src={gif404} alt="error-404" />
            <Link className="btn" to="..">Come back...</Link>
        </div>
    );
}
export default Page404;