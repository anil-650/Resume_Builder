// IMPORTS
import { convertFormData } from "./convertFormData";

// BACK-END URL
const url = "http://192.168.29.138:5000"

// NOTHING HERE IS SETUP AT BACK END

export async function updateUserProfile(user, token){
    const data = user; // JUST TO SURE
    const sendData = await convertFormData(data)
    return fetch(`${url}/dashboard/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; cahrset=utf-8',
            'token': token,
        },
        body: sendData
    });
}

export async function updateUserPassword(user, token){
    const data = user; // JUST TO SURE
    const sendData = await convertFormData(data)
    return fetch(`${url}/dashboard/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; cahrset=utf-8',
            'token': token,
        },
        body: sendData
    });
}
