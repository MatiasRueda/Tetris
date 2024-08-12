import { Fragment } from "react/jsx-runtime";
import { useUserContext } from "../context/UserContext";
import User from "./User";
import LoginRegisterPanel from "./LoginRegisterPanel";

export default function UserAccessPanel() {
  const user = useUserContext();
  return (
    <Fragment>
      {user.info ? (
        <User username={user.info.username} maxScore={user.info.score} />
      ) : (
        <LoginRegisterPanel />
      )}
    </Fragment>
  );
}
