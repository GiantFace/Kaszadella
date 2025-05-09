import TipList from "@/components/TipList";
import TipOverview from "@/components/TipOverview";
import { sampleTips } from "@/constans/Index";
import TipStats from "@/components/TipStats";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  const result = await db.select().from(users);
  return (
    <>
      <TipOverview />
    </>
  );
};

export default Home;
