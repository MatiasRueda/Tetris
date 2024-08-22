import { useScreenContext } from "../context/ScreenContext";
import ReCAPTCHA from "react-google-recaptcha";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";

const key = import.meta.env.VITE_RECAPTCHA_KEY;

export default function FormLogin(props: {
  submitDisabled?: boolean;
  submit: (data: any) => Promise<void>;
  handleCaptcha: (token: string | null) => void;
}) {
  const screen = useScreenContext();
  return (
    <Form
      cancel={{ text: "Back", accion: screen.changeToHome }}
      id="login"
      send="Login"
      submitDisabled={props.submitDisabled}
      onSubmit={props.submit}
    >
      <Label text="Username:" htmlFor="username" />
      <Input
        nombre="username"
        type="text"
        reglas={{ required: "Please write your name" }}
        {...{ placeholder: "write your name" }}
      />
      <Label htmlFor="password" text="Password:" />
      <Input
        nombre="password"
        role="password"
        type="password"
        reglas={{ required: "Please write your password" }}
        {...{ placeholder: "write your password" }}
      />
      <ReCAPTCHA
        className="captcha"
        sitekey={key}
        onChange={props.handleCaptcha}
      />
    </Form>
  );
}
