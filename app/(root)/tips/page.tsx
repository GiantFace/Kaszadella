import { auth } from "@/auth";
import { getUserSubscription } from "@/database/subscription";
import TipsClient from "@/components/TippClient";

export default async function TipsPage() {
  const session = await auth();
  const subscription = session?.user?.id
    ? await getUserSubscription(session.user.id)
    : null;

  return <TipsClient session={session} subscription={subscription} />;
}
