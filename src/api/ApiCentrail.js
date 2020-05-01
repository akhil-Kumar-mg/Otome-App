import axios from 'axios';


const request = async function (options) {

    const client = axios.create({
        data: options.data
    });

    const onSuccess = (response) => {
        return response.data;
    }

    const onError = (error) => {
        console.debug(error);
        if (error.response) {
            console.debug('Status:', error.response.status);
            console.debug('Data:', error.response.data);
            console.debug('Headers:', error.response.headers);
        } else {
            console.debug(error.message);
        }

        return Promise.reject(error.response || error.message);
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;