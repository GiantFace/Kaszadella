import React from "react";

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
      className="flex flipbox-item w-full sm:w-80 md:w-96 lg:w-[440px] mx-auto mb-16 md:mb-6"
      style={{ perspective: "1000px" }}
    >
      {/* Kártya belső tartalma */}
      <div
        className="flipbox-inner mt-8 md:mt-0 relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Elülső oldal */}
        <div
          className="flipbox-front bg-gray-800 min-h-[200px] md:min-h-[400px] p-4 flex flex-col items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="font-bold text-2xl text-white mb-4 text-center">
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
                className="max-w-full object-contain"
              />
            </div>
          )}
          {/* Szöveg */}
          <p
            className="text-white text-xl mt-[-20px] text-center"
            style={{ whiteSpace: "pre-line" }}
          >
            {tip.back_description}
          </p>
          {/* Gomb */}
          <div className="w-full flex justify-center">
            <button className="flixbox-button text-white rounded-lg font-semibold w-full sm:w-40 h-10 hover:bg-dark-200 transition-transform hover:scale-105">
              Aktiválom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TippCard;
