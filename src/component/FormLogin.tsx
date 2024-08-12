import { useScreenContext } from "../context/ScreenContext";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";

export default function FormLogin() {
  const screen = useScreenContext();

  const submit = (data: any) => {
    console.log(data);
  };
  return (
    <Form
      cancel={{ text: "Back", accion: screen.changeToHome }}
      id="login"
      send="Login"
      onSubmit={submit}
    >
      <Label text="Name:" htmlFor="name" />
      <Input
        nombre="name"
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
