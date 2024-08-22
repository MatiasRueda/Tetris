import { AnimatePresence } from "framer-motion";
import useTetrisFetch from "../hook/useFetch";
import FormValidate from "./FormValidate";
import { useState } from "react";
import OkMsg from "./OkMsg";
import ErrorMsg from "./ErrorMsg";
import Fade from "./Fade";
import Loading from "../screens/Loading";
import { useScreenContext } from "../context/ScreenContext";
import { Params } from "../type/type";

export default function Validate(props: {
  class: string;
  data: Params;
  clickBack?: () => void;
  getData?: (data: any) => void;
}) {
  const fetch = useTetrisFetch();
  const screen = useScreenContext();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>();

  const submit = async (_data: any) => {
    if (recaptchaToken === null) return;
    const params: Params = {
      ...props.data,
      token: recaptchaToken,
    };
    const response = await fetch.get(params);
    if (!response.success) return;
    setMessage(response.message);
    if (props.getData) props.getData(response.data);
    setRecaptchaToken(null);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <AnimatePresence mode="wait">
      <Fade key={fetch.keyState}>
        {fetch.loading && <Loading key={0} />}
        {fetch.error && (
          <ErrorMsg key={1} message={fetch.error} clickBack={fetch.reset} />
        )}
        {!fetch.loading &&
          !fetch.error &&
          (message ? (
            <OkMsg
              key={2}
              message={message}
              click={props.clickBack ? props.clickBack : screen.changeToHome}
            />
          ) : (
            <div className={props.class} key={3}>
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
