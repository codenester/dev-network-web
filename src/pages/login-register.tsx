import { FC, useContext } from "react";
import LoginForm from "../components/login-register/login-form";
import RegisterForm from "../components/login-register/register-form";
import { CookieContext } from "../contexts/cookie-context";

const LoginRegisterPage: FC = () => {
  const { cookie: { isRegister } } = useContext(CookieContext)
  return isRegister ? <RegisterForm /> : <LoginForm />
}
export default LoginRegisterPage