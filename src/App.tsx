import Screen from "./component/Screen";
import ConfigContext from "./context/ConfigContext";
import ScreenContext from "./context/ScreenContext";
import UserContext from "./context/UserContext";
export default function App() {
  return (
    <ScreenContext>
      <UserContext>
        <ConfigContext>
          <Screen />
        </ConfigContext>
      </UserContext>
    </ScreenContext>
  );
}
