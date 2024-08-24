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

enum Scene {
  Main,
  Msg,
  Error,
  Loading,
}

export default function Validate(props: {
  className: string;
  data: Params;
  clickBack?: () => void;
  applyFunction?: () => void;
  errorFunction?: () => void;
  getData?: (data: any) => void;
}) {
  const fetch = useTetrisFetch();
  const screen = useScreenContext();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>();
  const [scene, setScene] = useState<Scene>(Scene.Main);

  const submit = async (_data: Params) => {
    setScene(Scene.Loading);
    const params: Params = {
      ...props.data,
      token: recaptchaToken!,
    };
    const response = await fetch.get(params);
    if (!response.success) {
      setScene(Scene.Error);
      return;
    }
    setMessage(response.message);
    props.getData?.(response.data);
    props.applyFunction?.();
    setRecaptchaToken(null);
    setScene(Scene.Msg);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const renderContent = () => {
    if (scene === Scene.Loading) return <Loading />;
    if (scene === Scene.Error && fetch.error) {
      return (
        <ErrorMsg
          message={fetch.error}
          clickOk={props.errorFunction}
          clickBack={props.clickBack}
        />
      );
    }
    if (scene === Scene.Msg && message) {
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
      <Fade key={scene}>{renderContent()}</Fade>
    </AnimatePresence>
  );
}
