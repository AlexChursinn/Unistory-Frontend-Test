import React, { useContext } from "react";
import { RegistrationContext } from "../../../context/context";
import Form from "./Form/Form";
import ParticipationListing from "./ParticipationListing/ParticipationListing";
import style from "./Registration.module.css";

const Registration: React.FC = () => {
  const {
    formSubmitted,
    participants,
    addedToList,
    account,
    addParticipant,
    setFormSubmitted,
    handleListMeClick,
    onDeleteParticipant,
  } = useContext(RegistrationContext);

  return (
    <div className={style.registration}>
      <div className={style.registrationContainer}>
        <div className={style.registrationBlock}>
          <div className={style.registrationTitle}>Beta test registration</div>
          <div className={style.registrationInfo}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <Form
            addParticipant={addParticipant} // функция, которая добавляет нового участника в массив
            setFormSubmitted={setFormSubmitted} // обновить состояние после отправки формы
            participants={participants} // массив, который содержит информацию об участниках, зарегистрировавшихся на бета-тест
            addedToList={addedToList} // изначальное сосотояние добавления пользователя в таблицу
            handleListMeClick={handleListMeClick} // добавляем пользователя в таблицу
            account={account || ""} // информацию о подключенном кошельке
          />
        </div>
        {/* ParticipationListing: компонент, который отображает список зарегистрировавшихся участников. Он отображается только после отправки формы (когда formSubmitted и account равны true). */}
        {formSubmitted && account && (
          <ParticipationListing
            addedToList={addedToList}
            participants={participants}
            onDeleteParticipant={onDeleteParticipant}
          />
        )}
      </div>
    </div>
  );
};

export default Registration;
