import React, { useState } from "react";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "./services/api";
import Navbar from "./Navbar";
function Signup() {
  const { value } = useLoaderData();

  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={value}>
          {(value) => {
            if (value === true) {
              return (
                <>
                  <Navbar isLogout={true} />
                  <h1>You are Logged In 🙋</h1>
                </>
              );
            }
            return (
              <>
                <Navbar isLogout={false} />
                <SignupForm />
              </>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

const SignupForm = () => {
  const [alreadyThere, setAlreadyThere] = useState(false);
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
    try {
      e.preventDefault();
      let data = await axios.post(`${BACKEND_URL}/sso/api/signup`, formData);
      if (data.data.success) {
        console.log("form submitted! user created");
        localStorage.setItem("token", data.data.token);

        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else throw new Error("Signup failed");
    } catch (err) {
      setAlreadyThere(true);
      setTimeout(() => {
        setAlreadyThere(false);
      }, 2000);
      console.log(err);
    }
  };
  if (success)
    return (
      <>
        <h1>Signup Successful, Your Logged In 🙋</h1>
        <p>Page will automatically reload after 2 second</p>
      </>
    );
  return (
    <div>
      {alreadyThere === true ? <h1>User Already Exists 🙅</h1> : <h1></h1>}
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default Signup;
