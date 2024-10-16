export function setUserApp(data, setUser, setAllowed, navigate) {
 
  sessionStorage.setItem("token", data.user_token);
  setUser({
    username: data.username,
    email: data.email,
  });
  sessionStorage.setItem("username", data.username);
  sessionStorage.setItem("email", data.email);
  setAllowed(true);
  navigate("/");
  
}
