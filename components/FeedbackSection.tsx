import { feedbacks } from "@/constans/Index";

export default function FeedbackSection() {
  // Példa adatok

  return (
    <section className="relative w-full py-12 bg-[url('/images/coins-bg.jpg')] bg-cover bg-center bg-no-repeat text-white">
      {/* Háttér: coins-bg.jpg (egy példa háttérkép, cseréld le a valós útra) */}
      <div className="backdrop-brightness-90 backdrop-blur-sm min-h-[300px] w-full flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8">
          Testidőszak alatti visszajelzések
        </h2>

        {/* Rácsos elrendezés: 3 oszlop nagy képernyőn, 2 közepesen, 1 mobilon */}
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {feedbacks.map((item, idx) => (
            <div
              key={idx}
              className="bg-black/70 rounded-lg p-6 flex flex-col justify-between shadow-lg"
            >
              <p className="text-xl italic mb-4"> {item.quote} </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
