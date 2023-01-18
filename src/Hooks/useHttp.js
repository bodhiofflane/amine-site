import { useState, useCallback } from 'react';

const useHttp = () => {

    const [process, setProcess] = useState('loading');
/*     const testRequest = useCallback((url, options = {method: 'POST', headers: {}, body: 'page=20'}) => {
        const response = await fetch(url, )
    }) */

    const request = useCallback(async(url) => {

        //setProcess('loading');

        try {
            const response = await fetch(url);
            console.log('Произошел запрос');
            if(response.status > 200) {
                throw new Error('The request failed');
            }
            return await response.json();
            // Здесь мог бы быть setProsecc('complited')
            
        } catch (error) {
            setProcess('error');
            console.error(error.message);
        }

    }, [])

    return {request, process, setProcess};
}
export default useHttp;