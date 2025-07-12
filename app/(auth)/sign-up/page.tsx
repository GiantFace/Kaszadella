"use client";
import React from "react";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";

const Page = () => {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <motion.div
        key="signup"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>
    </div>
  );
};

export default Page;
