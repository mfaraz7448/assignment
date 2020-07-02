import { CREATE_USER, UPDATE_USER, DELETE_USER, GET_USER, IS_UPDATING_USER } from './types'

export function createUser(user) {
    return {
        type: CREATE_USER, user
    }
}

export function getUser(user) {
    return {
        type: GET_USER, user
    }
}

export function updateUser(userDetail) {
    return {
        type: UPDATE_USER, userDetail
    }
}

export function deleteUser(user) {
    return {
        type: DELETE_USER, user
    }
}

export function isUpdatingUser(update) {
    return {
        type: IS_UPDATING_USER, update
    }
}