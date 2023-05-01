export async function get ({ cookies , redirect}){
    let p,pp, exp, edu, o;
    p = pp = exp = edu = o = "no cookie"

    let cookieOpt = {path: '/'}

    if(cookies.has("personal")){
        p = cookies.get("personal").json()
    }

    cookies.delete("personal",cookieOpt)
    cookies.delete("exp",cookieOpt)
    cookies.delete("edu",cookieOpt)
    cookies.delete("others",cookieOpt)

        // DEBUG ONLY
    if(cookies.has("personal")){
        pp = cookies.get("personal").json()
    }
    if(cookies.has("exp")){
        exp = cookies.get("exp").json()
    }

    if(cookies.has("edu")){
        edu = cookies.get("edu").json()
    }

    if(cookies.has("others")){
        o = cookies.get("others").json()
    }

    console.log(p,
    exp,
    edu,
    o,
    pp)
    // DEBUG ONLY

    return redirect(`/cv-builder/templates/${p.cv_template}`)
}
