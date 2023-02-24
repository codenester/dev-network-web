import { FC, ReactNode, Reducer, useContext, useMemo, useReducer } from "react";
import { useLogin } from "../../api/hook";
import { CookieContext } from "../../contexts/cookie-context";
import { FormikErrors, useFormik } from "formik";
import { TLoginInput } from "../../api/post-method";
import { Box, Card, CardActions, CardContent, CardHeader, Divider, FormControl, FormHelperText, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Google, GitHub, FacebookTwoTone, Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { LangContext } from "../../contexts/lang-context";
import { LocalStorageContext } from "../../contexts/local-storage-context";
import { TLoginResponse } from "../../utilities/types";
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
const initialValues: TLoginInput = {
  username: '',
  password: ''
}
const LoginForm: FC = () => {
  const { setCookie } = useContext(CookieContext)
  const registerClick = () => setCookie({ name: 'isRegister', value: true })
  const [passwordState, dispatch] = useReducer(PasswordReducer, initialPasswordState)
  const { lang } = useContext(LangContext)
  const { localStorage: { lang: langCode, theme } } = useContext(LocalStorageContext)
  const { handleSubmit, values: { username, password }, errors, handleChange } = useFormik({ initialValues, onSubmit, validate })
  const togglePassword = () => {
    dispatch({ type: passwordState.type === 'password' ? 'text' : 'password' })
  }
  const onSuccess = (d: TLoginResponse) => {
    setCookie({ name: 'token', value: d.token, expire: 1 })
    setCookie({ name: 'deviceId', value: d.deviceId, expire: 15 })
    setCookie({ name: 'refreshToken', value: d.refreshToken, expire: 15 })
    setCookie({ name: 'thirdPartyToken', value: d.thirdPartyToken, expire: 1 })
  }
  const { isLoading, mutate } = useLogin({ onSuccess })
  const { isLoading: fbLoading, mutate: fbMutate } = useLogin({ onSuccess }, 'facebook')
  const { isLoading: gLoading, mutate: gMutate } = useLogin({ onSuccess }, 'google')
  const { isLoading: ghLoading, mutate: ghMutate } = useLogin({ onSuccess }, 'github')
  const logoPath = useMemo(() => `/src/assets/images/logo-${theme === 'dark' ? 'white' : 'black'}.png`, [theme])
  const loading = useMemo(() => isLoading || fbLoading || gLoading || ghLoading, [isLoading, fbLoading, gLoading, ghLoading])
  function onSubmit(values: TLoginInput) {
    mutate(values)
  }
  function validate(values: TLoginInput) {
    const error: FormikErrors<TLoginInput> = {}
    if (!values.username) error.username = 'Required'
    if (!values.password) error.password = 'Required'
    return error
  }
  return (
    <Card elevation={0} sx={{ background: 'transparent', pt: 2, pb: 2, pl: 4, pr: 4, borderRadius: 2 }} >
      <CardHeader sx={{ minHeight: 100, mb: 3 }} title={
        <Box display='flex' gap={2} alignItems='center' justifyContent='center' flexDirection='column'>
          <img src={logoPath} alt="logo" style={{ maxHeight: 80, filter: 'invert(10%)' }} />
          <Typography variant="body1" textTransform='uppercase' fontFamily='montserrat, moul, roboto, Arial !important'>{lang?.["app-name"][langCode]}</Typography>
        </Box>
      } />
      <CardContent>
        <form autoComplete="off" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormControl>
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Person fontSize="small" />
                </InputAdornment>
              }}
              required
              autoFocus
              color="success"
              error={!!errors.username}
              variant="outlined"
              label={lang?.username[langCode]}
              size="small"
              disabled={loading}
              id="username"
              name="username"
              onChange={handleChange}
              value={username} />
            <FormHelperText error={!!errors.username}>{errors.username ?? ""}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>,
                endAdornment: <InputAdornment position="end">
                  <IconButton onClick={togglePassword} size="small">
                    {passwordState.Icon}
                  </IconButton>
                </InputAdornment>
              }}
              required
              color="success"
              error={!!errors.password}
              variant="outlined"
              label={lang?.password[langCode]}
              size="small"
              disabled={loading}
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
              type={passwordState.type} />
            <FormHelperText error={!!errors.password}>{errors.password ?? ""}</FormHelperText>
          </FormControl>
          <Link href="#" variant="body2" onClick={_ => { }}>{lang?.["forgot-password"][langCode]}?</Link>
          <LoadingButton loading={loading} loadingPosition="center" sx={{ mt: 1 }} variant="outlined" color="success" type="submit">{lang?.login[langCode]}</LoadingButton>
        </form>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Typography>{lang?.["no-account"][langCode]}?</Typography><Link href="#" onClick={registerClick}>{lang?.register[langCode]}</Link>
        </Box>
        <Divider variant="fullWidth" sx={{ width: '100%', mt: 5 }} light >or</Divider>
        <Stack direction='row'>
          <IconButton onClick={() => gMutate(undefined)}>
            <Google />
          </IconButton>
          <IconButton onClick={() => fbMutate(undefined)}>
            <FacebookTwoTone />
          </IconButton>
          <IconButton onClick={() => ghMutate(undefined)}>
            <GitHub />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  )
}
export default LoginForm