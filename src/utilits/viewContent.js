import Spinner from "../components/Loading/Loading";
import Page404 from "../components/Page404/Page404";

export const viewContent = (process, Component, data, chars = null, ...functions) => {
    switch (process) {
        /* case 'waiting':
            return <Spinner/>; */
        case 'loading':
            return <Spinner />;
        case 'error':
            return <Page404 message={'The server returned an error'} />
        case 'complited':
            return <Component data={data} chars={chars} functions={functions} />;
        default: throw new Error('Impossible');
    }
}