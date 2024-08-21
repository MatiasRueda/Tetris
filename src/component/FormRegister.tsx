import ReCAPTCHA from "react-google-recaptcha";
import { useScreenContext } from "../context/ScreenContext";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";

const key = import.meta.env.VITE_RECAPTCHA_KEY;

function FormRegister(props: {
  submit: (data: any) => Promise<void>;
  submitDisabled?: boolean;
  handleCaptcha: (token: string | null) => void;
}): JSX.Element {
  const screen = useScreenContext();

  return (
    <Form
      id="register"
      send="Register"
      onSubmit={props.submit}
      submitDisabled={props.submitDisabled}
      cancel={{ text: "Back", accion: screen.changeToHome }}
    >
      <Label htmlFor="username" text="Username:" />
      <Input
        nombre="username"
        type="text"
        reglas={{
          required: "Please write your name",
          maxLength: { value: 8, message: "Maximum 8 characters" },
        }}
        {...{ placeholder: "write your name" }}
      />
      <Label htmlFor="password" text="Password:" />
      <Input
        nombre="password"
        role="password"
        type="password"
        reglas={{
          required: "Please write your password",
          maxLength: { value: 10, message: "Maximum 8 characters" },
          minLength: { value: 3, message: "Minimum 3 characters" },
        }}
        {...{ placeholder: "write your password" }}
      />
      <Label htmlFor="confirmPassword" text="Confirm password:" />
      <Input
        nombre="confirmPassword"
        role="password"
        type="password"
        reglas={{ required: "Rewrite your password please" }}
        inputIgual="password"
        {...{ placeholder: "rewrite your password" }}
      />
      <ReCAPTCHA
        className="captcha"
        sitekey={key}
        onChange={props.handleCaptcha}
      />
    </Form>
  );
}

export default FormRegister;
