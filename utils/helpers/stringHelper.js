export function stringHelper(string, count, start = 0, type = "word") {

    let result;

    if (type == "word")
        result = string.split(/\s+/).slice(start, count).join(" ") + " ...";

    else if (type == "letter")
        result = string.substring(start, count);

    return result;

}