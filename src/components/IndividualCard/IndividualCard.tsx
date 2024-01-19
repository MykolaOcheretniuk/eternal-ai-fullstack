"use client";
import { Individual } from "@/models/individuals";
import "./IndividualCard.css";
import Image from "next/image";
interface Props {
  individual: Individual;
}
export const IndividualCard = ({ individual }: Props) => {
  const { name, career, photoPath } = individual;
  return (
    <div className="individual-card">
      <div className="individual-portrait-container">
        <Image
          className="individual-portrait"
          src={`/individuals/${photoPath}`}
          alt="portrait"
          width={269}
          height={279}
          priority={false}
          style={{
            background: ` lightgray 50% / cover no-repeat`,
          }}
        />
      </div>
      <div className="individual-card-info">
        <p className="individual-card-name">{name}</p>
        <p className="individual-card-career">{career}</p>
      </div>
    </div>
  );
};
