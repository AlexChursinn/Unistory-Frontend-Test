import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import UserInfo from "../../../UI/UserInfo/UserInfo";
import Preloader from "../../../UI/Preloader/Preloader";
import style from "./ParticipationListing.module.css";

type ParticipantType = {
  name: string;
  email: string;
};

type ParticipantApiType = {
  id: string;
  username: string;
  email: string;
  address: string;
};

type ParticipationListingPropsType = {
  participants: ParticipantType[];
  onDeleteParticipant: (index: number) => void;
  addedToList: boolean;
};

const ParticipationListing: React.FC<ParticipationListingPropsType> = ({
  participants,
  onDeleteParticipant,
  addedToList,
}) => {
  /* Подключаем account который отображает адрес кошелька пользователя из MetaMask, с помощью useEthers из библиотеки ethers.js, если пользователь подключен. */
  const { account } = useEthers();

  const [participantsApi, setParticipantsApi] = useState<ParticipantApiType[]>(
    []
  ); // массив, который содержит информацию об участниках, загруженных с с API backend

  /* Подключаем данные о пользователях с API backend */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ items: ParticipantApiType[] }>(
          "https://new-backend.unistory.app/api/data?page=0&perPage=50"
        );
        setParticipantsApi(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style.participationListing}>
      <h2 className={style.title}>
        Participation listing (enable only for participants)
      </h2>
      <div className={style.subTitle}>
        <div className={style.name}>
          <UserInfo value="Name" />
        </div>
        <div className={style.email}>
          <UserInfo value="Email" />
        </div>
        <div className={style.wallet}>
          <UserInfo value="Wallet" />
        </div>
      </div>
      <div className={style.tableContainer}>
        <table className={style.table}>
          <tbody>
            {/*  Список участников, полученных из props participants, где для каждого участника отображается его имя, email и адрес кошелька */}
            {addedToList
              ? participants.map((participant, index) => (
                  <tr key={index}>
                    <td>{participant.name}</td>
                    <td>{participant.email}</td>
                    <td>
                      {/**
                       * Проверка наличия значения account. Если account не определен, отображаю Disconnected Metamask в таблице
                       * Если подключение к Metamask произошло, то отобразим адрес кошелька пользователя. Если длина адреса превышает 24 символов, то адрес усекается и добавляются три точки в конце. */}
                      {!account ? (
                        <>Disconnected Metamask</>
                      ) : account.length > 24 ? (
                        `${account.slice(0, 19)}...`
                      ) : (
                        account
                      )}
                    </td>
                    <td>
                      <div
                        className={style.cross}
                        /* Кнопка удаления участника из таблицы */
                        onClick={() => onDeleteParticipant(index)}
                      >
                        <div className={`${style.line} ${style.line1}`}></div>
                        <div className={`${style.line} ${style.line2}`}></div>
                      </div>
                    </td>
                  </tr>
                ))
              : null}

            {/*  Список участников, полученных c API backend, где для каждого участника отображается его имя, email и адрес кошелька */}
            {participantsApi.length ? (
              participantsApi.map((participantApi) => (
                <tr className={style.participantsApi} key={participantApi.id}>
                  <td>
                    <NavLink to={"/personal/" + participantApi.id}>
                      {participantApi.username}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink to={"/personal/" + participantApi.id}>
                      {participantApi.email}
                    </NavLink>
                  </td>
                  <td>
                    {/*Если длина адреса превышает 24 символов, то адрес усекается и добавляются три точки в конце. */}
                    <NavLink to={"/personal/" + participantApi.id}>
                      {participantApi.address.length > 24
                        ? `${participantApi.address.slice(0, 19)}...`
                        : participantApi.address}
                    </NavLink>
                  </td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={style.noBorder}>
                  {/* Показываю Preloader если данные с API backend ещё не загрузились*/}
                  <Preloader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticipationListing;
