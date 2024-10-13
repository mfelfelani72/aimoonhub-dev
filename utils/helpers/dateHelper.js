export function dateHelper(
  stampDate,
  kind = "regular",
  format = "full",
  type = "AD-date"
) {
  let location;
  let result;

  // for location of date
  if (type == "AD-date") location = "en-US";
  else if (type == "SH-date") location = "fa-IR";

  // for type of date
  var date = new Date(stampDate * 1000);

  if (kind == "regular" && format == "full")
    result = date.toLocaleString(location, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  else if (kind == "regular" && format == "date")
    result = date.toLocaleString(location, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  else if (kind == "regular" && format == "time")
    result = date.toLocaleString(location, {
      hour: "2-digit",
      minute: "2-digit",
    });
  else if (kind == "chart")
    result = date.toLocaleString(location, {
      month: "short",
      day: "2-digit",
    });
  else if (kind == "difference") {
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = currentDate - date;

    // Convert milliseconds to days, hours, minutes, and seconds
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(
      (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const diffInMinutes = Math.floor(
      (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    // const diffInSeconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    let stringTime = "";

    if (diffInDays !== 0 && diffInDays < 2) stringTime += diffInDays + " Day ";
    else if (diffInDays !== 0 && diffInDays > 1)
      stringTime += diffInDays + " Days ";
    if (diffInHours !== 0 && diffInHours < 2)
      stringTime += diffInHours + " Hour ";
    else if (diffInHours !== 0 && diffInHours > 1)
      stringTime += diffInHours + " Hours ";
    if (diffInMinutes !== 0 && diffInMinutes < 2)
      stringTime += diffInMinutes + " Minute ";
    else if (diffInMinutes !== 0 && diffInMinutes > 1)
      stringTime += diffInMinutes + " Minutes ";

    if (diffInDays == 0 && diffInHours == 0 && diffInMinutes == 0)
      result = stringTime + "Exactly Now";
    else
    result = stringTime + " ago";
  }

  return result;
}
