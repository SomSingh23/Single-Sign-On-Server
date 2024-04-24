import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, [navigate]);

  return (
    <>
      <Navbar isLogout={false} />
      <h1>Logged Out Successfully</h1>
    </>
  );
}
