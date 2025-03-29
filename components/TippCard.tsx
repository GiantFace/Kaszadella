import React from "react";
import Link from "next/link";

interface Tipp {
  title: string;
  front_description?: string;
  back_description?: string;
  details?: string;
  cover?: string;
  price?: number;
}

interface TippCardProps {
  tip: Tipp;
}

const TippCard: React.FC<TippCardProps> = ({ tip }) => {
  return (
    <div className="flipbox-item" style={{ perspective: "1000px" }}>
      {/* Kártya belső tartalma */}
      <div
        className="flipbox-inner mt-8 md:mt-0 absolute"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Elülső oldal */}
        <div
          className="flipbox-front bg-gray-800 min-h-[50px] md:min-h-[200px] p-4 flex flex-col items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="font-bold text-2xl text-white mb-5 text-center">
            {tip.title}
          </h3>
          <p className="text-white text-center">{tip.front_description}</p>
        </div>

        {/* Hátoldal */}
        <div className="flipbox-back bg-gray-800 p-4 flex flex-col items-center min-h-[250px] md:min-h-[400px] gap-4">
          {/* Felül: cím */}
          <h3 className="font-bold text-2xl text-white text-center max-h-1.5">
            {tip.title}
          </h3>
          {/* Kép */}
          {tip.cover && (
            <div className="w-full flex justify-center">
              <img
                src={tip.cover}
                alt={tip.title}
                height={320}
                width={320}
                className="max-w-full"
              />
            </div>
          )}
          {/* Szöveg */}
          <p
            className="text-white mt-[-20px] text-center min-h-20 "
            style={{ whiteSpace: "pre-line" }}
          >
            {tip.back_description}
          </p>
          {/* Gomb */}
          <button className="flixbox-button text-white rounded-lg font-semibold w-full  h-10 hover:bg-dark-200 transition-transform hover:scale-105 min-h-9">
            <Link href="/subscription">Aktiválom</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TippCard;
