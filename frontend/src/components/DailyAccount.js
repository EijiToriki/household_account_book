import React from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FixedCost from './subcomponents/dailyAccountComponents/FixedCost';
import VariableCost from './subcomponents/dailyAccountComponents/VariableCost';

const baseURL = "http://127.0.0.1:5000/dailyGetter"
export default function DailyAccount() {
  const [dailyData, setDailyData] = React.useState({})
  const [isLoad, setIsLoad] = React.useState(false)

  React.useEffect(() => {
    async function fetchSummary(){
      const res = await axios.get(baseURL)
      setDailyData(res.data)
      setIsLoad(true)
    }
    fetchSummary()
  }, [])
  return (
    <>
      {isLoad ? 
        <Grid container spacing={3}>
        {/* 年度支出 */}
        <Grid item md={12}>
          <Paper sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
            <FixedCost fixedData={dailyData.fixed} />
          </Paper>
        </Grid>        
        {/* 目標との差額 */}
        <Grid item md={12}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column' }}>
            <VariableCost variableData={dailyData.variable} />
          </Paper>
        </Grid>
      </Grid> 
    :
      <h1>読み込み中。。。</h1>
    }
  </>
  )
}