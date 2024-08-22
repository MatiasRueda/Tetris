import "../assets/style/table.css";
import { useState } from "react";
import { useScreenContext } from "../context/ScreenContext";
import Button from "../component/Button";
import UserTable from "../component/UserTable";
import { AnimatePresence } from "framer-motion";
import Fade from "../component/Fade";
import Validate from "../component/Validate";
import { Method } from "../utils/method";

enum Scene {
  Main,
  Validate,
}

type User = {
  username: string;
  score: string;
};

type Response = {
  users: User[];
};

export default function Table() {
  const screen = useScreenContext();
  const [response, setResponse] = useState<Response>();
  const [scene, setScene] = useState<Scene>(Scene.Validate);

  const goTable = () => {
    setScene(Scene.Main);
  };
  const getResponseData = (data: any) => {
    setResponse(data);
  };

  return (
    <section className="table">
      <AnimatePresence mode="wait">
        <Fade key={scene}>
          {scene === Scene.Main && response && (
            <div className="cont-table" key={Scene.Main}>
              <UserTable data={response.users} />
              <div className="cont-table-btn">
                <Button
                  color="#009879"
                  class="table-btn"
                  click={screen.changeToHome}
                  value="Go Home"
                />
              </div>
            </div>
          )}
          {scene === Scene.Validate && (
            <Validate
              key={Scene.Validate}
              data={{
                method: Method.BestFive,
                token: "",
              }}
              clickBack={goTable}
              getData={getResponseData}
              class="cont-validate-table"
            />
          )}
        </Fade>
      </AnimatePresence>
    </section>
  );
}
