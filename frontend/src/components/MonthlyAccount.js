import React from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import YearChange from './subcomponents/monthlyAccountComponents/YearChange';
import AccountTable from './subcomponents/monthlyAccountComponents/AccountTable';

const baseURL = "http://127.0.0.1:5000/monthlyGetter"
const now = new Date()
export default function MonthlyAccount() {
  const [isLoad, setIsLoad] = React.useState(false)
  const [monthlyData, setMonthlyData] = React.useState({})
  const [year, setYear] = React.useState(now.getFullYear())

  React.useEffect(() => {
    async function fetchMonthly(){
      try{
        const res = await axios.post(baseURL, {
          y : year
        })
        setMonthlyData(res.data)
        setIsLoad(true)  
      }catch(error){
        console.log(error)
      } 
    }
    fetchMonthly()
  }, [year])

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
              <AccountTable year={2023} monthlyData={monthlyData} />
            </Paper>
          </Grid>        
        </Grid> 
      :
        <h1>読み込み中。。。</h1>
      }
    </>
  )
}
