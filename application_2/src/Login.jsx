import React, { useState } from "react";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import BACKEND_URL from "./services/api";
function Login() {
  const { value } = useLoaderData();
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={value}>
          {(value) => {
            if (value === true) {
              return (
                <>
                  <Navbar isLogout={true} /> <h1>You are Logged In 🙋</h1>
                </>
              );
            }
            return (
              <>
                <Navbar isLogout={false} />
                <LoginForm />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

const LoginForm = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = await axios.post(`${BACKEND_URL}/sso/api/login`, formData);
      if (data.data.success) {
        console.log("form submitted! user logged in");
        localStorage.setItem("token", data.data.token);
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else throw new Error("Login failed");
    } catch (err) {
      setLoginFailed(true);
      setTimeout(() => {
        setLoginFailed(false);
      }, 2000);
      console.log(err);
    }
  };
  if (success)
    return (
      <>
        <h1>Login Successful, You are Logged In 🙋</h1>
        <p>Page will automatically reload after 2 second</p>
      </>
    );
  return (
    <div>
      {loginFailed && <h2>Login Failed 🙅</h2>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
