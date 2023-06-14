import React from 'react'
import Title from './Title'
import { Grid, Typography } from '@mui/material'

export default function MonthAccount({income, outcome}) {
  return (
    <>
      <Title>6月 収支</Title>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography ml={3} fontSize={20}>
            収入
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontSize={20}>
            {income}円
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1}>
        <Grid item md={6}>
          <Typography ml={3} fontSize={20}>
            支出
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontSize={20}>
            {outcome}円
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1} textAlign='center'>
        <Grid item md={12}>
          {income - outcome > 0 ?
            <Typography fontSize={24} color='green'>
              {income - outcome}円黒字
            </Typography>
            :
            <Typography fontSize={24} color='error'>
              {outcome - income}円赤字
            </Typography>
          }
        </Grid>
      </Grid>
    </>
  )
}
