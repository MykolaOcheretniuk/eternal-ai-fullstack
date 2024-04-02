import Image from "next/image";
import Volume from "../../../../public/volume.svg";
import Share from "../../../../public/share.svg";
import "./IndividualMessage.css";
interface Props {
  message: string | null;
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
          {message ? (
            <>
              <p className="individual-message-text">{message}</p>
              <div className="individual-message-tools">
                <span className="individual-message-audio">
                  <Image src={Volume} alt="volume" />
                </span>
                <span className="individual-message-share">
                  <Image src={Share} alt="share" />
                </span>
              </div>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <circle cx="18" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".67"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle cx="12" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin=".33"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
                <circle cx="6" cy="12" r="0" fill="currentColor">
                  <animate
                    attributeName="r"
                    begin="0"
                    calcMode="spline"
                    dur="1.5s"
                    keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                    repeatCount="indefinite"
                    values="0;2;0;0"
                  />
                </circle>
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
