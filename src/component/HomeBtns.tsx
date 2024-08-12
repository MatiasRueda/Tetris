import { useScreenContext } from "../context/ScreenContext";
import { useUserContext } from "../context/UserContext";
import Button from "./Button";

export default function HomeBtns() {
  const user = useUserContext();
  const screen = useScreenContext();

  return (
    <div className="home-btns">
      <Button
        class="home-btn common-btn"
        value="Start game"
        click={screen.changeToGame}
      />

      {user.info ? (
        <Button
          class="home-btn common-btn"
          value="Table"
          click={screen.changeToTable}
        />
      ) : (
        <Button
          class="home-btn common-btn"
          value="Login"
          click={screen.changeToLogin}
        />
      )}

      <Button
        class="home-btn common-btn"
        value="Config"
        click={screen.changeToConfig}
      />

      <Button
        class="home-btn common-btn"
        value="Credits"
        click={screen.changeToCredits}
      />
    </div>
  );
}
