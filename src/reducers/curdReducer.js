import { CREATE_USER, UPDATE_USER, DELETE_USER, GET_USER, IS_UPDATING_USER } from '../actions/types'


const INITIAL_STATE = {
    userDetail: {
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
        },
    },
    user: [],
    isUserUpdating: false
}


const curdReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.user
            }
            break;
        case UPDATE_USER:
            return {
                ...state,
                userDetail: action.userDetail
            }
        case IS_UPDATING_USER:
            return {
                ...state,
                isUserUpdating: action.update
            }
            break
        default:
            return state
    }
}


export default curdReducer