import React from 'react'
import Title from './Title'
import { Grid, Typography } from '@mui/material'

export default function YearAccount() {
  return (
    <>
      <Title>2023年 収支</Title>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Typography ml={3} fontSize={20}>
            収入
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography fontSize={20}>
            1000000円
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
            1200000円
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1} textAlign='center'>
        <Grid item md={12}>
          {100000 - 120000 > 0 ?
            <Typography fontSize={24} color='green'>
              200000円黒字
            </Typography>
            :
            <Typography fontSize={24} color='error'>
              200000円赤字
            </Typography>
          }
        </Grid>
      </Grid>
    </>
  )
}
