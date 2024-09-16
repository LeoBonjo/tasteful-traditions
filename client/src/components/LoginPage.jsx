import "./LoginPage.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [data, setData] = useState(null);
  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios.post("/api/users/login", credentials);
      localStorage.setItem("token", data.token);
      setData(`Welcome, ${data.name}`); 
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
    <Link to="/" className="go-back-link">← Go back</Link>
    <div className="login-page">
      <div className="top-left-link">
      </div>
      <img src="https://i.imgur.com/TRHbk1I.png" alt="Logo" className="logo" />
      <div className="login-container">
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
          placeholder="Password"
        />
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
    </>
  );
}

export default Login;
