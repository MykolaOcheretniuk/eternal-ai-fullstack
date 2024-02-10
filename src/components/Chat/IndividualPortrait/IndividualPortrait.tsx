import "./IndividualPortrait.css";
import Image from "next/image";

interface Props {
  portrait: string;
}
export const IndividualPortrait = ({ portrait }: Props) => {
  return (
    <div className="individual-portrait">
      <div className="individual-portrait-inner">
        <div className="individual-portrait-img-container">
          <Image
            className="individual-portrait"
            src={`/individuals/${portrait}`}
            alt="Portrait"
            width={900}
            height={900}
          />
        </div>
      </div>
    </div>
  );
};
