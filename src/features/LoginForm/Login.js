import React, { useState } from "react";
import { useLoginMutation } from "../api/apiAuthSlice";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login({ data: email, password: password });
    console.log(data);
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
