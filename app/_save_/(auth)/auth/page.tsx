"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  SignUpContainer,
  SignInContainer,
  Form,
  Title,
  Input,
  Button,
  Anchor,
  OverlayContainer,
  Overlay,
  LeftOverlayPanel,
  RightOverlayPanel,
  Paragraph,
} from "@/components/ui/LoginStyles";

/**
 * 1) Definiáljuk a Zod sémákat és a hozzájuk tartozó TypeScript típusokat
 */
const signInSchema = z.object({
  email: z.string().email("Érvénytelen email"),
  password: z.string().min(6, "A jelszó legalább 6 karakter"),
});
type SignInData = z.infer<typeof signInSchema>;

const signUpSchema = z.object({
  fullName: z.string().min(2, "A név túl rövid"),
  email: z.string().email("Érvénytelen email"),
  password: z.string().min(6, "A jelszó legalább 6 karakter"),
});
type SignUpData = z.infer<typeof signUpSchema>;

/**
 * 2) A fő komponens, amely tartalmazza:
 *    - a Sign In űrlapot
 *    - a Sign Up űrlapot
 *    - a két overlay panelt az animációhoz
 */
const AuthPage = () => {
  // Itt tároljuk, hogy éppen melyik nézet látszódjon (true = SignIn, false = SignUp)
  const [isSignIn, setIsSignIn] = useState(true);

  // React Hook Form a bejelentkezéshez
  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // React Hook Form a regisztrációhoz
  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // A bejelentkezés form beküldése
  const handleSignInSubmit = (data: SignInData) => {
    console.log("Bejelentkezési adatok:", data);
    // Itt végezheted el a bejelentkezés logikáját (API hívás, stb.)
  };

  // A regisztráció form beküldése
  const handleSignUpSubmit = (data: SignUpData) => {
    console.log("Regisztrációs adatok:", data);
    // Itt végezheted el a regisztráció logikáját (API hívás, stb.)
  };

  return (
    <Container>
      {/* Bejelentkezés konténer */}
      <SignInContainer $signingIn={isSignIn}>
        <Form onSubmit={signInForm.handleSubmit(handleSignInSubmit)}>
          <Title>Bejelentkezés</Title>

          {/* Email mező + label */}
          <div className="input-container">
            <Input
              {...signInForm.register("email")}
              placeholder=" "
              id="emailSignIn"
            />
            <label htmlFor="emailSignIn">Email</label>
          </div>

          {/* Jelszó mező + label */}
          <div className="input-container">
            <Input
              {...signInForm.register("password")}
              type="password"
              placeholder=" "
              id="passwordSignIn"
            />
            <label htmlFor="passwordSignIn">Jelszó</label>
          </div>

          <Anchor href="#">Elfelejtetted a jelszavad? lorem10000</Anchor>
          <Button type="submit">Bejelentkezés</Button>
        </Form>
      </SignInContainer>

      {/* Regisztráció konténer */}
      <SignUpContainer $signingIn={isSignIn}>
        <Form onSubmit={signUpForm.handleSubmit(handleSignUpSubmit)}>
          <Title>Regisztráció</Title>

          {/* Név mező + label */}
          <div className="input-container">
            <Input
              {...signUpForm.register("fullName")}
              placeholder=" "
              id="fullNameSignUp"
            />
            <label htmlFor="fullNameSignUp">Név</label>
          </div>

          {/* Email mező + label */}
          <div className="input-container">
            <Input
              {...signUpForm.register("email")}
              placeholder=" "
              id="emailSignUp"
            />
            <label htmlFor="emailSignUp">Email</label>
          </div>

          {/* Jelszó mező + label */}
          <div className="input-container">
            <Input
              {...signUpForm.register("password")}
              type="password"
              placeholder=" "
              id="passwordSignUp"
            />
            <label htmlFor="passwordSignUp">Jelszó</label>
          </div>

          <Button type="submit">Regisztráció</Button>
        </Form>
      </SignUpContainer>

      {/* Overlay rész (animációkhoz) */}
      <OverlayContainer $signingIn={isSignIn}>
        <Overlay $signingIn={isSignIn}>
          {/* Bal oldali overlay panel (SignIn) */}
          <LeftOverlayPanel $signingIn={isSignIn}>
            <Title>Üdv újra itt!</Title>
            <Paragraph>Lépj be fiókodba és folytasd a fogadásokat!</Paragraph>
            <Button onClick={() => setIsSignIn(true)}>Bejelentkezés</Button>
          </LeftOverlayPanel>
          {/* Jobb oldali overlay panel (SignUp) */}
          <RightOverlayPanel $signingIn={isSignIn}>
            <Title>Helló, Barát!</Title>
            <Paragraph>Hozz létre egy fiókot és kezdjük el!</Paragraph>
            <Button onClick={() => setIsSignIn(false)}>Regisztráció</Button>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default AuthPage;
