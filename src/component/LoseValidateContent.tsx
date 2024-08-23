import { useUserContext } from "../context/UserContext";
import { Method } from "../utils/method";
import Validate from "./Validate";

export default function LoseValidateContent(props: {
  score: string;
  updateAndGoHome: () => Promise<void>;
  goHomeAndResetGame: () => Promise<void>;
  goLose: () => void;
}) {
  const user = useUserContext();

  return (
    <Validate
      data={{
        username: user.info!.username,
        score: "",
        method: Method.Score,
        token: "",
      }}
      applyFunction={props.updateAndGoHome}
      errorFunction={props.goHomeAndResetGame}
      clickBack={props.goLose}
      className="cont-validate-lose"
    />
  );
}
