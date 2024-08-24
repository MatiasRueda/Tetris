import { AnimatePresence } from "framer-motion";
import "../assets/style/login.css";
import Fade from "../component/Fade";
import FormLogin from "../component/FormLogin";
import GoRegister from "../component/GoRegister";
import Loading from "./Loading";
import useTetrisFetch from "../hook/useFetch";
import { Fragment, useState } from "react";
import { Method } from "../utils/method";
import ErrorMsg from "../component/ErrorMsg";
import { useUserContext } from "../context/UserContext";
import { User } from "../type/type";
import { useScreenContext } from "../context/ScreenContext";
import OkMsg from "../component/OkMsg";

type LoginData = {
  username: string;
  password: string;
};

enum Scene {
  Main,
  Msg,
  Error,
  Loading,
}

export default function Login() {
  const fetch = useTetrisFetch<User>();
  const user = useUserContext();
  const screen = useScreenContext();
  const [message, setMessage] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [scene, setScene] = useState<Scene>(Scene.Main);

  const submit = async (data: LoginData) => {
    setScene(Scene.Loading);
    const params = { ...data, method: Method.Login, token: recaptchaToken! };
    const response = await fetch.get(params);
    if (!response.success) {
      setScene(Scene.Error);
      return;
    }
    user.login(response.data);
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
        <h1>Login</h1>
        <FormLogin
          submit={submit}
          handleCaptcha={handleCaptcha}
          submitDisabled={!recaptchaToken}
        />
        <GoRegister />
      </Fragment>
    );
  };

  return (
    <section className="login">
      <AnimatePresence mode="wait">
        <Fade key={scene}>{renderContent()}</Fade>
      </AnimatePresence>
    </section>
  );
}
