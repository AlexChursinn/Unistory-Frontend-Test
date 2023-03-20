import React, { FC, useState } from "react";
import Button from "../../../UI/Button/Button";
import Placeholder from "../../../UI/Placeholder/Placeholder";
import UserInfo from "../../../UI/UserInfo/UserInfo";
import style from "./Form.module.css";

type FormPropsType = {
  addParticipant: (formValues: { name: string; email: string }) => void;
  setFormSubmitted: (isSubmitted: boolean) => void;
  participants: { name: string; email: string }[];
  addedToList: boolean;
  handleListMeClick: () => void;
  account: string;
};

const Form: FC<FormPropsType> = ({
  addParticipant,
  setFormSubmitted,
  participants,
  addedToList,
  handleListMeClick,
  account,
}) => {
  /* Cостояние, которое содержит значения, введенные пользователем в форме */
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  /* Функция, которая обновляет состояние formValues при изменении значений в полях формы */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  /* Функция, которая вызывается при отправке формы и добавляет нового участника в список */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addParticipant(formValues);
    setFormValues({
      name: "",
      email: "",
    }); /* Сбрасывает введеные значения в поля ввода */
    setFormSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.formName}>
        <UserInfo value="Name" />
        {/**
         * Placeholder компонент, который отображает input в полях формы, если форма еще не отправлялась
         * Если форма уже отправлена (participants.length > 0 ), то компонент также отображает список участников, зарегистрировавшихся на бета-тест, вместо Placeholder.
         * При удалении participant из таблицы показываем снова Placeholder */}
        {participants.length > 0 ? (
          participants.map((participant, index) => (
            <div className={style.formParticipant} key={index}>
              {participant.name}
            </div>
          ))
        ) : (
          <Placeholder
            placeholder="We will display your name in participation list"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        )}
      </div>
      <div className={style.formEmail}>
        <UserInfo value="Email" />
        {/**
         * Placeholder компонент, который отображает input в полях формы, если форма еще не отправлялась
         * Если форма уже отправлена (participants.length > 0 ), то компонент также отображает список участников, зарегистрировавшихся на бета-тест, вместо Placeholder.
         * При удалении participant из таблицы показываем снова Placeholder*/}
        {participants.length > 0 ? (
          participants.map((participant, index) => (
            <div className={style.formParticipant} key={index}>
              {participant.email}
            </div>
          ))
        ) : (
          <Placeholder
            placeholder="We will display your email in participation list"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        )}
      </div>
      {/*  Условный оператор, который проверяет, была ли форма уже отправлена или уже есть зарегистрированные участники в списке. Если да, отображает кнопку List me to the table, которая добавляет текущего участника в список. Если нет, отображает кнопку Get early access для регистрации нового участника. */}
      {addedToList || participants.length > 0 ? (
        <Button
          title="List me to the table"
          type="submit"
          disabled={participants.length > 0 && addedToList}
          style={{
            background: participants.length > 0 && addedToList ? "#be3b10" : "",
          }}
          onClick={handleListMeClick}
        >
          List me to the table
        </Button>
      ) : (
        <Button
          title="Get early access"
          type="submit"
          disabled={!account}
          style={{ background: !account ? "#be3b10" : "" }}
        >
          Get early access
        </Button>
      )}
    </form>
  );
};

export default Form;
