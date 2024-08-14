import { AnimatePresence } from "framer-motion";
import "../assets/style/login.css";
import Fade from "../component/Fade";
import FormLogin from "../component/FormLogin";
import GoRegister from "../component/GoRegister";
import Loading from "./Loading";
import useTetrisFetch from "../hook/useFetch";
import { Fragment } from "react";
import { Method } from "../utils/method";
import ErrorMsg from "../component/ErrorMsg";
import { useUserContext } from "../context/UserContext";
import { User } from "../type/type";
import { useScreenContext } from "../context/ScreenContext";

// const example = {
//   message: "Login successfully",
//   score: "0",
//   success: true,
//   username: "Matias",
// };

export default function Login() {
  const msgError = "An error occurred in the login";
  const fetch = useTetrisFetch<User>(msgError);
  const user = useUserContext();
  const screen = useScreenContext();

  const submit = async (data: any) => {
    const response = await fetch.get(Method.Login, data);
    if (!response.success) return;
    user.login(response.data);
    screen.changeToHome();
  };

  return (
    <section className="login">
      <AnimatePresence mode="wait">
        <Fade key={fetch.keyState}>
          {fetch.loading && <Loading />}
          {fetch.error && <ErrorMsg message={fetch.error} />}
          {!fetch.loading && !fetch.error && (
            <Fragment>
              <h1>Login</h1>
              <FormLogin submit={submit} />
              <GoRegister />
            </Fragment>
          )}
        </Fade>
      </AnimatePresence>
    </section>
  );
}
