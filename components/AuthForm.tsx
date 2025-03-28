"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";

  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast({
        title: "Sikeres bejelentkezés",
        front_description: isSignIn
          ? "Sekeresen bejelentkeztél!"
          : "Sikeresen regisztráltál!.",
      });
      router.push("/");
    } else {
      toast({
        title: `Hibás ${isSignIn ? "bejelentkezés" : "regisztráció"}`,
        front_description: result.error ?? "Hiba történt.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 min-w-1">
      <h1 className="text-2xl font-semibold text-black">
        {isSignIn ? "Üdvözöllek újra a Kaszadellán!" : "Hozd létre a fiókodat"}
      </h1>
      <p className="text-light-500">
        {isSignIn
          ? "Férj hozzá a legjobb tippekhez"
          : "Minden mező kitöltése kötelező"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-4"
        >
          {Object.keys(defaultValues).map((key) => {
            // A "key" itt a defaultValues objektum kulcsa (pl. "email" vagy "password")
            return (
              <FormField
                key={key}
                control={form.control}
                name={key as Path<T>}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="title">
                        {/* Példa: emberi név a FIELD_NAMES alapján */}
                        {FIELD_NAMES[key as keyof typeof FIELD_NAMES] ?? key}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Írj be valamit..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}

          <Button type="submit" className="form-btn font-bold">
            {isSignIn ? "Bejelentkezés" : "Regisztráció"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "Új vagy az oldalon? " : "Már van fiókod? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Hozz létre egy fiókot" : "Bejelentkezés"}
        </Link>
      </p>
      <p className="text-center text-base font-medium">
        <Link
          href={isSignIn ? "/forgot-password" : "/forgot-password"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Elfelejtettem a jelszavamat" : ""}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
