import { Card, CardActions, IconButton, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { LightMode, Language, DarkMode } from '@mui/icons-material'
import { LocalStorageContext } from "../../contexts/local-storage-context";
import { LangContext } from "../../contexts/lang-context";

const FloatSetting: FC = () => {
  const { localStorage, setItem } = useContext(LocalStorageContext)
  const { lang } = useContext(LangContext)
  const toggleTheme = () => {
    setItem('theme', localStorage.theme === 'light' ? 'dark' : 'light')
  }
  const toggleLang = () => {
    setItem('lang', localStorage.lang === 'en' ? 'kh' : 'en')
  }
  return (
    <Card elevation={1} sx={{ width: 'fit-content', borderRadius: 10, position: 'fixed', top: 20, right: 20 }}>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', p: 1, gap: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={toggleTheme}>
            {localStorage.theme === 'light' ? <LightMode /> : <DarkMode />}
          </IconButton>
          <Typography variant="body2" sx={{ cursor: 'default', textTransform: 'capitalize' }}>{lang?.[localStorage.theme][localStorage.lang]}</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={toggleLang}>
            <Language />
          </IconButton>
          <Typography variant="body2" sx={{ cursor: 'default', mr: 1, textTransform: 'capitalize' }}>{lang?.[localStorage.lang][localStorage.lang]}</Typography>
        </div>
      </CardActions>
    </Card>
  )
}
export default FloatSetting