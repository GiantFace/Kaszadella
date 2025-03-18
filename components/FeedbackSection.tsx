import { ReactNode, useEffect, useRef, useState } from "react";
import { feedbacks } from "@/constans/Index";

type FadeInOnScrollProps = {
  children: ReactNode;
};

function FadeInOnScroll({ children }: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
}

export default function FeedbackSection() {
  return (
    <section className="relative w-full py-12 bg-[url('/images/coins-bg.jpg')] bg-cover bg-center bg-no-repeat text-white ">
      {/* Háttér effektusok */}
      <div className="backdrop-brightness-90 backdrop-blur-sm min-h-20 w-full flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
          Testidőszak alatti visszajelzések
        </h2>

        {/* Rácsos elrendezés: mobilon 1, sm-n 2, md-n 3 oszlop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto ">
          {feedbacks.map((item, idx) => (
            <FadeInOnScroll key={idx}>
              <div className="bg-black/70 rounded-lg p-6 flex flex-col justify-between shadow-lg">
                <p className="text-xl italic mb-4">{item.quote}</p>
                <div className="flex items-center gap-3 mt-auto text-sm ">
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
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
