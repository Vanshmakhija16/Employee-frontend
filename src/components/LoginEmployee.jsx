import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function LoginEmployee() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${backend_url}/api/employee/login`, { email, password });

    // Save necessary info in localStorage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("employeeName", res.data.employee.name);
    localStorage.setItem("employeeId", res.data.employee._id); // <-- add this

    navigate("/employee-dashboard");
  } catch (err) {
    alert("Invalid email or password");
  }
};


  return (
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-2xl font-bold mb-4">Employee Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/employee-signup")}
        >
          Signup here
        </span>
      </p>
    </div>
  );
}
