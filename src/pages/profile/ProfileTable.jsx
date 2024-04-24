import React, { useState } from 'react';
import s from './Profile.module.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useProfileExperience } from './hooks/useProfileExperience';
import { useEffect } from 'react';
import { updatedFilteredExperienceInDays } from '../../utils';

const columns = [
  { id: 'rank', label: 'Rank', minWidth: 100 },
  { id: 'vesselType', label: 'Vessel Type', minWidth: 100 },
  { id: 'totalExpr', label: 'Total Months/Days', minWidth: 100 },
];

const createData = (rank, vesselType, totalExpr) => {
  return { rank, vesselType, totalExpr };
};

const ProfileTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [rows, setRows] = useState([]);
  const { filteredExperience, isFetching } = useProfileExperience();

  useEffect(() => {
    if (filteredExperience && !isFetching) {
      const rows = filteredExperience.map((exp, index) =>
        createData(exp.rank, exp.vesselType, updatedFilteredExperienceInDays(exp.experienceInDays), index)
      );
      setRows(rows);
    }
  }, [filteredExperience]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={s.table}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map(column => {
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
      <TablePagination
        rowsPerPageOptions={[3, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProfileTable;
