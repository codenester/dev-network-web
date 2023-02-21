import { FC, ReactNode, Reducer, useContext, useEffect, useReducer, useRef } from "react";
import { useLogin } from "../../api/hook";
import { CookieContext } from "../../contexts/cookie-context";
import { FormikErrors, useFormik } from "formik";
import { TLoginInput } from "../../api/post-method";
import { Box, Card, CardActions, CardContent, CardHeader, Divider, FormControl, FormHelperText, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Google, GitHub, FacebookTwoTone, Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { LangContext } from "../../contexts/lang-context";
import { LocalStorageContext } from "../../contexts/local-storage-context";
type TPasswordBox = {
  type: 'password' | 'text',
  Icon: ReactNode
}
type TPasswordAction = { type: 'password' | 'text' }
const PasswordReducer: Reducer<TPasswordBox, TPasswordAction> = (_, action) => {
  if (action.type === 'password') return { type: 'password', Icon: <Visibility fontSize="small" /> }
  return { type: 'text', Icon: <VisibilityOff fontSize="small" /> }
}
const initialPasswordState: TPasswordBox = {
  type: 'password',
  Icon: <Visibility fontSize="small" />
}
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
  const [passwordState, dispatch] = useReducer(PasswordReducer, initialPasswordState)
  const usernameRef = useRef<HTMLInputElement>(null)
  const { lang } = useContext(LangContext)
  const { localStorage: { lang: langCode } } = useContext(LocalStorageContext)
  const { handleSubmit, values: { username, password }, errors, handleChange } = useFormik({ initialValues, onSubmit, validate })
  const togglePassword = () => {
    dispatch({ type: passwordState.type === 'password' ? 'text' : 'password' })
  }
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
    <Card elevation={0} sx={{ background: 'transparent', pt: 2, pb: 2, pl: 4, pr: 4, borderRadius: 2 }} >
      <CardHeader title={lang?.welcome[langCode]} titleTypographyProps={{ fontSize: '2rem', textTransform: 'uppercase' }} sx={{ textAlign: 'center', mb: 3 }} />
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormControl>
            <TextField InputProps={{
              startAdornment: <InputAdornment position="start">
                <Person fontSize="small" />
              </InputAdornment>
            }} required autoFocus inputRef={usernameRef} color="success" error={!!errors.username} variant="outlined" label={lang?.username[langCode]} size="small" disabled={isLoading} id="username" name="username" onChange={handleChange} value={username} ref={usernameRef} />
            <FormHelperText error={!!errors.username}>{errors.username ?? ""}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField InputProps={{
              startAdornment: <InputAdornment position="start">
                <Lock fontSize="small" />
              </InputAdornment>,
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={togglePassword} size="small">
                  {passwordState.Icon}
                </IconButton>
              </InputAdornment>
            }} required color="success" error={!!errors.password} variant="outlined" label={lang?.password[langCode]} size="small" disabled={isLoading} id="password" name="password" onChange={handleChange} value={password} type={passwordState.type} />
            <FormHelperText error={!!errors.password}>{errors.password ?? ""}</FormHelperText>
          </FormControl>
          <Link href="#" variant="body2" onClick={_ => { }}>{lang?.["forgot-password"][langCode]}?</Link>
          <LoadingButton loading={isLoading} loadingPosition="center" sx={{ mt: 1 }} variant="outlined" color="success" type="submit">{lang?.login[langCode]}</LoadingButton>
        </form>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Typography>{lang?.["no-account"][langCode]}?</Typography><Link href="#" onClick={registerClick}>{lang?.register[langCode]}</Link>
        </Box>
        <Divider variant="fullWidth" sx={{ width: '100%', mt: 5 }} light >or</Divider>
        <Stack direction='row'>
          <IconButton>
            <Google />
          </IconButton>
          <IconButton>
            <FacebookTwoTone />
          </IconButton>
          <IconButton>
            <GitHub />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  )
}
export default LoginForm