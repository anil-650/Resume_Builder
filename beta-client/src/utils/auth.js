// IMPORTS
import { convertFormData } from "./convertFormData";

// SET BACK END URL
const url = import.meta.env.BSA || 'http://localhost:5000'

export async function createUser(user){
    const data = user; // JUST TO BE SURE
    const sendData = await convertFormData(data);

    // DEBUG ONLY
    console.log('Sending data from utils/auth');
    console.log(sendData);

    return fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: sendData
    });
}


export async function loginUser(user, token){
    const data = user; // JUST TO BE SURE
    const sendData = await convertFormData(data);

    // DEBUG ONLY
    console.log('Sending data from uthils/auth');
    console.log(sendData);

    return fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'token': token,
        },
        body: sendData
    });
}
