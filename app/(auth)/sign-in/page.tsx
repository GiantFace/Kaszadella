"use client";

import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema, signUpSchema } from "@/lib/validations";
import { signInWithCredentials, signUp } from "@/lib/actions/auth";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState<"SIGN_IN" | "SIGN_UP">(
    "SIGN_IN",
  );

  const toggleForm = () =>
    setActiveForm((prev) => (prev === "SIGN_IN" ? "SIGN_UP" : "SIGN_IN"));

  return (
    <div className="max-w-lg mx-auto mt-10">
      <AnimatePresence mode="wait">
        {activeForm === "SIGN_IN" ? (
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <AuthForm
              type="SIGN_IN"
              schema={signInSchema}
              defaultValues={{ email: "", password: "" }}
              onSubmit={signInWithCredentials}
            />
          </motion.div>
        ) : (
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
