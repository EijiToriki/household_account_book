import React from 'react'
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';

export default function YearChange({year, setYear}) {
  const handlePreYear = () => {
    setYear(prevYear => prevYear - 1)
  }

  const handleNextYear = () => {
    setYear(prevYear => prevYear + 1)
  }

  return (
    <Grid container spacing={3} alignItems='center' justifyContent='center' textAlign='center'>
      <Grid item md={4}>
        <Button 
            variant="contained" 
            size='large'  
            onClick={() => handlePreYear()}
        >
          前月へ
        </Button>
      </Grid>
      <Grid item md={4}>
        <Typography fontSize={30} fontWeight='bold'>
          {year}年 月別支出
        </Typography>
      </Grid>        
      <Grid item md={4}>
        <Button 
            variant="contained" 
            size='large' 
            onClick={() => handleNextYear()}
        >
          次月へ
        </Button>
      </Grid>
    </Grid>
  )
}
