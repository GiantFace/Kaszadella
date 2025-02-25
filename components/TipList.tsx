import React from "react";
import TippCard from "./TippCard"; // Győződj meg róla, hogy a helyes elérési út van megadva

interface Tipp {
  title: string;
  description: string;
  details: string;
}

interface Props {
  title: string;
  tips: Tipp[];
  containerClassName: string;
}

const TipList = ({ title, tips, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-dark-100 mt-1">
        A legjobb tippmesterektől
      </h2>
      <ul className="tipp-list">
        {tips.map((tip, index) => (
          <li key={index} className="tipp-list-item">
            <TippCard tip={tip} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TipList;
