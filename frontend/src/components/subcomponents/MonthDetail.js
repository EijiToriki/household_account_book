import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Typography } from '@mui/material';

// ハードコーディング（本当はバックから持ってくる）
function createData(id, category, payment, budget) {
  return { id, category, payment, budget };
}

const rows = [
  createData(
    0,
    '家賃',
    69300,
    70000
  ),
  createData(
    1,
    '食費',
    30000,
    35000
  ),
  createData(
    2,
    '趣味',
    12000,
    10000
  ),
  createData(
    3,
    '遊び',
    18000,
    20000
  )
];

export default function MonthDetail() {
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell><Typography>{row.category}</Typography></TableCell>
              <TableCell align="right"><Typography>{`${row.payment}円`}</Typography></TableCell>
              <TableCell align="right"><Typography>{`${row.budget}円`}</Typography></TableCell>
              {
                row.budget - row.payment > 0 ?
                <TableCell align="right">
                  <Typography color='green'>
                    {`${row.budget - row.payment}円 余裕`}
                  </Typography>
                </TableCell>
                :
                <TableCell align="right">
                  <Typography color='error'>
                    {`${row.payment - row.budget}円 超過`}
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
