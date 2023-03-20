import React from "react";
import preloader from "../../../assets/img/loader.gif";
import style from "./Preloader.module.css";

const Preloader: React.FC = () => {
  return (
    <div className={style.container}>
      <img src={preloader as unknown as string} alt="Preloader" />
    </div>
  );
};

export default Preloader;
