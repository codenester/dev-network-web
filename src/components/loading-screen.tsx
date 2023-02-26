import { Box, Card, CardActions, CardContent, LinearProgress, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { LocalStorageContext } from "../contexts/local-storage-context";
import logoBlack from '../assets/images/logo-black.png'
import logoWhite from '../assets/images/logo-white.png'

const LoadingScreen: FC = () => {
  const { localStorage: { theme } } = useContext(LocalStorageContext)
  const logoPath = useMemo(() => theme === 'dark' ? logoWhite : logoBlack, [theme])
  return (
    <Card sx={{ background: 'transparent' }} elevation={0}>
      <CardContent>
        <Box display='flex' flexDirection='column' gap={2} alignItems='center' justifyContent='center'>
          <img src={logoPath} alt="logo" style={{ maxWidth: 60 }} />
        </Box>
      </CardContent>
      <CardActions>
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="info" />
        </Box>
      </CardActions>
    </Card>
  )
}
export default LoadingScreen