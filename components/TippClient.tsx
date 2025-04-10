// components/TipsClient.tsx
"use client";

import { useState } from "react";
import { Session } from "next-auth";

export default function TipsClient({
  session,
  subscription,
}: {
  session: Session | null;
  subscription: any;
}) {
  const [selectedDay, setSelectedDay] = useState("Hétfő");

  if (!session || !subscription) {
    return <div>Nincs jogosultságod</div>;
  }

  return <div>{/* pl. tippek listája */}</div>;
}
