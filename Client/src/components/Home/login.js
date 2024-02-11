import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsersRoute, getUserRoute } from "../../utils/APIRoutes";

const Login = () => {
  const [login, setLogin] = useState({ name: "", password: "" });
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const users = await axios.get(getAllUsersRoute);
    setUsers(users.data);
  };

  useEffect(() => {
    const helper = async () => {
      await getAllUsers();
    };
    helper();
  }, []);

  const navigate = useNavigate();

  const handlesumbit = async (e) => {
    e.preventDefault();
    try {
      users.forEach(async (user) => {
        if (user.name === login.name && user.password === login.password) {
          const user = await axios.post(getUserRoute, login);
          if (user.data.user) {
            document.cookie = `LoggedUser=${user.data.user}`;
            navigate("/products");
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (field, value) => {
    setLogin({ ...login, [field]: value });
  };
  useEffect(() => {
    const ck = document.cookie.split("=");
    console.log(ck[0]);
    if (ck[0] === "LoggedUser") {
      navigate("/products");
    } else {
      console.log("no user cookie");
    }
  }, [navigate]);
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
};
export default Login;
