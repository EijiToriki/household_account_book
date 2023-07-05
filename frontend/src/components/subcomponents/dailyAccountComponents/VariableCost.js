import React from 'react'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';

import Title from '../Title'
import { useNavigate } from 'react-router-dom';

const idxMap = {
  0: 2,
  1: 3,
  2: 4,
  3: 5,
  4: 6,
  5: 7,
  6: 13,
}

export default function VariableCost({variableData, userId}) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [updateIdx, setUpdateIdx] = React.useState(0)
  const [updateDate, setUpdateDate] = React.useState('')
  const [updateMoney, setUpdateMoney] = React.useState(0)
  
  const handleOpen = (idx, date, val) => {
    setOpen(true);
    setUpdateDate(date)
    setUpdateIdx(idx)
    setUpdateMoney(val)
  }
  const handleClose = () => {
    setOpen(false);
  }
  const changeMoney = (e) => {
    setUpdateMoney(e.target.value)
  }

  const updateTable = () => {
    setOpen(false)

    const baseURL = "http://127.0.0.1:5000/variableUpdator"
    const postData = {
      'category': idxMap[updateIdx],
      'date': updateDate,
      'money': updateMoney
    }

    async function postUpdateMoney(){
      try{
        await axios.post(baseURL, {
          'id': userId,
          'postData': postData
        })
      }catch(error){
        console.log(error)
      } 
    }
    postUpdateMoney()
    navigate('/daily')
  }

  return (
    <React.Fragment>
      <Title>変動費</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Typography fontSize={20}>日付</Typography></TableCell>
            {variableData.map((data, idx) => (
              <TableCell key={idx}><Typography fontSize={20}>{data[0]}</Typography></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {variableData[0][2].map((colData, colIdx) => (
            <TableRow key={colIdx}>
              <TableCell><Typography>{colData[0]}</Typography></TableCell>
            {variableData.map((rowData, rowIdx) => (
              <TableCell key={rowIdx}>
                <Button onClick={() => handleOpen(rowIdx, colData[0], rowData[2][colIdx][1])} variant='text'>
                  <Typography>
                    {rowData[2][colIdx][1]}円
                  </Typography>
                </Button>
              </TableCell>
            ))}
            </TableRow>
          ))}         
        </TableBody>
      </Table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4}}>
          <Typography sx={{ marginBottom: 2 }}>
            更新後の金額を入力
          </Typography>
          <Grid container spacing={3} alignItems='center'>
            <Grid item md={8}>
              <TextField id="update-money" type='number' label={updateMoney} variant='outlined' onChange={changeMoney} />
            </Grid>
            <Grid item md={4}>
              <Button variant='contained' color='error' onClick={() => updateTable()}>
                更新
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  )
}
