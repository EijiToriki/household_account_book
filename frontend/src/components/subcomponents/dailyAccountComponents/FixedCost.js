import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

import Title from '../Title'

export default function FixedCost({fixedData}) {
  return (
    <React.Fragment>
      <Title>固定費</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          {fixedData.map((data, idx) => (
            <TableCell key={idx}><Typography fontSize={20}>{data[0]}</Typography></TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
          {fixedData.map((data, idx) => (
            <TableCell key={idx}><Typography fontSize={18}>{data[1]}円</Typography></TableCell>
          ))}
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
