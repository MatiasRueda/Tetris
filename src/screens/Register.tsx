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

export default function Register() {
  const fetch = useTetrisFetch<User>();
  const screen = useScreenContext();
  const [message, setMessage] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const submit = async (data: RegisterData) => {
    const params = { ...data, method: Method.Register, token: recaptchaToken! };
    const response = await fetch.get(params);
    if (!response.success) return;
    setMessage(response.message);
    setRecaptchaToken(null);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const renderContent = () => {
    if (fetch.loading) return <Loading />;
    if (fetch.error)
      return <ErrorMsg message={fetch.error} clickBack={fetch.reset} />;

    if (message) return <OkMsg message={message} click={screen.changeToHome} />;

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
        <Fade key={fetch.keyState}>{renderContent()}</Fade>
      </AnimatePresence>
    </section>
  );
}
