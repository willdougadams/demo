import React from 'react'

import { Box, Typography } from '@mui/material'

export const Contact: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" align='center'>
        I&apos;m looking for a full-time position in web development!
      </Typography>
      <br />
      <Typography variant='subtitle1' align='center' sx={{textDecoration: 'underline'}}>
        Contact me:
      </Typography>
      <Typography variant='subtitle2' align='center'>
        willdougadams@gmail.com <br />
        831.236.1952<br />
        linkedin.com/in/willdougadams/ <br />
      </Typography>
    </Box>
  )
}