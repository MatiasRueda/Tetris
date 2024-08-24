import { AnimatePresence } from "framer-motion";
import { Fragment } from "react/jsx-runtime";
import "../assets/style/register.css";
import ErrorMsg from "../component/ErrorMsg";
import Fade from "../component/Fade";
import FormRegister from "../component/FormRegister";
import { useScreenContext } from "../context/ScreenContext";
import useTetrisFetch from "../hook/useFetch";
import { User } from "../type/type";
import Loading from "./Loading";
import { Method } from "../utils/method";
import { useState } from "react";
import OkMsg from "../component/OkMsg";

type RegisterData = {
  username: string;
  password: string;
};

enum Scene {
  Main,
  Msg,
  Error,
  Loading,
}

export default function Register() {
  const fetch = useTetrisFetch<User>();
  const screen = useScreenContext();
  const [message, setMessage] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [scene, setScene] = useState<Scene>(Scene.Main);

  const submit = async (data: RegisterData) => {
    setScene(Scene.Loading);
    const params = { ...data, method: Method.Register, token: recaptchaToken! };
    const response = await fetch.get(params);
    if (!response.success) {
      setScene(Scene.Error);
      return;
    }
    setMessage(response.message);
    setScene(Scene.Msg);
    setRecaptchaToken(null);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const renderContent = () => {
    if (scene === Scene.Loading) return <Loading />;
    if (scene === Scene.Error && fetch.error)
      return <ErrorMsg message={fetch.error} clickBack={fetch.reset} />;

    if (scene === Scene.Msg && message)
      return <OkMsg message={message} click={screen.changeToHome} />;

    return (
      <Fragment>
        <h1>Register</h1>
        <FormRegister
          submit={submit}
          handleCaptcha={handleCaptcha}
          submitDisabled={!recaptchaToken}
        />
      </Fragment>
    );
  };

  return (
    <section className="register">
      <AnimatePresence mode="wait">
        <Fade key={scene}>{renderContent()}</Fade>
      </AnimatePresence>
    </section>
  );
}
