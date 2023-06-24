import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import YearChange from './subcomponents/monthlyAccountComponents/YearChange';


const now = new Date()
export default function MonthlyAccount() {
  const [isLoad, setIsLoad] = React.useState(true)
  const [year, setYear] = React.useState(now.getFullYear())

  return (
    <>
      {isLoad ? 
        <Grid container spacing={3}>
          {/* 月の変更ボタン */}
          <Grid item md={12}>
            <YearChange year={year} setYear={setYear} />
          </Grid>
          {/* 月別収支 */}
          <Grid item md={12}>
            <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
            </Paper>
          </Grid>        
        </Grid> 
      :
        <h1>読み込み中。。。</h1>
      }
    </>
  )
}
