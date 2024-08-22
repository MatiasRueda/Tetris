import { useScreenContext } from "../context/ScreenContext";
import { useUserContext } from "../context/UserContext";
import Button from "./Button";

export default function HomeBtns() {
  const user = useUserContext();
  const screen = useScreenContext();

  const unlogin = async () => {
    screen.changeToHome();
    await new Promise((resolve) => setTimeout(resolve, 1100));
    user.unlogin();
  };

  return (
    <div className="home-btns">
      <Button class="home-btn" value="Start" click={screen.changeToGame} />
      {user.info && (
        <Button class="home-btn" value="Table" click={screen.changeToTable} />
      )}
      {!user.info && (
        <Button class="home-btn" value="Login" click={screen.changeToLogin} />
      )}
      <Button class="home-btn" value="Config" click={screen.changeToConfig} />
      <Button
        class="home-btn"
        value="Credits and Technologies"
        click={screen.changeToCreditsAndTechnologies}
      />
      {user.info && <Button class="home-btn" value="Log out" click={unlogin} />}
    </div>
  );
}
