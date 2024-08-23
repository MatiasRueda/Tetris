import { useScreenContext } from "../context/ScreenContext";
import { useUserContext } from "../context/UserContext";
import { delayUntilClosing } from "../utils/delay";
import Button from "./Button";

export default function HomeBtns() {
  const user = useUserContext();
  const screen = useScreenContext();

  const unlogin = async () => {
    screen.changeToHome();
    await delayUntilClosing();
    user.unlogin();
  };

  return (
    <div className="home-btns">
      <Button className="home-btn" value="Start" click={screen.changeToGame} />
      {user.info && (
        <Button
          className="home-btn"
          value="Table"
          click={screen.changeToTable}
        />
      )}
      {!user.info && (
        <Button
          className="home-btn"
          value="Login"
          click={screen.changeToLogin}
        />
      )}
      <Button
        className="home-btn"
        value="Config"
        click={screen.changeToConfig}
      />
      <Button
        className="home-btn"
        value="Credits and Technologies"
        click={screen.changeToCreditsAndTechnologies}
      />
      {user.info && (
        <Button className="home-btn" value="Log out" click={unlogin} />
      )}
    </div>
  );
}
