import { API_URL, ERROR_DEFAULT_MESSAGE } from '../constant/app-vars'

import axios from 'axios'

const header = {
    'Content-Type': 'application/json',
}

export const onAuthenticate = async (url = '', data = {}, method, headerWithToken) => {

    const headerType = headerWithToken || header

    return await axios(`${API_URL + url}`, {
        method: method,
        headers: headerType,
        data: data,
    })
        .then(response => {
            return {
                success: true,
                apiAnswer: true,
                result: response.data,
                responseCode: response.status,
            }
        })
        .catch(error => {
            return {
                success: false,
                apiAnswer: true,
                errorMessage: error.response.data || ERROR_DEFAULT_MESSAGE,
                responseCode: error.response.status,
            }
        });
};