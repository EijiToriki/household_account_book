import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

import Title from '../Title'

export default function VariableCost({variableData}) {
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
                <Typography>
                  {rowData[2][colIdx][1]}円
                </Typography>
              </TableCell>
            ))}
            </TableRow>
          ))}         
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
