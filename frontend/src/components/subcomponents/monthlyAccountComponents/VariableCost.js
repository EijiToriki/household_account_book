import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

import Title from '../Title'

export default function VariableCost() {
  return (
    <React.Fragment>
      <Title>変動費</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Typography fontSize={20}>日付</Typography></TableCell>
            <TableCell><Typography fontSize={20}>食費</Typography></TableCell>
            <TableCell><Typography fontSize={20}>日用品</Typography></TableCell>
            <TableCell><Typography fontSize={20}>趣味</Typography></TableCell>
            <TableCell><Typography fontSize={20}>遊び</Typography></TableCell>
            <TableCell><Typography fontSize={20}>自己投資</Typography></TableCell>
            <TableCell><Typography fontSize={20}>交通費</Typography></TableCell>
            <TableCell><Typography fontSize={20}>その他</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* ここをmapで回すイメージ */}
            <TableCell><Typography>aaa</Typography></TableCell>
            <TableCell><Typography>bbb</Typography></TableCell>
            <TableCell><Typography>ccc</Typography></TableCell>
            <TableCell><Typography>ddd</Typography></TableCell>
            <TableCell><Typography>aaa</Typography></TableCell>
            <TableCell><Typography>bbb</Typography></TableCell>
            <TableCell><Typography>ccc</Typography></TableCell>
            <TableCell><Typography>ddd</Typography></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
