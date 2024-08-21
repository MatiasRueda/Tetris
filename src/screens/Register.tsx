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

export default function Register() {
  const msgError = "An error occurred in the registration process.";
  const fetch = useTetrisFetch<User>(msgError);
  const screen = useScreenContext();
  const [message, setMessage] = useState<string>();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const submit = async (data: any) => {
    if (recaptchaToken === null) return;
    const response = await fetch.get(Method.Register, recaptchaToken, data);
    if (!response.success) return;
    setMessage(response.message);
    setRecaptchaToken(null);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <section className="register">
      <AnimatePresence mode="wait">
        <Fade key={fetch.keyState}>
          {fetch.loading && <Loading />}
          {fetch.error && (
            <ErrorMsg message={fetch.error} clickBack={fetch.reset} />
          )}
          {!fetch.loading &&
            !fetch.error &&
            (message ? (
              <OkMsg message={message} click={screen.changeToHome} />
            ) : (
              <Fragment>
                <h1>Register</h1>
                <FormRegister
                  submit={submit}
                  handleCaptcha={handleCaptcha}
                  submitDisabled={!recaptchaToken}
                />
              </Fragment>
            ))}
        </Fade>
      </AnimatePresence>
    </section>
  );
}
