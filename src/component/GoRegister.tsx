import { useScreenContext } from "../context/ScreenContext";

export default function GoRegister() {
  const screen = useScreenContext();
  return (
    <button className="btn-go-register" onClick={screen.changeToRegister}>
      If you not have an account please click me
    </button>
  );
}
