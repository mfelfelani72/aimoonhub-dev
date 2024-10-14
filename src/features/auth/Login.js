import React, { useEffect } from "react";


import axios from "./utils/services/api";

function Login() {
  const serviceLogin = async () => {
    const parameter = {
      email: "test@gmail.com",
      password: "test@1",
    };

    try {
      axios.post(`User/ServiceLogin/`, parameter).then((response) => {
        
        if (response.data) {
            sessionStorage.setItem('token', response.data.user_token);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // serviceLogin();
  }, []);
  return <div>Login</div>;
}

export default Login;
