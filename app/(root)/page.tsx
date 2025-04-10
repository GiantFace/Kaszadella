import TipList from "@/components/TipList";
import TipOverview from "@/components/TipOverview";
import { sampleTips } from "@/constans/Index";
import Description from "@/components/Description";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async () => {
  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));
  return (
    <>
      <TipOverview {...sampleTips[0]} />

      <Description />
    </>
  );
};

export default Home;
