import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition-colors " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-teal-700 text-white hover:bg-teal-800",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
