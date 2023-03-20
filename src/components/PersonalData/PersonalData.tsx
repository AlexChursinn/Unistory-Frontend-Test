import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Circles from "../UI/Circles/Circles";
import UserInfo from "../UI/UserInfo/UserInfo";
import Preloader from "../UI/Preloader/Preloader";
import style from "./PersonalData.module.css";

type ParticipantType = {
  username: string;
  email: string;
  address: string;
};

const PersonalData = () => {
  const { id } = useParams<{ id: string }>(); // Используем хук useParams для получения параметра id из URL
  const [participant, setParticipant] = useState<ParticipantType | null>(null); // используем хук useState для хранения данных участника
  const [loading, setLoading] = useState<boolean>(true); // используем хук useState для отображения индикатора загрузки

  // используем хук useEffect для выполнения HTTP-запроса при загрузке компонента
  useEffect(() => {
    const fetchParticipant = async () => {
      try {
        const response = await axios.get(
          `https://new-backend.unistory.app/api/data/id/${id}`
        );
        setParticipant(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipant();
  }, [id]);

  /* Если данные с API backend ещё не загрузились показываю Preloader */
  if (loading) {
    return <Preloader />;
  }

  const { username, email, address } = participant!;

  return (
    <div className={style.personalData}>
      <Circles left={1049} top={-61} />
      <h2 className={style.personalTitle}>Personal data</h2>
      <UserInfo value="Name" />
      <div className={style.personalInfo}>{username}</div>
      <UserInfo value="Email" />
      <div className={style.personalInfo}>{email}</div>
      <UserInfo value="Wallet" />
      <div className={style.personalInfo}>{address}</div>
    </div>
  );
};

export default PersonalData;
