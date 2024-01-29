import Image from "next/image";
import SenderPortrait from "../../../../public/individuals/ElonMusk.png";
import Volume from "../../../../public/volume.svg";
import Share from "../../../../public/share.svg";
import "./IndividualMessage.css";
interface Props {
  message: string;
}
export const IndividualMessage = ({ message }: Props) => {
  return (
    <div className="individual-message">
      <div className="individual-message-inner">
        <Image
          className="individual-message-portrait"
          src={SenderPortrait}
          alt="portrait"
        />
        <div className="individual-message-content">
          <p className="individual-message-text">{message}</p>
          <div className="individual-message-tools">
            <span className="individual-message-audio">
              <Image src={Volume} alt="volume" />
            </span>
            <span className="individual-message-share">
              <Image src={Share} alt="share" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
