import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";

interface ProfileProps {
  session?: Session | null;
}

const Page = ({ session }: ProfileProps) => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>
    </>
  );
};
export default Page;
