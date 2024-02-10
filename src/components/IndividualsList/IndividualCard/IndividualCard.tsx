"use client";
import { Individual } from "@/models/individuals";
import "./IndividualCard.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {
  individual: Individual;
}
export const IndividualCard = ({ individual }: Props) => {
  const { name, career, photoPath } = individual;
  const router = useRouter();
  return (
    <div
      className="individual-card"
      onClick={() => {
        router.push(
          `/chat?individual=${name}&portrait=${photoPath}&career=${career}`
        );  
      }}
    >
      <div className="individual-portrait-container">
        <Image
          className="individual-portrait"
          src={`/individuals/${photoPath}`}
          alt="portrait"
          width={269}
          height={279}
          priority={false}
        />
      </div>
      <div className="individual-card-info">
        <p className="individual-card-name">{name}</p>
        <p className="individual-card-career">{career}</p>
      </div>
    </div>
  );
};
