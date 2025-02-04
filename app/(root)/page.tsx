import Image from "next/image";
import { Button } from "@/components/ui/button";
import TippList from "@/components/TippList";
import TippOverview from "@/components/TippOverview";
import { sampleTipps } from "@/constans/Index";

const Home = () => (
  <>
    <TippOverview {...sampleTipps[0]} />
    <TippList
      title="Zeus tippek"
      tipps={sampleTipps}
      contaionerClassName="mt-28"
    />
  </>
);

export default Home;
