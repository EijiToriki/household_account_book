import React from 'react'
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';

export default function MonthChange({year, month, setYear, setMonth}) {
  const handlePreMonth = () => {
    let updateMonth = month - 1
    if(updateMonth === 0){
      setMonth(12)
      setYear(prevYear => prevYear - 1)

    }else{
      setMonth(updateMonth)
    }
  }

  const handleNextMonth = () => {
    let updateMonth = month + 1
    if(updateMonth === 13){
      setMonth(1)
      setYear(prevYear => prevYear + 1)
    }else{
      setMonth(updateMonth)
    }
  }

  return (
    <Grid container spacing={3} alignItems='center' justifyContent='center' textAlign='center'>
      <Grid item md={4}>
        <Button 
            variant="contained" 
            size='large'  
            onClick={() => handlePreMonth()}
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
            onClick={() => handleNextMonth()}
        >
          次月へ
        </Button>
      </Grid>
    </Grid>
  )
}
