import { deleteCV } from "../../utils/userDel"

export async function get ({ cookies , redirect, url }){
    const id = url.searchParams.get('id')

    let token
    if(cookies.has("token")){
        token = cookies.get("token").value
        console.log(token)
    }

    console.log(id)
    const res = await deleteCV(id, token)
    if(res.ok){
        console.log("sucess")
        return redirect('/user/cv')
    }else{
        const m = res.json()
        console.log(m)
        return redirect('/500')
    }

}
