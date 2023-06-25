import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

import Title from '../Title';


export default function AccountTable({year, monthlyData}) {
  return (
    <React.Fragment>
      <Title>{year}年 収支表</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Typography fontSize={20}>月</Typography></TableCell>
            <TableCell align="right"><Typography fontSize={20}>収入</Typography></TableCell>
            <TableCell align="right"><Typography fontSize={20}>支出</Typography></TableCell>
            <TableCell align="right"><Typography fontSize={20}>差額</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monthlyData['in'].map((in_data, idx) => (
            <TableRow key={idx}>
              <TableCell><Typography>{in_data[0]}</Typography></TableCell>
              <TableCell align="right"><Typography>{`${in_data[1]}円`}</Typography></TableCell>
              <TableCell align="right"><Typography>{`${monthlyData['out'][idx][1]}円`}</Typography></TableCell>
              {
                in_data[1] - monthlyData['out'][idx][1] >= 0 ?
                <TableCell align="right">
                  <Typography color='green'>
                    {`${in_data[1] - monthlyData['out'][idx][1]}円 余裕`}
                  </Typography>
                </TableCell>
                :
                <TableCell align="right">
                  <Typography color='error'>
                    {`${monthlyData['out'][idx][1] - in_data[1]}円 超過`}
                  </Typography>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
