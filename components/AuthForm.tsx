import React from "react";
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
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Path,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props<T extends FieldValues> {
  schema: any;
  defaultValues: DefaultValues<T>;
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
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Container>
      <SignInContainer $signingIn={isSignIn}>
        <Form onSubmit={form.handleSubmit(handleSubmit)}>
          <Title>Bejelentkezés</Title>
          <Input {...form.register("email" as Path<T>)} placeholder="Email" />
          <Input
            {...form.register("password" as Path<T>)}
            type="password"
            placeholder="Jelszó"
          />
          <Anchor href="#">Elfelejtetted a jelszavad?</Anchor>
          <Button type="submit">Bejelentkezés</Button>
        </Form>
      </SignInContainer>

      <SignUpContainer $signingIn={isSignIn}>
        <Form onSubmit={form.handleSubmit(handleSubmit)}>
          <Title>Regisztráció</Title>
          <Input {...form.register("fullName" as Path<T>)} placeholder="Név" />
          <Input {...form.register("email" as Path<T>)} placeholder="Email" />
          <Input
            {...form.register("password" as Path<T>)}
            type="password"
            placeholder="Jelszó"
          />
          <Button type="submit">Regisztráció</Button>
        </Form>
      </SignUpContainer>

      <OverlayContainer $signingIn={isSignIn}>
        <Overlay $signingIn={isSignIn}>
          <LeftOverlayPanel $signingIn={isSignIn}>
            <Title>Üdv újra itt!</Title>
            <Paragraph>Lépj be fiókodba és folytasd a fogadásokat!</Paragraph>
            <Button onClick={() => form.reset()}>Bejelentkezés</Button>
          </LeftOverlayPanel>
          <RightOverlayPanel $signingIn={isSignIn}>
            <Title>Helló, Barát!</Title>
            <Paragraph>Hozz létre egy fiókot és kezdjük el!</Paragraph>
            <Button onClick={() => form.reset()}>Regisztráció</Button>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default AuthForm;
