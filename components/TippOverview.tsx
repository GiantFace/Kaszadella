import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TippCover from "./TippCover";

const TippOverview = ({
  title,
  sum_tip_number,
  available_tipps,
  rating,
  description,
  winned_tip,
  winned_money,
  color,
  cover,
  video,
}: Tipp) => {
  return (
    <section className="tipp-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>Magyarország listavezető tippoldala</h1>
        <div className="tipp-info">
          <p>
            A <span className="font-semibold text-light-200">{title}</span>
          </p>

          <p>
            nyertes szelvényének száma: {sum_tip_number}
            <span className="font-semibold text-light-200"></span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="tipp-copies">
          <p>
            Összes nyeremény: <span>{winned_money}</span>
          </p>

          <p>
            Elérhető tippek: <span>{available_tipps} db</span>
          </p>
        </div>
        <p className="tipp-description">{description}</p>

        <Button className="tipp-overview-button">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className={"font-bebas-neue text-xl text-dark-100"}>Fogadás</p>
        </Button>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <TippCover
            variant="wide"
            className="z-10"
            coverColor={color}
            colorImage={cover}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden"></div>
        </div>
      </div>
    </section>
  );
};
export default TippOverview;
