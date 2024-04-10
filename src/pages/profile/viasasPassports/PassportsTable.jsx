import React, { useContext, useEffect, useState } from 'react';
import s from './VisasPassports.module.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/user-context';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';

const columns = [
  { id: 'nationality', label: 'Nationality' },
  { id: 'number', label: 'Number' },
  { id: 'placeIssues', label: 'Place Issues' },
  { id: 'dateIssues', label: 'Date Issues' },
  { id: 'expireDate', label: 'Expire Date' },
  { id: 'delete', label: '' },
];
const createData = (nationality, number, placeIssues, dateIssues, expireDate, id) => {
  return { nationality, number, placeIssues, dateIssues, expireDate, id };
};

const PassportsTable = () => {
  const { currentUserData, updatePassportsData, deletePassportData } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (currentUserData && currentUserData.passports) {
      const rows = currentUserData.passports.map((passport, index) =>
        createData(
          passport.nationality,
          passport.number,
          passport.placeIssues,
          passport.dateIssues,
          passport.expireDate,
          passport.id,
          index
        )
      );
      setRows(rows);
    }
  }, [currentUserData]);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const saveButtonClick = data => {
    updatePassportsData(data);
    setOpen(false);
  };

  const handleDelete = passportId => {
    deletePassportData(passportId);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <div>
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
                        {column.id === 'delete' ? (
                          <div className={s.deletePassportButton}>
                            <Button onClick={() => handleDelete(row.id)}>
                              <ClearIcon />
                            </Button>
                          </div>
                        ) : column.format && typeof value === 'number' ? (
                          column.format(value)
                        ) : (
                          value
                        )}
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
      <div className={s.addPassportButton}>
        <Button onClick={handleClickOpen}>
          <AddCircleIcon />
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(saveButtonClick)}>
          <DialogTitle>Add Passport</DialogTitle>
          <DialogContent>
            <div className={s.newPassportContainer}>
              <div>
                <TextField
                  {...register('nationality')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Nationality"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('number')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Number"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('placeIssues')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Place Issues"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('dateIssues')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="Date Issues"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('expireDate')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="Expire Date"
                  style={{ width: '160px' }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Passport</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default PassportsTable;
