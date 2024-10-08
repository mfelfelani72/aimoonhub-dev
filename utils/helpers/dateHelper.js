export function dateHelper(
  stampDate,
  type = "AD-date",
  format = "full",
  place = "all"
) {
  let location;
  let result;

  // for location of date
  if (type == "AD-date") location = "en-US";
  else if (type == "SH-date") location = "fa-IR";

  // for type of date
  var date = new Date(stampDate * 1000);

  if (format == "full" && place == "all")
    result = date.toLocaleString(location, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  else if (format == "date" && place == "all")
    result = date.toLocaleString(location, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  else if (format == "time" && place == "all")
    result = date.toLocaleString(location, {
      hour: "2-digit",
      minute: "2-digit",
    });
  else if (format == "date" && place == "chart")
    result = date.toLocaleString(location, {
      month: "short",
      day: "2-digit",
    });

  return result;
}
