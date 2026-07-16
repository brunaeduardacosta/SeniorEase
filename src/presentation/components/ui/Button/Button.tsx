import type { ButtonHTMLAttributes, ReactNode } from "react";


type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
  };


export function Button({
  children,
  variant = "primary",
  size = "medium",
  style,
  ...props
}: ButtonProps) {


  const colors = {
    primary: {
      background:"#2563EB",
      color:"#FFFFFF",
    },

    secondary:{
      background:"#E2E8F0",
      color:"#1E293B",
    },

    danger:{
      background:"#DC2626",
      color:"#FFFFFF",
    },
  };


  const sizes = {

    small:{
      padding:"10px 16px",
      fontSize:"16px",
    },

    medium:{
      padding:"14px 24px",
      fontSize:"18px",
    },

    large:{
      padding:"18px 30px",
      fontSize:"20px",
    },

  };


  return (

    <button

      {...props}

      style={{

        width:"100%",

        border:"none",

        borderRadius:"14px",

        fontWeight:700,

        cursor:"pointer",

        minHeight:"56px",

        transition:"0.2s",

        ...colors[variant],

        ...sizes[size],

        ...style,

      }}

    >

      {children}

    </button>

  );

}