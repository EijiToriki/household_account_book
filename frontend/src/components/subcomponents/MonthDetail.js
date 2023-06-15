import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Typography } from '@mui/material';

export default function MonthDetail({budgetData}) {
  return (
    <React.Fragment>
      <Title>6月 カテゴリ別支出</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Typography fontSize={20}>カテゴリ</Typography></TableCell>
            <TableCell align="right"><Typography fontSize={20}>支出額</Typography></TableCell>
            <TableCell align="right"><Typography fontSize={20}>目標</Typography></TableCell>
            <TableCell align="right"><Typography fontSize={20}>差額</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetData.map((data, idx) => (
            <TableRow key={idx}>
              <TableCell><Typography>{data[0]}</Typography></TableCell>
              <TableCell align="right"><Typography>{`${data[1]}円`}</Typography></TableCell>
              <TableCell align="right"><Typography>{`${data[2]}円`}</Typography></TableCell>
              {
                data[2] - data[1] > 0 ?
                <TableCell align="right">
                  <Typography color='green'>
                    {`${data[2] - data[1]}円 余裕`}
                  </Typography>
                </TableCell>
                :
                <TableCell align="right">
                  <Typography color='error'>
                    {`${data[1] - data[2]}円 超過`}
                  </Typography>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="Month" sx={{ mt: 3 }}>
        他の月の支出を確認する
      </Link>
    </React.Fragment>
  );
}
