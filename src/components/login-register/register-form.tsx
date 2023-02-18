import { FC, useContext } from "react";
import { CookieContext } from "../../contexts/cookie-context";

const RegisterForm: FC = () => {
  const { removeCookie } = useContext(CookieContext)
  const loginClick = () => removeCookie('isRegister')
  return (
    <div>
      <form>Register</form>
      <button onClick={loginClick}>login</button>
    </div>
  )
}
export default RegisterForm