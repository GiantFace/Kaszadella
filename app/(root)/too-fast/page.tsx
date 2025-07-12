import React from "react";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col  items-center justify-center">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Túl sok bejelentkezési kísérletet értél el! Várj egy 1 percet!
      </h1>
      <p className="text-sm text-light-100">
        Úgy tűnik nagyon sokszor próbáltál bejelentkezni, melyet a szerver
        támádasnák vesz. Kérlek várj türelemmel!
      </p>
    </main>
  );
};

export default Page;
