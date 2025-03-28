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
    <div
      className="flex flipbox-item w-full sm:w-80 md:w-80 lg:w-[440px] mx-auto mb-16 md:mb-6 mt-6"
      style={{ perspective: "1000px" }}
    >
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
          <h3 className="font-bold text-2xl text-white text-center">
            {tip.title}
          </h3>
          {/* Kép */}
          {tip.cover && (
            <div className="w-full flex justify-center">
              <img
                src={tip.cover}
                alt={tip.title}
                height={300}
                width={300}
                className="max-w-full"
              />
            </div>
          )}
          {/* Szöveg */}
          <p
            className="text-white text-l mt-[-20px] text-center"
            style={{ whiteSpace: "pre-line" }}
          >
            {tip.back_description}
          </p>
          {/* Gomb */}
          <div className="w-full flex justify-center max-h-0.5">
            <button className="flixbox-button text-white rounded-lg font-semibold w-full sm:w-40 h-10 hover:bg-dark-200 transition-transform hover:scale-105">
              <Link href="/subscription">Aktiválom</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TippCard;
