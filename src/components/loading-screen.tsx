import { Box, Card, CardActions, CardContent, LinearProgress, Typography } from "@mui/material";
import { FC } from "react";

const LoadingScreen: FC = () => {
  return (
    <Card sx={{ background: 'transparent' }} elevation={0}>
      <CardContent>
        <Typography variant="body1">Loading ...</Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="success" />
        </Box>
      </CardActions>
    </Card>
  )
}
export default LoadingScreen