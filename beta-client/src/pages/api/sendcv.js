export async function get ({ cookies , redirect}){

    let p,exp,edu,o,token

    let payload={}

    if(cookies.has("personal")){
        p = cookies.get("personal").json()
        payload["personal"]=p
    }

    if(cookies.has("exp")){
        exp = cookies.get("exp").json()
        payload["experience"]=exp
    }

    if(cookies.has("edu")){
        edu = cookies.get("edu").json()
        payload["education"]=edu
    }

    if(cookies.has("others")){
        o = cookies.get("others").json()
        payload["others"]=o
    }

    // DEBUG ONLY
    console.log("----- p value -----")
    console.log(p)
    console.log("----------\n")
    console.log("----- exp value -----")
    console.log(exp)
    console.log("----------\n")
    console.log("----- edu value -----")
    console.log(edu)
    console.log("----------\n")
    console.log("----- o value -----")
    console.log(o)
    console.log("----------\n")

    console.log("----- payload value -----")
    console.log(payload)
    console.log("----------\n")
    if(cookies.has("token")){
        token = cookies.get("token").value
    }

    const res = await fetch("http://localhost:5000/resume/save", {
        method: "POST",
        headers: { 'Content-Type':'application/json; charset=utf-8', 'token':token },
        body: JSON.stringify(payload)
    })

    if (res.ok){
        const data = await res.json()
        const { pdflink } = data
        return redirect(pdflink)
    } else {
        const data = await res.json()
        return new Response(
            JSON.stringify({data}),
            {
                status:res.status,
                headers: { "Content-Type": "application/json; charset=utf-8"},
            })

    }

}
