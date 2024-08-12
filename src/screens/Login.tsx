import "../assets/style/login.css";
import FormLogin from "../component/FormLogin";
import GoRegister from "../component/GoRegister";

export default function Login() {
  return (
    <section className="login">
      <h1>Login</h1>
      <FormLogin />
      <GoRegister />
    </section>
  );
}
