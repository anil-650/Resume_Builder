// IMPORTS
// import { convertFormData } from "./convertFormData";

// BACK-END URL
const url = import.meta.env.BSA || 'http://localhost:5000'

// NOTHING HERE IS SETUP AT BACK END

export async function getUser(token){
    return fetch(`${url}/dashboard`, {
        headers: {
            'Conten-Type': 'application/json; cahrset=utf-8',
            'token': token,
        }
    });
}

export async function getUserdata(token){
    return  fetch('${url}/dashboard/users', {
        method: 'GET',
        headers: {
            'token' : token
        }
    });
}

export async function getUserProfile(token){
    return fetch(`${url}/dashboard/profile`, {
        method: 'GET',
        headers: {
            'token': token,
        }
    });
}

export async function updateUserProfile(user, token){
    return fetch(`${url}/dashboard/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; cahrset=utf-8',
            'token': token,
        },
        body: user
    });
}

export async function updateUserPassword(user, token){
    return fetch(`${url}/dashboard/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; cahrset=utf-8',
            'token': token,
        },
        body: user
    });
}
