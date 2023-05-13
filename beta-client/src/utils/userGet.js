// IMPORTS
// import { convertFormData } from "./convertFormData";

// BACK-END URL
const url = import.meta.env.BSA || 'http://localhost:5000'

// NOTHING HERE IS SETUP AT BACK END

export async function getUser(token){
    return fetch(`${url}/dashboard`, {
        method: "GET",
        headers: {
            'Conten-Type': 'application/json; cahrset=utf-8',
            'token': token,
        }
    });
}

export async function getUserCVs(token){
    return  fetch(`${url}/dashboard/cvs`, {
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

// GET EMAIL FOR RESET PASSWORD
export async function userEmail(email){
    return fetch(`${url}/resetpasswd?email=${email}`);
}

// GENERATE CV
export async function generateCV( cvid ){
    return fetch(`${url}/resume/gencv/${cvid}`)
}
