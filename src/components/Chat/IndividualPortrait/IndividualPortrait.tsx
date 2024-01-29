import "./IndividualPortrait.css";
import Portrait from "../../../../public/individuals/MartinLuther.png";
import Image from "next/image";
import ChatBackground from "../../../../public/ChatIndividualBg.svg";
export const IndividualPortrait = () => {
  return (
    <div className="individual-portrait">
      <div className="individual-portrait-inner">
        <div className="individual-portrait-img-container">
          <Image
            className="individual-portrait-img"
            src={Portrait}
            alt="portrait"
          />
        </div>
        <div className="individual-description">
          <p className="individual-name">Martin Luther King, Jr.</p>
          <p className="individual-career">Political Activist</p>
        </div>
      </div>
    </div>
  );
};
