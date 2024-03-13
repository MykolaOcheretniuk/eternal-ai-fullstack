"use client";
import "./IndividualsList.css";
import individuals from "../../../public/individuals.json";
import { useEffect, useState } from "react";
import { Individual } from "@/models/individuals";
import { IndividualCard } from "./IndividualCard/IndividualCard";
interface Props {
  isNavOpen: boolean;
}
export const IndividualsList = ({ isNavOpen }: Props) => {
  const [individualsList, setIndividuals] = useState<Individual[]>([]);
  useEffect(() => {
    setIndividuals(individuals as Individual[]);
  }, []);
  return (
    <section className="individuals" id="individuals">
      <div className="individuals-inner">
        <h1 className="individuals-title">Individuals</h1>
        <p className="individuals-text base-text">
          Ask a question to your favorite person and get a realistic response
        </p>
        <div className="individuals-container">
          {individualsList.map((individual, i) => {
            return (
              <IndividualCard
                individual={individual}
                isNavOpen={isNavOpen}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
