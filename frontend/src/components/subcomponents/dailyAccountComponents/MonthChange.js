import React from 'react'
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';

export default function MonthChange({year, month}) {
  return (
    <Grid container spacing={3} alignItems='center' justifyContent='center' textAlign='center'>
      <Grid item md={4}>
        <Button 
            variant="contained" 
            size='large'  
        >
          前月へ
        </Button>
      </Grid>
      <Grid item md={4}>
        <Typography fontSize={30} fontWeight='bold'>
          {year}年{month}月
        </Typography>
      </Grid>        
      <Grid item md={4}>
        <Button 
            variant="contained" 
            size='large' 
        >
          次月へ
        </Button>
      </Grid>
    </Grid>
  )
}
