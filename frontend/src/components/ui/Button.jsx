// src/components/ui/Button.jsx
import React from "react";

export const Button = ({
  children,
  className = "",
  variant = "solid",
  size = "md",
  asChild = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    solid: "bg-green-700 text-white hover:bg-green-800 focus:ring-green-500",
    outline:
      "border border-green-700 text-green-700 hover:bg-green-100 focus:ring-green-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const Component = asChild ? "span" : "button";

  return (
    <Component
      className={[
        baseStyles,
        variants[variant],
        sizes[size],
        className
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
