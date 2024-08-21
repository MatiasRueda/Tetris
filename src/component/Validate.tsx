import { AnimatePresence } from "framer-motion";
import useTetrisFetch from "../hook/useFetch";
import FormValidate from "./FormValidate";
import { Method } from "../utils/method";
import { useState } from "react";
import OkMsg from "./OkMsg";
import ErrorMsg from "./ErrorMsg";
import Fade from "./Fade";
import Loading from "../screens/Loading";
import { useScreenContext } from "../context/ScreenContext";
import { Params } from "../type/type";

export default function Validate(props: { class: string; data?: Params }) {
  const fetch = useTetrisFetch();
  const screen = useScreenContext();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>();

  const submit = async (_data: any) => {
    if (recaptchaToken === null) return;
    const params = {
      ...props.data,
      method: Method.Score,
      token: recaptchaToken,
    };
    const response = await fetch.get(params);
    if (!response.success) return;
    setMessage(response.message);
    setRecaptchaToken(null);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <AnimatePresence>
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
            <div className={props.class}>
              <h1>Please verify that you are not a robot</h1>
              <FormValidate
                submit={submit}
                handleCaptcha={handleCaptcha}
                submitDisabled={recaptchaToken === null}
              />
            </div>
          ))}
      </Fade>
    </AnimatePresence>
  );
}
