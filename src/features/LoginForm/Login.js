import React, { useState } from "react";
import { useLoginMutation } from "../api/apiSlice";
import { setUserCredentials } from "../authSlice/authSlice";
import { useDispatch } from "react-redux";
const LoginForm = () => {
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const [inputData, setInputData] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({ data: inputData, password: password });
    console.log(data);
    dispatch(setUserCredentials(data));
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="email or username"
          onChange={(e) => setInputData(e.target.value)}
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
