"use client";
import { Dispatch, SetStateAction, useState } from "react";
import "./AuthForm.css";
interface Props {
  setPassword: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  email: string;
}
export const AuthForm = ({ setPassword, setEmail }: Props) => {
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <form className="auth-form">
      <div className="auth-form-input">
        <p className="input-text avenir-bold">Email</p>
        <input
          className="auth-input base-input"
          placeholder="justin@gmail.com"
          type="email"
          onChange={handleEmailInput}
        ></input>
      </div>
      <div className="auth-form-input"></div>
      <p className="input-text avenir-bold">Password</p>
      <input
        className="auth-input base-input"
        placeholder="•••••••••••••••••••"
        type="password"
        onChange={handlePasswordInput}
      ></input>
    </form>
  );
};
