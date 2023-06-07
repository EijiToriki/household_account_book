import React from 'react'
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

export default function DetailOpButton({handleAddDetails}) {
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item sx={{ p: 4 }}>
        <Button variant="outlined" size='large' sx={{ marginRight: 4, width: 150 }} onClick={() => handleAddDetails()} >明細追加</Button>
        <Button variant="contained" size='large' sx={{ marginLeft: 4, width: 150 }}>登録</Button>
      </Grid>
    </Grid>
  )
}
