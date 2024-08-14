import { useScreenContext } from "../context/ScreenContext";
import Button from "./Button";

export default function ErrorMsg(props: { message: string }) {
  const screen = useScreenContext();

  return (
    <div className="cont-msg cont-error-msg">
      <p>{props.message}</p>
      <Button value="Back" class="btn-error" click={screen.changeToHome} />
    </div>
  );
}
