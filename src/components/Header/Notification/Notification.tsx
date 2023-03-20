import React, { useState, useEffect } from "react";
import Button from "../../UI/Button/Button";
import style from "./Notification.module.css";

type NotificationProps = {
  show: boolean;
  onClose: () => void;
};

const Notification: React.FC<NotificationProps> = ({ show, onClose }) => {
  /**
   * Создаю состояние для отображения и скрытия компоненты Notification
   * Использую хук useState для создания состояния shouldRender, который инициализируется значением show, и функции setShouldRender для обновления этого состояния  */
  const [shouldRender, setShouldRender] = useState<boolean>(show);

  /* Использую хук useEffect для запуска колбэка после отображения компонента, который устанавливает shouldRender в true, если значение show равно true */
  useEffect(() => {
    if (show) {
      setShouldRender(true);
    }
  }, [show]);

  /* Создаю функцию handleAnimationEnd, которая устанавливает shouldRender в false, если значение show равно false */
  const handleAnimationEnd = (): void => {
    if (!show) {
      setShouldRender(false);
    }
  };

  /* Если shouldRender равно false, то компонент не отображается */
  if (!shouldRender) {
    return null;
  }

  return (
    <div
      /* Если show равно true, то будет присвоен класс style.show, который добавляет стили для анимации отображения уведомления. Если show равно false, то будет присвоен класс style.hide, который добавляет стили для анимации скрытия уведомления */
      className={`${style.notification} ${show ? style.show : style.hide}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className={style.notificationContainer}>
        <div className={style.title}>Metamask Extension</div>
        <div className={style.subtitle}>
          To work with our application, you have to <br /> install the
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          >
            {" "}
            Metamask browser extension
          </a>
        </div>
        <div className={style.button}>
          <Button title="Skip this step" onClick={onClose}>
            Skip this step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
