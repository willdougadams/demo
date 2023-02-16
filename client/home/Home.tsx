import { Typography } from '@mui/material'
import React from 'react'
import { HelixAnimation } from './HelixAnimation';

export const Home: React.FC = () => {
  return <div style={{height: 'inherit', width: 'inherit', alignItems: 'center'}}>
    <Typography>This is my page</Typography>
    <HelixAnimation />
  </div>
}