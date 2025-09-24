// IMPORTS

// SET BACK END URL
const url = import.meta.env.BSA || 'http://localhost:5000'

export async function deleteCV(cvid, token){
    const id = {} // JUST TO BE SURE
    id.id=cvid
    console.log(id)

    // DEBUG ONLY
    console.log('Sending data from utils/userDelete');

    return fetch(`${url}/resume/deletecv`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'token': token
        },
        body: JSON.stringify(id)
    });
}

