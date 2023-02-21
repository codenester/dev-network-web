import { FC, useContext } from "react";
import LoginForm from "../components/login-register/login-form";
import RegisterForm from "../components/login-register/register-form";
import { CookieContext } from "../contexts/cookie-context";
import FloatSetting from '../components/utilities/float-setting'

const LoginRegisterPage: FC = () => {
  const { cookie: { isRegister } } = useContext(CookieContext)
  return (
    <div>
      {isRegister ? <RegisterForm /> : <LoginForm />}
      <FloatSetting />
    </div>
  )
}
export default LoginRegisterPage