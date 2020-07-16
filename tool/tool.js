function Urlparams(obj) {
    const params = new URLSearchParams();

    for (let key in obj) {

        if (obj[key] != undefined && obj[key] != null) {
            params.append(key, obj[key]);
        }

    }

    return params
}

export default{
    Urlparams
}