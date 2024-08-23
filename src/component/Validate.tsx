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
  className: string;
  data: Params;
  clickBack?: () => void;
  applyfunction?: () => void;
  getData?: (data: any) => void;
}) {
  const fetch = useTetrisFetch();
  const screen = useScreenContext();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>();

  const submit = async (_data: Params) => {
    const params: Params = {
      ...props.data,
      token: recaptchaToken!,
    };
    const response = await fetch.get(params);
    if (!response.success) return;
    setMessage(response.message);
    props.getData?.(response.data);
    props.applyfunction?.();
    setRecaptchaToken(null);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const renderContent = () => {
    if (fetch.loading) return <Loading />;
    if (fetch.error)
      return <ErrorMsg message={fetch.error} clickBack={fetch.reset} />;
    if (message) {
      const clickHandler = props.clickBack ?? screen.changeToHome;
      return <OkMsg message={message} click={clickHandler} />;
    }
    return (
      <div className={props.className}>
        <h1>Please verify that you are not a robot</h1>
        <FormValidate
          submit={submit}
          handleCaptcha={handleCaptcha}
          submitDisabled={recaptchaToken === null}
        />
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <Fade key={fetch.keyState}>{renderContent()}</Fade>
    </AnimatePresence>
  );
}
