import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login({ users }) {
  const [login, setLogin] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  let userarr = [...users];
  
  const handlesumbit = async (e) => {
    e.preventDefault();
    userarr.forEach(async (user) => {
      if (user.name === login.name && user.password === login.password) {
        await axios
          .post("http://localhost:4000/User", login)
          .then((res) => {
            console.log(res.data);
            document.cookie = `LoggedUser=${res.data.user}`;
            navigate("/products");
          })
          .catch((e) => {
            console.log(e);
            alert("No Such User");
          });
      }
    });
  };
  const onChange = (field, value) => {
    setLogin({ ...login, [field]: value });
  };
  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/currentUser", { withCredentials: true })
    //   .then((response) => {
    //     console.log(response.data);
    //     if (response.data === "Welcome, Gurdeep123!") {
    //       navigate("/products");
    //     }
    //   });]]
    // console.log(document.cookie);
    // console.log(typeof document.cookie);
    // if (document.cookie === "LoggedUser") {
    //   console.log(document.cookie);
    //   navigate("/products");
    // } else {
    //   console.log("no user cookie");
    // }]

    const ck = document.cookie.split("=");
    console.log(ck[0]);
    if (ck[0] === "LoggedUser") {
      navigate("/products");
    } else {
      console.log("no user cookie");
    }
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "5em",
        }}
      >
        <h1>Login Page</h1>
        <form
          onSubmit={handlesumbit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              margin: "1em",
            }}
          >
            <label style={{ margin: "2em" }}>username</label>
            <input
              type="text"
              name="username"
              value={login.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </div>
          <div
            style={{
              margin: "1em",
            }}
          >
            <label style={{ margin: "2em" }}>password</label>
            <input
              type="text"
              name="password"
              value={login.password}
              onChange={(e) => onChange("password", e.target.value)}
            />
          </div>
          <button type="submit">Sumbit</button>
        </form>
      </div>
    </>
  );
}
export default Login;
