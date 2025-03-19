"use client";
import { sendMail } from "@/lib/sendMail";
import { NextRequest, NextResponse } from "next/server";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
      nickname: "",
    }}
    onSubmit={signUp}
  />
);

export default Page;
