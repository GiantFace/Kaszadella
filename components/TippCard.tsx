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
      className="
        flipbox-item
        sm:w-80
      "
      style={{ perspective: "1000px" }}
    >
      {/* A kártya belső, forgó tartalma */}
      <div
        className="
          flipbox-inner
        "
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Elülső oldal */}
        <div className="flipbox-front" style={{ backfaceVisibility: "hidden" }}>
          <h3 className="font-bold text-2xl text-dark-100 mb-7">{tip.title}</h3>
          <p className="text-dark-100 text-center">{tip.description}</p>
        </div>

        {/* Hátoldal */}
        <div className="flipbox-back">
          {/* Ha van cover kép, megjelenítjük */}
          {tip.cover && (
            <img
              src={tip.cover}
              alt={tip.title}
              className="w-500 h-500  mb-2"
            />
          )}

          <p className="text-white text-center">{tip.details}</p>

          <button
            className="
            flixbox-button
              text-white
              rounded-lg
              font-semibold
              w-40
              h-10
              hover:bg-dark-200
              transition-transform
              hover:scale-105
            "
          >
            Aktiválom
          </button>
        </div>
      </div>
    </div>
  );
};

export default TippCard;
