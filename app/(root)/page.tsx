import Image from "next/image";
import { Button } from "@/components/ui/button";
import TipList from "@/components/TipList";
import TipOverview from "@/components/TipOverview";
import { sampleTips } from "@/constans/Index";

const Home = () => (
  <>
    <TipOverview {...sampleTips[0]} />
    <TipList
      title="Zeus tippek"
      tips={sampleTips}
      contaionerClassName="mt-28"
    />
  </>
);

export default Home;
