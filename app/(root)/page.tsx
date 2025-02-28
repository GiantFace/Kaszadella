import Image from "next/image";
import { Button } from "@/components/ui/button";
import TipList from "@/components/TipList";
import TipOverview from "@/components/TipOverview";
import { sampleTips } from "@/constans/Index";
import Description from "@/components/Description";

const Home = () => (
  <>
    <TipOverview {...sampleTips[0]} />
    <TipList tips={sampleTips} contaionerClassName="mt-28" />
    <Description />
  </>
);

export default Home;
