import { useScreenContext } from "../context/ScreenContext";
import useTetrisFetch from "../hook/useFetch";
import { Method } from "../utils/method";
import Form from "./Form";
import Input from "./Input";
import Label from "./Label";

export default function FormLogin() {
  const screen = useScreenContext();
  const fetch = useTetrisFetch();

  const submit = async (data: any) => {
    screen.changeToLoading();
    const response = await fetch.get(Method.Login, data);
    console.log(response);
    await new Promise((resolve) => setTimeout(resolve, 1000 * 5));
    screen.changeToHome();
  };

  return (
    <Form
      cancel={{ text: "Back", accion: screen.changeToHome }}
      id="login"
      send="Login"
      onSubmit={submit}
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
