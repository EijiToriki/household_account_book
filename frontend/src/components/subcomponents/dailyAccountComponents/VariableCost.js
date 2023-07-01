import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Modal, Typography } from '@mui/material';

import Title from '../Title'

export default function VariableCost({variableData}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                <Button onClick={handleOpen} variant='text'>
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
          <Typography>
            ここに更新用情報を記載
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  )
}
