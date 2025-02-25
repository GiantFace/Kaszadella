"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
  DefaultValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES } from "@/constans/Index";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}
const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {};
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-dark">
        {isSignIn
          ? "Üdvözöllek újra a legjobbak között"
          : "Hozd létre a nyertes fiókod"}
      </h1>
      <p className="text-dark-100">
        {isSignIn
          ? "Férj hozzá a legjobb tippekhez, hogy tömd a zsebed"
          : "Itt a lehetőséged, hogy legyen egy wututu autód"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? "Bejelentkezés" : "Regisztráció"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "Új vagy az oldalon? " : "Már van fiókom "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Hozz létre új fiókot" : "Bejelentkezés"}
        </Link>
      </p>
    </div>
  );
};
export default AuthForm;
