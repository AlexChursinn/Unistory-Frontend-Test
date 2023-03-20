import React, { createContext, useState } from "react";
import { useEthers } from "@usedapp/core";

type ParticipantType = {
  name: string;
  email: string;
};

type RegistrationContextType = {
  formSubmitted: boolean;
  participants: ParticipantType[];
  addedToList: boolean;
  account: string;
  addParticipant: (formValues: ParticipantType) => void;
  setFormSubmitted: (formSubmitted: boolean) => void;
  handleListMeClick: () => void;
  onDeleteParticipant: (index: number) => void;
};

export const RegistrationContext = createContext<RegistrationContextType>(
  {} as RegistrationContextType
);

type Props = {
  children: React.ReactNode;
};

const RegistrationContextProvider: React.FC<Props> = ({ children }) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false); // состояние, которое показывает, была ли отправлена форма
  const [participants, setParticipants] = useState<ParticipantType[]>([]); // массив, который содержит информацию об участниках, зарегистрировавшихся на бета-тест
  const [addedToList, setAddedToList] = useState<boolean>(false); // изначально не добавляем пользователя в таблицу, после зполнения формы
  const { account } = useEthers(); //

  /* addParticipantHandler функция, которая добавляет нового участника в массив  */
  const addParticipantHandler = (formValues: ParticipantType) => {
    const newParticipant = {
      name: formValues.name,
      email: formValues.email,
    };
    setParticipants([newParticipant, ...participants]);
    setFormSubmitted(true); // обновить состояние после отправки формы
  };

  /*  deleteParticipantHandler функция, которая удаляет участника из массива  */
  const deleteParticipantHandler = (index: number) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  /* добавляем пользователя в таблицу */
  const handleListMeClick = () => {
    setAddedToList(true);
  };

  return (
    <RegistrationContext.Provider
      value={{
        formSubmitted,
        participants,
        addedToList,
        account: account || "",
        addParticipant: addParticipantHandler,
        setFormSubmitted,
        handleListMeClick,
        onDeleteParticipant: deleteParticipantHandler,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationContextProvider;
