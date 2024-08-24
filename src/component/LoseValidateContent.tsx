import { useUserContext } from "../context/UserContext";
import { Method } from "../utils/method";
import Validate from "./Validate";

export default function LoseValidateContent(props: {
  score: string;
  updateGoHomeAndResetGame: () => Promise<void>;
  goLose: () => void;
}) {
  const user = useUserContext();

  return (
    <Validate
      data={{
        username: user.info!.username,
        score: props.score,
        method: Method.Score,
        token: "",
      }}
      applyFunction={props.updateGoHomeAndResetGame}
      errorFunction={props.updateGoHomeAndResetGame}
      clickBack={props.goLose}
      className="cont-validate-lose"
    />
  );
}
