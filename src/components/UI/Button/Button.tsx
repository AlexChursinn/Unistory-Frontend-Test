import React from "react";
import style from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  [key: string]: any; // Опциональный индексный тип для неизвестных пропсов
};

const Button = ({ children, disabled = false, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={style.button} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
