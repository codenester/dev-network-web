import { FC, useContext, useEffect, useRef } from "react";
import { useLogin } from "../../api/hook";
import { CookieContext } from "../../contexts/cookie-context";
import { FormikErrors, useFormik } from "formik";
import { TLoginInput } from "../../api/post-method";
import { Card, CardContent, CardHeader, FormControl, FormHelperText, Input, InputLabel, Link, OutlinedInput, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
type TLoginResponse = {
  token: string,
  refreshToken: string,
  thirdPartyToken?: string,
  deviceId: string
}
const initialValues: TLoginInput = {
  username: '',
  password: ''
}
const LoginForm: FC = () => {
  const { setCookie } = useContext(CookieContext)
  const registerClick = () => setCookie({ name: 'isRegister', value: true })
  const usernameRef = useRef<HTMLInputElement>(null)
  const { handleSubmit, values: { username, password }, errors, handleChange } = useFormik({ initialValues, onSubmit, validate })
  const { isLoading, isError, error, mutate } = useLogin({
    onSuccess: async (data: Response) => {
      const jsonData = await data.json()
      const result: TLoginResponse = {
        token: jsonData[import.meta.env.VITE_COOKIE_ACCESS_TOKEN],
        refreshToken: jsonData[import.meta.env.VITE_COOKIE_REFRESH_TOKEN],
        deviceId: jsonData[import.meta.env.VITE_COOKIE_DEVICE_ID],
        thirdPartyToken: jsonData[import.meta.env.VITE_THIRD_PARTY_TOKEN]
      }
      setCookie({ name: 'token', value: result.token, expire: 1 })
      setCookie({ name: 'deviceId', value: result.deviceId, expire: 15 })
      setCookie({ name: 'refreshToken', value: result.refreshToken, expire: 15 })
      setCookie({ name: 'thirdPartyToken', value: result.thirdPartyToken, expire: 1 })
    }
  })
  function onSubmit(values: TLoginInput) {
    console.log(values)
    mutate(values)
  }
  function validate(values: TLoginInput) {
    const error: FormikErrors<TLoginInput> = {}
    if (!values.username) error.username = 'Required'
    if (!values.password) error.password = 'Required'
    return error
  }
  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus()
  }, [])
  return (
    <Card elevation={1} sx={{ background: 'transparent', pt: 2, pb: 2, pl: 4, pr: 4, borderRadius: 2 }} raised>
      <CardHeader title="Welcome" titleTypographyProps={{ fontSize: '2rem', color: '#ddd', textTransform: 'uppercase' }} sx={{ textAlign: 'center', mb: 3 }} />
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormControl>
            <TextField required autoFocus inputRef={usernameRef} color="success" error={!!errors.username} variant="outlined" label="Username" size="small" disabled={isLoading} id="username" name="username" onChange={handleChange} value={username} ref={usernameRef} />
            <FormHelperText error={!!errors.username}>{errors.username ?? ""}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField required color="success" error={!!errors.password} variant="outlined" label="Password" size="small" disabled={isLoading} id="password" name="password" onChange={handleChange} value={password} type="password" />
            <FormHelperText error={!!errors.password}>{errors.password ?? ""}</FormHelperText>
          </FormControl>
          <Link href="#" variant="body2" onClick={_ => { }}>Forgot password?</Link>
          <LoadingButton loading={isLoading} loadingPosition="center" sx={{ mt: 1, borderRadius: 5 }} variant="contained" color="success" type="submit">Login</LoadingButton>
        </form>
      </CardContent>
    </Card>
  )
}
export default LoginForm