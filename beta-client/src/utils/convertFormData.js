export async function convertFormData(fromdata){
    // START EMPTY OBJ
    const json = {};

    // FOR OF LOOP TO GET THINGS IN OBJ
    for(const [key, value] of fromdata.entries()){
        json[key] = value;
    }

    // STRING-FY AND SEND
    return JSON.stringify(json);
}
