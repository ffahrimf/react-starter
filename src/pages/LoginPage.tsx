import React from "react";
import { LoginForm } from "../components/auth/LoginForm";
import ThemeTogglerTwo from "../common/ThemeTogglerTwo";

const LoginPage: React.FC = () => {
  return (
    <div>
      <title>Login Page</title>
      <meta
        name="description"
        content="Masukkan detail Anda untuk masuk ke akun Anda"
      />
      <div className="relative flex">
        <LoginForm />
        <div className="fixed right-6 bottom-6 z-50">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
