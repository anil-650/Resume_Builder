import { userEmail } from "../../utils/userGet"
import {updateUserPassword} from "../../utils/userPut"

export async function get ({ redirect, url }){
    const email = url.searchParams.get('email')

    const res = await userEmail(email)

    if(res.ok){
        console.log("sucess")
        const body="ok"
        const init = {
            status: 200,
            statusText: 'OK',
            headers: { 'Conten-Type': 'text/plain' }
        }

        return new Response(body, init)
    }else if(res.status === 400){
        const m = await res.json()
        console.log(m)

        const body = "email is not vaild/registered"
        const init = {
            status: 400,
            statusText: 'Bad Request',
            headers: { 'Conten-Type': 'text/plain'}
        }

        return new Response(body, init)
    }else{
        return redirect('/500')
    }

}

export async function post ({ cookies, request }){
    const token = cookies.get('token').value
    const password = JSON.stringify(await request.json())

        // DEBUG
    console.log(password)

    const res = await updateUserPassword(password, token)

    if(res.ok){
        console.log("sucess")
        const body="ok"
        const init = {
            status: 200,
            statusText: 'OK',
            headers: { 'Conten-Type': 'text/plain' }
        }

        return new Response(body, init)
    }else if(res.status === 400){
        const m = await res.json()
        console.log("ERR 400 TRIPED")
        console.log(m)
        console.log(res.status)

        const body = {"error": "email is not vaild/registered"}
        const init = {
            status: 400,
            statusText: 'Bad Request',
            headers: { 'Conten-Type': 'application/json; charset=utf-8'}
        }

        return new Response(JSON.stringify(body), init)
    }else{
        const status_code = res.status
        const status_text = res.statusText
        const err = await res.json()

        console.log("ERR else TRIPED")
        console.log(err)

        return new Response (JSON.stringify({"error": err.error}), {
            status: status_code,
            statusText: status_text,
            headers: {
                'Conten-Type': 'application/json; charset=utf-8'
            }
        })
    }

}
