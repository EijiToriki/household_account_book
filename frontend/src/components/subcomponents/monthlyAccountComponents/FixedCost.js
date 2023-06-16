import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

import Title from '../Title'

export default function FixedCost() {
  return (
    <React.Fragment>
      <Title>固定費</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Typography fontSize={20}>家賃</Typography></TableCell>
            <TableCell><Typography fontSize={20}>電気</Typography></TableCell>
            <TableCell><Typography fontSize={20}>ガス</Typography></TableCell>
            <TableCell><Typography fontSize={20}>水道</Typography></TableCell>
            <TableCell><Typography fontSize={20}>通信</Typography></TableCell>
            <TableCell><Typography fontSize={20}>ジム</Typography></TableCell>
            <TableCell><Typography fontSize={20}>投資</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell><Typography>aaa</Typography></TableCell>
            <TableCell><Typography>bbb</Typography></TableCell>
            <TableCell><Typography>ccc</Typography></TableCell>
            <TableCell><Typography>ddd</Typography></TableCell>
            <TableCell><Typography>aaa</Typography></TableCell>
            <TableCell><Typography>bbb</Typography></TableCell>
            <TableCell><Typography>ccc</Typography></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
