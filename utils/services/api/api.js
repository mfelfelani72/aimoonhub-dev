import axios from "axios";

export default axios.create({
  baseURL: "http://79.175.177.113:15800/AimoonxNewsHUB/",

  headers: {
    "Accept-Version": 1,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
    // 'Authorization': sessionStorage.getItem('token') ? sessionStorage.getItem('token') : "48e07eef-d474-47a5-8da4-3e946331369a",
    'Authorization': "b6ac98f9007c571d980ead04606fff55",
  },

  withCredentials: false,
  withXSRFToken: false,
});
