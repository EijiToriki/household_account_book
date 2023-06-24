import React from 'react'
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

export default function DetailOpButton({handleAddDetails, handleRegisterDetails, handleRemoveDetails}) {
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item sx={{ p: 4 }}>
        <Button 
          variant="outlined" 
          size='large' 
          sx={{ marginRight: 4, width: 150 }} 
          onClick={() => handleAddDetails()} 
        >
          明細追加
        </Button>
        <Button 
          variant="contained" 
          size='large' 
          sx={{ marginLeft: 4, marginRight: 4, width: 150 }}
          onClick={() => handleRegisterDetails()}
        >
          登録
        </Button>
        <Button 
          variant="outlined" 
          size='large' 
          color='error' 
          sx={{ marginLeft: 4, width: 150 }} 
          onClick={() => handleRemoveDetails()}
        >
          削除
        </Button>
      </Grid>
    </Grid>
  )
}
