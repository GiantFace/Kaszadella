// app/(root)/my-profile/page.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { auth } from "@/auth"; // Ha elérhető közvetlenül az auth modulodban

// A Next.js szabvány oldal props definíciója
export interface PageProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<any>;
}

type SegmentParams<T extends Object = any> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends string
          ? string | string[] | undefined
          : never;
      }
    : T;

// nem közvetlen prop-on keresztül adod át, hanem a komponensen belül hívod meg
const Page = async ({ params, searchParams }: PageProps) => {
  const session = await auth(); // így nyerd ki a session-t

  return (
    <>
      {session && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="mb-10"
        >
          <Button>Logout</Button>
        </form>
      )}
    </>
  );
};

export default Page;
