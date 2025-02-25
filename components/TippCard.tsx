import React from "react";

interface Tipp {
  title: string;
  description: string;
  details: string;
  imageUrl?: string;
}

interface TippCardProps {
  tip: Tipp;
}

const TippCard: React.FC<TippCardProps> = ({ tip }) => {
  return (
    <div
      className="flipbox-item w-full sm:w-80 h-48 cursor-pointer mx-auto group"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-full h-full transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div
          className="absolute inset-0 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4 border-l-dark-100"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="font-bold text-xl text-dark-100">{tip.title}</h3>
          <p className="mt-2 text-dark-100">{tip.description}</p>
        </div>
        {/* Back Side */}
        <div
          className="absolute inset-0 bg-primary rounded-lg shadow-lg flex flex-col items-center justify-center p-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="text-white">{tip.details}</p>
        </div>
      </div>
    </div>
  );
};

export default TippCard;
