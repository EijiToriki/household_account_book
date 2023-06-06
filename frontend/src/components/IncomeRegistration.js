import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import Title from './subcomponents/Title'

export default function IncomeRegistration() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column'}}>
            <Title>収入登録 1</Title>
            <DatePicker label="収入発生日" sx={{ marginTop: 2}} />
            <TextField id="amount" type='number' label="収入額" sx={{ marginTop: 2}} />
            <FormControl fullWidth sx={{ marginTop: 2}}>
              <InputLabel id="category">収入カテゴリ</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="収入カテゴリ"
              >
                <MenuItem value={1}>給料(本業)</MenuItem>
                <MenuItem value={2}>賞与</MenuItem>
                <MenuItem value={3}>特別収入</MenuItem>
                <MenuItem value={4}>給料(副業)</MenuItem>
                <MenuItem value={5}>その他</MenuItem>
              </Select>
            </FormControl>
            <TextField placeholder='コメント(任意)' type='text' rows={3} multiline sx={{ marginTop: 2}} />

          </Paper>
        </Grid>

      </Grid>
    </React.Fragment>
  )
}
