import React from "react";
import Circles from "../UI/Circles/Circles";
import Registration from "./Registration/Registration";
import style from "./Metaverse.module.css";

type MetaverseProps = {
  to: string;
};

const Metaverse: React.FC<MetaverseProps> = () => {
  return (
    <>
      <div className={style.metaverse}>
        <Circles left={560} top={107} />
        <div className={style.circlesInfo}>
          <div className={style.circlesInfoText}>Q1 2022</div>
          <div className={style.circlesInfoCircle}>
            <div className={style.circlesInfoDot}></div>
          </div>
        </div>

        <div className={style.metaverseContainer}>
          <div className={style.metaverseTitile}>
            Explore Your own planet
            <br />
            In
            <span> our new </span>
            metaverse
          </div>

          <div className={style.roadMap}>
            <div className={style.roadMapTitle}>Roadmap stats</div>
            <div className={style.roadMapInfo}>
              <div className={style.roadMapInfoTitle}>12, 345</div>
              <div className={style.roadMapInfoText}>Lorem ipsum dolor</div>
            </div>
            <div className={style.roadMapInfo}>
              <div className={style.roadMapInfoTitle}>12, 345</div>
              <div className={style.roadMapInfoText}>Lorem ipsum dolor</div>
            </div>
            <div className={`${style.roadMapInfo} ${style.roadMapLastInfo}`}>
              <div className={style.roadMapInfoTitle}>12, 345</div>
              <div className={style.roadMapInfoText}>Lorem ipsum dolor</div>
            </div>
          </div>
        </div>

        <div className={style.metaverseInfo}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </div>
      <Registration />
    </>
  );
};

export default Metaverse;
