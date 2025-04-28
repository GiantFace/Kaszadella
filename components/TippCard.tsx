import React from "react";
import Link from "next/link";

interface Tipp {
  title: string;
  front_description?: string;
  back_description?: string;
  details?: string;
  cover?: string;
  price?: number;
  accuracy?: number;
}

interface TippCardProps {
  tip: Tipp;
}

const TippCard: React.FC<TippCardProps> = ({ tip }) => {
  return (
    <div className="flipbox-item" style={{ perspective: "1000px" }}>
      {/* Kártya belső tartalma */}
      <div
        className="flipbox-inner mt-5 md:mt-0 absolute"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Elülső oldal */}
        <div
          className="flipbox-front bg-gray-800 min-h-[80px] md:min-h-[200px] p-4 flex flex-col items-center"
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
          {tip.accuracy !== undefined && (
            <div className="justify-center top-[-40] transform  bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-sm px-4 py-2 rounded-full shadow-lg z-[-20] trapezoid-shape">
              🎯 Találati arány: {tip.accuracy}%
            </div>
          )}

          <h3 className="font-bold text-2xl text-white text-center max-h-1">
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
          <button className="flixbox-button bg-yellow-500 mt-[-20] text-black rounded-lg font-semibold w-full absolu h-10 hover:bg-primary-turquoise hover:text-black transition-transform hover:scale-105 min-h-9">
            <Link href="/subscription">Aktiválom</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TippCard;
