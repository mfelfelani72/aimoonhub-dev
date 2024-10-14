import React, { useEffect, useState } from "react";

import logo from "/assets/images/logo.png";

import axios from "./utils/services/api";
import Button from "../core/components/Button.jsx";
import ToolTip from "../core/components/ToolTip.jsx";

function Login() {
  const [email, setEmail] = useState("e");
  const [password, setPassword] = useState("p");

  const [passwordError, setPasswordError] = useState();
  const [emailError, setEmailError] = useState();

  const serviceLogin = async () => {
    console.log(email);
    console.log(password);

    // const parameter = {
    //   email: "test@gmail.com",
    //   password: "test@1",
    // };

    // try {
    //   axios.post(`User/ServiceLogin/`, parameter).then((response) => {
    //     if (response.data) {
    //       sessionStorage.setItem("token", response.data.user_token);
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    // serviceLogin();
  }, []);
  return (
    // <div className="h-screen">
    <div className="flex flex-col h-screen justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-16 w-auto" src={logo} alt="aimoon" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(ev) => setEmail(ev.target.value)}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-color-theme sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-color-theme hover:text-color-theme"
                  >
                    Forgot password?
                  </a>
                </div> */}
            </div>
            <div className="mt-2">
              <ToolTip text="password is required" className={"rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-20 text-[0.8rem]"}>
                <input
                  onChange={(ev) => setPassword(ev.target.value)}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-color-theme sm:text-sm sm:leading-6"
                />
              </ToolTip>
            </div>
          </div>

          <div>
            <Button
              onClick={() => {
                serviceLogin();
              }}
              className="flex w-full justify-center rounded-md bg-color-theme px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-theme focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-theme"
            >
              Sign in
            </Button>
          </div>
        </form>

        {/* <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a
              href="#"
              className="font-semibold leading-6 text-color-theme hover:text-color-theme"
            >
              Start a 14 day free trial
            </a>
          </p> */}
      </div>
    </div>
    // </div>
  );
}

export default Login;
