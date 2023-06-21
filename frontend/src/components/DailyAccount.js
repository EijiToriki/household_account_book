import React from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MonthChange from './subcomponents/dailyAccountComponents/MonthChange';
import FixedCost from './subcomponents/dailyAccountComponents/FixedCost';
import VariableCost from './subcomponents/dailyAccountComponents/VariableCost';

const baseURL = "http://127.0.0.1:5000/dailyGetter"
const now = new Date()
export default function DailyAccount() {
  const [dailyData, setDailyData] = React.useState({})
  const [isLoad, setIsLoad] = React.useState(false)
  const [year, setYear] = React.useState(now.getFullYear())
  const [month, setMonth] = React.useState(now.getMonth()+1)

  React.useEffect(() => {
    async function fetchSummary(){
      try{
        const res = await axios.post(baseURL, {
          m : month,
          y : year
        })
        setDailyData(res.data)
        setIsLoad(true)  
      }catch(error){
        console.log(error)
      } 
    }
    fetchSummary()
  }, [month])
  return (
    <>
      {isLoad ? 
        <Grid container spacing={3}>
          {/* 月の変更ボタン */}
          <Grid item md={12}>
            <MonthChange year={year} month={month} setYear={setYear} setMonth={setMonth} />
          </Grid>
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