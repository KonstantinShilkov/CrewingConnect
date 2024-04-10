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
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'valid', label: 'Valid Until', minWidth: 100 },
  { id: 'delete', label: '', minWidth: 50 },
];
const createData = (country, type, valid, id) => {
  return { country, type, valid, id };
};

const VisasTable = () => {
  const { currentUserData, updateVisasData, deleteVisaData } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (currentUserData && currentUserData.visas) {
      const rows = currentUserData.visas.map((visa, index) =>
        createData(visa.visaCountry, visa.visaType, visa.visaValidDate, visa.id, index)
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
    updateVisasData(data);
    setOpen(false);
  };

  const handleDelete = visaId => {
    deleteVisaData(visaId);
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
                          <div className={s.deleteVisaButton}>
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
      <div className={s.addVisaButton}>
        <Button onClick={handleClickOpen}>
          <AddCircleIcon />
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(saveButtonClick)}>
          <DialogTitle>Add Visa</DialogTitle>
          <DialogContent>
            <div className={s.newVisaContainer}>
              <div>
                <TextField
                  {...register('visaCountry')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Country"
                  style={{ width: '150px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('visaType')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Type"
                  style={{ width: '150px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('visaValidDate')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="Valid Until"
                  style={{ width: '150px' }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Visa</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default VisasTable;
