import { useState } from 'react';
import Paper from '@mui/material/Paper';
import { DatePicker } from '@mui/x-date-pickers'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import Title from './Title'


export default function Details({formChar, detailCount, data, type}) {
  const [update, setUpdate] = useState(false)   // 再レンダリング用(select box が再レンダリングされない)

  const handleChangeDate = (date) => {
    data.registerDate = String(date.$y) + '/' + String(date.$M + 1) + '/' + String(date.$D)
  }
  const handleChangeMoney = (e) => {
    data.money = e.target.value
  }
  const handleChangeCategory = (e) => {
    data.category = e.target.value
    setUpdate(update ? false : true)
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
    {
      type === 0 ?
        <FormControl fullWidth sx={{ marginTop: 2}}>
          <InputLabel id="category">{formChar}カテゴリ</InputLabel>
          <Select
            labelId="category"
            id="category"
            label={formChar + "カテゴリ"}
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
      :
      <FormControl fullWidth sx={{ marginTop: 2}}>
        <InputLabel id="category">{formChar}カテゴリ</InputLabel>
        <Select
          labelId="category"
          id="category"
          label={formChar + "カテゴリ"}
          defaultValue={1}
          value={data.category}
          onChange={handleChangeCategory}
        >
          <MenuItem value={1}>家賃</MenuItem>
          <MenuItem value={2}>食品</MenuItem>
          <MenuItem value={3}>日用品</MenuItem>
          <MenuItem value={4}>趣味</MenuItem>
          <MenuItem value={5}>遊び</MenuItem>
          <MenuItem value={6}>自己投資</MenuItem>
          <MenuItem value={7}>交通費</MenuItem>
          <MenuItem value={8}>電気</MenuItem>
          <MenuItem value={9}>ガス</MenuItem>
          <MenuItem value={10}>水道</MenuItem>
          <MenuItem value={11}>ジム</MenuItem>
          <MenuItem value={12}>投資(NISA・株など)</MenuItem>
          <MenuItem value={13}>その他</MenuItem>
        </Select>
      </FormControl>
    }
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
