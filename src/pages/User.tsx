import React from "react";
import Button from "../components/base/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth";
import { ThemeToggleButton } from "../common/ThemeToggleButton";

const User: React.FC = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dark:bg-dark-900 relative flex min-h-screen items-center justify-center bg-white">
      <title>User</title>
      <meta name="description" content="Halaman User adalah halaman utama" />
      <div className="fixed top-5 left-5">
        <ThemeToggleButton />
      </div>
      <h1 className="tablet:text-7xl text-5xl font-bold text-gray-900 dark:text-white">
        Welcome to <br className="tablet:hidden" />{" "}
        <span className="from-primary bg-gradient-to-r to-indigo-900 bg-clip-text text-transparent">
          User
        </span>
      </h1>
      <div className="fixed right-5 bottom-5">
        <Button onClick={handleLogout} variant="primary">
          {" "}
          Logout
        </Button>
      </div>
    </div>
  );
};

export default User;
