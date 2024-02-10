import Image from "next/image";
import Volume from "../../../../public/volume.svg";
import Share from "../../../../public/share.svg";
import "./IndividualMessage.css";
interface Props {
  message: string;
  individualPortraitPath: string;
}
export const IndividualMessage = ({
  message,
  individualPortraitPath,
}: Props) => {
  return (
    <div className="individual-message">
      <div className="individual-message-inner">
        <Image
          className="individual-message-portrait"
          src={`/individuals/${individualPortraitPath}`}
          width={60}
          height={60}
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
