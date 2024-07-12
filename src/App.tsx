import Screen from "./component/Screen";
import ScreenContext from "./context/ScreenContext";
export default function App() {
  return (
    <ScreenContext>
      <Screen />
    </ScreenContext>
  );
}
