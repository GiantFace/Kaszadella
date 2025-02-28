import React from "react";

interface Tipp {
  title: string;
  description: string;
  details: string;
  cover?: string;
  price: string;
}

interface TippCardProps {
  tip: Tipp;
}

const TippCard: React.FC<TippCardProps> = ({ tip }) => {
  return (
    <div
      className="flipbox-item w-full sm:w-80 h-48 cursor-pointer mx-auto"
      style={{ perspective: "1000px" }}
    >
      <div
        className="flipbox-inner relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="flipbox-front absolute inset-0 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="font-bold text-xl text-dark-100">{tip.title}</h3>
          <p className="mt-2 text-dark-100">{tip.description}</p>
        </div>
        {/* Back Side */}
        <div
          className="flipbox-back absolute inset-0 bg-blue-100 rounded-lg shadow-lg flex flex-col items-center p-4 duration-150 gap-3"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <img src={tip.cover} width={300} height={300} className="mb-2" />

            <p className="text-white text-center">{tip.details}</p>

            {/* Gomb feljebb helyezve */}
            <button className="bg-dark-100 text-white px-4 py-2 rounded-lg hover:bg-dark-200 transition-transform hover:scale-105">
              Aktiválom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TippCard;
