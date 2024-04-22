/* eslint-disable @next/next/no-img-element */
import "./IndividualPortrait.css";

interface Props {
  portrait: string;
  individual: string;
  career: string;
}
export const IndividualPortrait = ({ portrait, individual, career }: Props) => {
  return (
    <div className="individual-portrait">
      <div className="individual-portrait-inner">
        <div className="individual-portrait-img-container">
          <img
            className="individual-portrait"
            src={`/individuals/${portrait}`}
            alt="Portrait"
          />
        </div>
        <div className="individual-info">
          <p className="info-name">{individual}</p>
          <p className="individual-info-career">{career}</p>
        </div>
      </div>
    </div>
  );
};
