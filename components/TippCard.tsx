import React from "react";

interface Tipp {
  title: string;
  description?: string;
  details?: string;
  cover?: string;
  price?: string;
}

interface TippCardProps {
  tip: Tipp;
}

const TippCard: React.FC<TippCardProps> = ({ tip }) => {
  return (
    <div
      className="flipbox-item w-full sm:w-80 md:w-96 lg:w-[400px] mx-auto mb-12 md:mb-6"
      style={{ perspective: "1000px" }}
    >
      {/* Kártya belső tartalma */}
      <div
        className="flipbox-inner mt-8 md:mt-0 relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Elülső oldal */}
        <div
          className="flipbox-front bg-gray-800 min-h-[200px] md:min-h-[400px] p-4 flex flex-col  items-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="font-bold text-2xl text-white mb-4 justify-start text-center">
            {tip.title}
          </h3>
          <p className="text-white text-center">{tip.description}</p>
        </div>

        {/* Hátoldal */}
        <div className="flipbox-back bg-opacity-70 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center min-h-[200px] md:min-h-[400px]">
          {/* Ha van cover kép, megjelenítjük */}
          {tip.cover && (
            <div className="flex justify-center items-center h-full">
              <img
                src={tip.cover}
                alt={tip.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}

          <p className="text-white text-center">{tip.details}</p>
          <div className="md:col-span-2 flex justify-center">
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
