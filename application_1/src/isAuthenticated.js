import axios from "axios";
import BACKEND_URL from "./services/api";
import { defer } from "react-router-dom";
async function roleChecking() {
  let token = localStorage.getItem("token");
  let data = await axios.post(`${BACKEND_URL}/api/app1/verify`, {
    token,
  });
  return data.data.value;
}
export default function isAuthenticated() {
  return defer({ value: roleChecking() });
}
