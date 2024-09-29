import axios from "../../utils/services/api/api.js";

export function getData(endPoint, parameter) {
  return axios.post(endPoint, parameter);
}
