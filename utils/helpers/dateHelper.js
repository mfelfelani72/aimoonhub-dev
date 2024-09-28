export function dateHelper(stampDate, type = "AD-date") {

    let location;
    let result;

    // for location of date 
    if (type == "AD-date")
        location = "en-US";

    else if (type == "SH-date")
        location = "fa-IR";

    // for type of date 
    var date = new Date(stampDate * 1000);

    result = date.toLocaleString(location, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })

    return result;
} 