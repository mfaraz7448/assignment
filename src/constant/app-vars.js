export const API_URL = 'https://jsonplaceholder.typicode.com/';

//MESSAGE
export const ERROR_DEFAULT_MESSAGE = 'No response from server';


export const INITIAL_STATE = {
    id: '',
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    company: {
        name: '',
        catchPhrase: '',
        bs: ''
    },
    address: {
        street: '',
        city: '',
        zipcode: '',
    }
}