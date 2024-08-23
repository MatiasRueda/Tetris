import { useScreenContext } from "../context/ScreenContext";
import Button from "./Button";

export default function ErrorMsg(props: {
  message: string;
  clickBack: () => void;
}) {
  const screen = useScreenContext();

  return (
    <div className="cont-msg cont-error-msg">
      <p>{props.message}</p>
      <div className="cont-error-btns">
        <Button
          value="Ok"
          className="btn-error"
          click={screen.changeToHome}
          color="#ffffff"
        />
        <Button
          value="Back"
          className="btn-error"
          click={props.clickBack}
          color="#ffffff"
        />
      </div>
    </div>
  );
}
