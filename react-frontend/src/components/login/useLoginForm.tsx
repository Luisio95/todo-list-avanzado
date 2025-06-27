import { useState } from "react";

export function useLoginForm(onLogin: (email: string, password: string) => void) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValid = () => email.trim() !== "" && password.trim() !== "";

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isValid,
    resetForm,
  };
}
