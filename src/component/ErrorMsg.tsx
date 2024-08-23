import { useScreenContext } from "../context/ScreenContext";
import Button from "./Button";

export default function ErrorMsg(props: {
  message: string;
  clickOk?: () => void;
  clickBack?: () => void;
}) {
  const screen = useScreenContext();

  const clickOkHandler = props.clickOk ?? screen.changeToHome;
  const clickBackHandler = props.clickBack ?? screen.changeToHome;

  return (
    <div className="cont-msg cont-error-msg">
      <p>{props.message}</p>
      <div className="cont-error-btns">
        <Button
          value="Ok"
          className="btn-error"
          click={clickOkHandler}
          color="#ffffff"
        />
        <Button
          value="Back"
          className="btn-error"
          click={clickBackHandler}
          color="#ffffff"
        />
      </div>
    </div>
  );
}
