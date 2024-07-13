import Screen from "./component/Screen";
import ConfigContext from "./context/ConfigContext";
import ScreenContext from "./context/ScreenContext";
export default function App() {
  return (
    <ScreenContext>
      <ConfigContext>
        <Screen />
      </ConfigContext>
    </ScreenContext>
  );
}
