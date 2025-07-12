"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const ContactPage: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      userId,
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast({
        variant: "default",
        title: "Üzenet elküldve!",
        front_description: "Hamarosan válaszolunk.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Hiba történt",
        front_description: "Kérlek próbáld meg újra később.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-black via-gray-900 to-black">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-primary-turquoise animate-bounce">
        Vedd fel velünk a kapcsolatot 📩
      </h1>

      <p className="text-lg text-center text-gray-300 mb-10 max-w-2xl animate-fade-in">
        Ha bármilyen kérdésed vagy észrevételed van, itt tudsz üzenni nekünk!
        Töltsd ki az űrlapot, és hamarosan válaszolunk.
      </p>

      <div className="w-full max-w-2xl bg-white bg-opacity-10 rounded-2xl p-8 shadow-2xl backdrop-blur-md animate-fade-in">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-semibold text-white mb-1"
              htmlFor="name"
            >
              Név
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              placeholder="Írd be a neved"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-white mb-1"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              placeholder="saját@emailcímed.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-semibold text-white mb-1"
              htmlFor="message"
            >
              Üzenet
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-turquoise"
              placeholder="Írd meg az üzeneted..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md font-bold bg-primary-turquoise text-black hover:bg-opacity-80 transition"
          >
            Üzenet küldése
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
