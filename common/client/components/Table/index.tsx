import React from 'react';
import dynamic from 'next/dynamic';

import TableMaterial from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import { Row } from '../../types';

const Title = dynamic(() => import('../Title'));

function Table({ rows }: { rows: Array<Row> }) {
  return (
    <>
      <Title>최근 보호중인 동물들</Title>
      <TableMaterial size="small">
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>품종</TableCell>
            <TableCell>발견장소</TableCell>
            <TableCell>보호장소</TableCell>
            <TableCell align="right">보호소 전화번호</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{row.happenDt.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')}</TableCell>
              <TableCell>{row.kindCd}</TableCell>
              <TableCell>{row.happenPlace}</TableCell>
              <TableCell>{row.careAddr}</TableCell>
              <TableCell align="right">{row.careTel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMaterial>
    </>
  );
}

export default React.memo(Table);
