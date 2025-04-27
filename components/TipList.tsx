import React from "react";
import TippCard from "./TippCard"; // Győződj meg róla, hogy a helyes elérési út van megadva

export interface Tipp {
  title: string;
  description?: string;
  details?: string;
  price?: number;
}

interface Props {
  title: string;
  tips: Tipp[];
  containerClassName: string;
}

const TipList = ({ tips, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-5xl text-white mt-20 mb-10 md:mt-0 justify-center text-center">
        CSOMAGJAINK
      </h2>
      <ul className="tipp-list min-h-6 grid grid-cols-1 text-black sm:grid-cols-1 md:grid-cols-3 gap-1">
        {tips.map((tip, index, title) => (
          <li key={index} className="tipp-list-item">
            <TippCard tip={tip} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TipList;
