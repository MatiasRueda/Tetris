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

export default function Login() {
  const msgError = "An error occurred during the login process.";
  const fetch = useTetrisFetch<User>(msgError);
  const user = useUserContext();
  const screen = useScreenContext();
  const [message, setMessage] = useState<string>();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const submit = async (data: any) => {
    if (recaptchaToken === null) return;
    const params = { ...data, method: Method.Login, token: recaptchaToken };
    const response = await fetch.get(params);
    if (!response.success) return;
    user.login(response.data);
    setMessage(response.message);
    setRecaptchaToken(null);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <section className="login">
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
                <h1>Login</h1>
                <FormLogin
                  submit={submit}
                  handleCaptcha={handleCaptcha}
                  submitDisabled={!recaptchaToken}
                />
                <GoRegister />
              </Fragment>
            ))}
        </Fade>
      </AnimatePresence>
    </section>
  );
}
