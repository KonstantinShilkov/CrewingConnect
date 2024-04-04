import React, { useState } from 'react';
import s from './VisasPasports.module.css';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const visasColumns = [
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'valid', label: 'Valid Until', minWidth: 100 },
];
const createData = (country, type, valid) => {
  return { country, type, valid };
};
const visasRows = [
  createData('ETO', 'LNG', 3),
  createData('ETO', 'LNG', 3),
  createData('ETO', 'LPG', 2),
  createData('ETO', 'LPG', 2),
];

const VisasPasports = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  return (
    <div className={s.visasPasrotsContainer}>
      <Card className={s.card}>
        <div className={s.visas}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {visasColumns.map(column => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visasRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {visasColumns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={s.pasports}></div>
      </Card>
    </div>
  );
};

export default VisasPasports;
