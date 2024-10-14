import axios from "../../utils/services/api/api.js";

export function getData(
  endPoint,
  parameter,
  authorization = "48e07eef-d474-47a5-8da4-3e946331369a"
) {
  return axios.post(endPoint, parameter, {
    headers: {
      Authorization: authorization,
    },
  });
}
