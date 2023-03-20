import React from "react";
import style from "./UserInfo.module.css";

type UserInfoProps = {
  value: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ value }) => {
  return (
    /* Передаю текст при вызове компоненты (name, email и тд) */
    <div className={style.UserInfo}>{value}</div>
  );
};

export default UserInfo;
