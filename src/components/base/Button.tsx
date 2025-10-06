import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseStyle =
    "px-3.5 py-2 font-semibold cursor-pointer text-white rounded-md transition duration-300 ease-in-out active:scale-95";
  const variantStyle =
    variant === "primary"
      ? "bg-primary hover:bg-primary-600"
      : "bg-secondary hover:bg-secondary-600";

  return (
    <button className={`${baseStyle} ${variantStyle}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
