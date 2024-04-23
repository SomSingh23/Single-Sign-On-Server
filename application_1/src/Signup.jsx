import React, { useState } from "react";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "./services/api";
function Signup() {
  const { value } = useLoaderData();
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={value}>
          {(value) => {
            if (value === true) {
              return <h1>Authenticated</h1>;
            }
            return <SignupForm />;
          }}
        </Await>
      </Suspense>
    </>
  );
}

const SignupForm = () => {
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
    let data = await axios.post(`${BACKEND_URL}/sso/api/signup`, formData);
    console.log(data.data);
    console.log("form submitted!");
  };

  return (
    <div>
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
