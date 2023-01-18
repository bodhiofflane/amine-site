
import spinner from './spinner.svg';

const Spinner = () => {
    return (
        <div className="page-404">
             <h1 className="general-title">Loading...</h1>
            <img style={{'width': '40%'}} className="general-title" src={spinner} alt="loading" />
        </div>

    );
}

export default Spinner;