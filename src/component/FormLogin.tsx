import { useScreenContext } from "../context/ScreenContext";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";

export default function FormLogin(props: {
  submit: (data: any) => Promise<void>;
}) {
  const screen = useScreenContext();

  return (
    <Form
      cancel={{ text: "Back", accion: screen.changeToHome }}
      id="login"
      send="Login"
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
    </Form>
  );
}
