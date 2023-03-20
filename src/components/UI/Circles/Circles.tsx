import React, { useEffect, useState } from "react";
import style from "./Circles.module.css";

type CirclesProps = {
  left: number;
  top: number;
};

/* Указал left, top, которые определяют позицию компоненты на странице, чтобы можно было переиспользовать компоненту на главной странице 'Metaverse' и на  странице 'PersonalData' */
const Circles: React.FC<CirclesProps> = ({ left, top }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  /* Запускаю анимацию оранжевой линии после вмонтирования компоненты*/
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className={style.circles}>
      <div
        className={style.circleOne}
        style={{ left: left - 3, top: top - 3 }}
      ></div>
      <div className={style.circleTwo} style={{ left: left, top: top }}></div>

      <div
        className={style.circleThreeOne}
        style={{ left: left + 20, top: top + 20 }}
      >
        <div className={style.dotOne}></div>
        <div className={style.dotTwo}></div>
      </div>
      <div
        className={style.circleThreeTwo}
        style={{ left: left - 28.6, top: top - 28.6 }}
      >
        {/**
         * Анимация оранжевой линии
         * Для заполнения линии используется анимация изменения параметров stroke-dasharray
         * Для движения шарика по той же окружности используется анимация animateMotion
         */}
        <svg
          id="svg1"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="583.2"
          height="583.2"
          viewBox="0 0 120 120"
        >
          <g transform="rotate(450 60 60)">
            <path
              id="pathID"
              fill="none"
              stroke="transparent"
              strokeWidth="2"
              d="M 60,10 A 50,50 0 0 0 10,60"
            />

            <circle
              cx="50%"
              cy="50%"
              r="50"
              fill="none"
              strokeDashoffset="-157"
              strokeDasharray="0,157"
              stroke="#e75626"
              strokeWidth="0.1"
              fillOpacity="0"
            >
              <animate
                attributeName="stroke-dasharray"
                begin={isAnimating ? "0s" : "indefinite"}
                dur="3s"
                values="0;157"
                fill="freeze"
              />
            </circle>
          </g>
        </svg>
      </div>
      <div
        className={style.circleFour}
        style={{ left: left + 40, top: top + 40 }}
      ></div>
      <div
        className={style.circleFive}
        style={{ left: left + 71, top: top + 71 }}
      ></div>
      <div
        className={style.circleSix}
        style={{ left: left + 78, top: top + 78 }}
      ></div>
      <div
        className={style.circleSeven}
        style={{ left: left + 103, top: top + 103 }}
      ></div>
    </div>
  );
};

export default Circles;
