export function setUserApp(path, data, setUser, setAllowed, navigate) {
 
  if (path === "login") 
    sessionStorage.setItem("token", data.user_token);
  else
   sessionStorage.setItem("token", data.token);

  setUser({
    username: data.username,
    email: data.email,
  });
  sessionStorage.setItem("username", data.username);
  sessionStorage.setItem("email", data.email);
  setAllowed(true);
  navigate("/");
}
