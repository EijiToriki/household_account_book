import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Orders from './subcomponents/Orders';
import YearAccount from './subcomponents/YearAccount';
import MonthAccount from './subcomponents/MonthAccount';

export default function Summary() {
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item md={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <YearAccount />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item md={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <MonthAccount />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item md={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid> 
  );
}