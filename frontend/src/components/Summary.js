import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import YearAccount from './subcomponents/YearAccount';
import MonthAccount from './subcomponents/MonthAccount';
import MonthDetail from './subcomponents/MonthDetail';
import axios from 'axios';

const baseURL = "http://127.0.0.1:5000/summaryGetter"
export default function Summary() {
  const [summaryData, setSummaryData] = React.useState({
    'month': [0, 0],
    'year': [0, 0]
  })
  React.useEffect(() => {
    async function fetchSummary(){
      const res = await axios.get(baseURL)
      setSummaryData(res.data)
    }
    fetchSummary()
  }, [])

  console.log(summaryData.month[0])
  
  return (
    <Grid container spacing={3}>
      {/* 年度支出 */}
      <Grid item md={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <YearAccount income={summaryData.year[0]} outcome={summaryData.year[1]} />
        </Paper>
      </Grid>
      {/* 月支出 */}
      <Grid item md={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <MonthAccount income={summaryData.month[0]} outcome={summaryData.month[1]} />
        </Paper>
      </Grid>
      {/* 目標との差額 */}
      <Grid item md={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <MonthDetail />
        </Paper>
      </Grid>
    </Grid> 
  );
}