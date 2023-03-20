import { useState } from "react";
import styles from "./Placeholder.module.css";

type PlaceholderProps = {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  error?: string;
};

const Placeholder = ({
  placeholder,
  value,
  onChange,
  type,
  name,
  error,
}: PlaceholderProps) => {
  /* Placeholder принимает объект props и использует его свойство placeholder в качестве значения по умолчанию для состояния placeholder, которое управляется с помощью хука useState */
  const [currentPlaceholder, setCurrentPlaceholder] =
    useState<string>(placeholder);

  /* Когда пользователь фокусируется на поле ввода, функция handleFocus вызывается и вызывает функцию setPlaceholder с пустой строкой, устанавливая значение placeholder в пустую строку */
  const handleFocus = (): void => {
    setCurrentPlaceholder("");
  };

  /* Когда пользователь уходит с поля ввода, функция handleBlur вызывается и вызывает функцию setPlaceholder с исходным значением props.placeholder, возвращая значение placeholder к исходному состоянию */
  const handleBlur = (): void => {
    setCurrentPlaceholder(placeholder);
  };

  return (
    <input
      className={
        error
          ? `${styles.placeholder} ${styles.error}`
          : `${styles.placeholder}`
      }
      placeholder={currentPlaceholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      onChange={onChange}
      type={type}
      name={name}
    />
  );
};

export default Placeholder;
