import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import Title from './Title'

export default function Details({formChar, detailCount, data}) {
  const handleChangeDate = (date) => {
    data.registerDate = String(date.$y) + '/' + String(date.$M + 1) + '/' + String(date.$D)
  }
  const handleChangeMoney = (e) => {
    data.money = e.target.value
  }
  const handleChangeCategory = (e) => {
    data.category = e.target.value
  }
  const handleChangeComment = (e) => {
    data.comment = e.target.value
  }

  return (
    <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column'}}>
    <Title>{formChar + "登録" + String(detailCount)}</Title>
    {/* 日付フォーム */}
    <DatePicker label={formChar + "発生日"} sx={{ marginTop: 2}} onChange={handleChangeDate} />
    {/* 金額 */}
    <TextField 
      id="amount" 
      type='number' 
      label={formChar + "額"} 
      sx={{ marginTop: 2}} 
      onChange={handleChangeMoney}
    />
    {/* カテゴリ */}
    <FormControl fullWidth sx={{ marginTop: 2}}>
      <InputLabel id="category">{formChar}カテゴリ</InputLabel>
      <Select
        labelId="category"
        id="category"
        label="収入カテゴリ"
        defaultValue={1}
        value={data.category}
        onChange={handleChangeCategory}
      >
        <MenuItem value={1}>給料(本業)</MenuItem>
        <MenuItem value={2}>賞与</MenuItem>
        <MenuItem value={3}>特別収入</MenuItem>
        <MenuItem value={4}>給料(副業)</MenuItem>
        <MenuItem value={5}>その他</MenuItem>
      </Select>
    </FormControl>
    {/* コメント */}
    <TextField 
      placeholder='コメント(任意)' 
      type='text' 
      rows={3} 
      multiline sx={{ marginTop: 2}} 
      onChange={handleChangeComment} />
  </Paper>
  )
}
