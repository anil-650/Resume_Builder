const url = "http://192.168.29.138:5000"

export async function getUserdata(data){
return  fetch('${url}/dashboard/users');
}

export async function getUser(token){
return fetch(`${url}/dashboard`, {
  headers: {
    'Conten-Type': 'application/json',
    'token': token,
  }
});
}

export async function createUser(user, token){
return fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'token': token,
    },
    body: user
});
}


export async function loginUser(user, token){
return fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'token': token,
    },
    body: user
});
}

export async function getUserProfile(token){
return fetch(`${url}/dashboard/profile`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'token': token,
    }
});
}

export async function updateUserProfile(user, token){
return fetch(`${url}/dashboard/profile`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'token': token,
    },
    body: user
});
}

export async function updateUserPassword(user, token){
return fetch(`${url}/dashboard/password`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'token': token,
    },
    body: user
});
}
