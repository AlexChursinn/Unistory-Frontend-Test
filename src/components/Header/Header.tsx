import React, { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import Button from "../UI/Button/Button";
import Notification from "./Notification/Notification";
import style from "./Header.module.css";

const Header: React.FC = () => {
  /* Импортируется useEthers из библиотеки ethers для взаимодействия с блокчейном Ethereum. */
  const { activateBrowserWallet, account } = useEthers();

  /* Устанавливаю начальное состояние showNotification с помощью хука useState, который используется для отображения или скрытия компоненты Notification */
  const [showNotification, setShowNotification] = useState<boolean>(false);

  /**
   * Использую хук useEffect, чтобы показать уведомление Notification, если аккаунт не был найден.
   * Использую setTimeout чтобы Notification не появлялся на миг при перезагрузке страницы, пока account загружается (не смог найти более подходящего способа) */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!account) {
        setShowNotification(true);
      }
    }, 200); // Задержка в 1 секунду

    return () => clearTimeout(timeoutId);
  }, [account]);

  /* Функция handleCloseNotification закрывает уведомление при клике на кнопку */
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <>
      {/* Если аккаунт не был найден, то будет показана компонента Notification. */}
      {!account && (
        <Notification
          show={showNotification}
          onClose={handleCloseNotification}
        />
      )}
      <header className={style.header}>
        <div className={style.container}>
          <div className={style.headerInner}>
            <div className={style.headerLogo}>Logo</div>
            {/* Проверка наличия значения account. Если account не определен, отображаю кнопку для подключения кошелька Metamask. Если подключение к Metamask произошло, то отобразим адрес кошелька пользователя. Если длина адреса превышает 19 символов, то адрес усекается и добавляются три точки в конце. */}
            {!account ? (
              <Button
                title="Connect Metamask"
                onClick={() => activateBrowserWallet()}
              >
                Connect Metamask
              </Button>
            ) : (
              <div className={style.wallet}>
                {account.length > 19 ? `${account.slice(0, 19)}...` : account}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
