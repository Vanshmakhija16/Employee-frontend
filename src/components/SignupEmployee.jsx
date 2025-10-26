import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backend_url = import.meta.env.VITE_API_BASE_URL;

export default function SignupEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  console.log({ name, email, password }); // check values
  try {
    await axios.post(`${backend_url}/api/employee/signup`, { name, email, password });
    alert("Signup successful, please login");
    navigate("/employee-login");
  } catch (err) {
    console.log(err.response?.data); // see backend message
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="flex flex-col items-center mt-16">
      <h2 className="text-2xl font-bold mb-4">Employee Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-3 w-72">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button className="bg-blue-600 text-white py-2 rounded">Signup</button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/employee-login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
}
