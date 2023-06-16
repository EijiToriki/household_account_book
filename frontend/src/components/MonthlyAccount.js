import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FixedCost from './subcomponents/monthlyAccountComponents/FixedCost';
import VariableCost from './subcomponents/monthlyAccountComponents/VariableCost';


export default function MonthlyAccount() {
  return (
    <Grid container spacing={3}>
    {/* 年度支出 */}
    <Grid item md={12}>
      <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
        <FixedCost />
      </Paper>
    </Grid>        
    {/* 目標との差額 */}
    <Grid item md={12}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
        <VariableCost />
      </Paper>
    </Grid>
  </Grid> 
  )
}
