import React, { useContext, useEffect, useState } from 'react';
import s from './VisasPassports.module.css';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/user-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import AlertDialogSlide from '../../../common/DeleteNotification';
import VisasTableDialog from './VisasTableDialog';
import AddButton from '../../../common/AddButton';

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dayjs = require('dayjs');

  useEffect(() => {
    if (currentUserData && currentUserData.visas) {
      const rows = currentUserData.visas.map((visa, index) =>
        createData(
          visa.visaCountry,
          visa.visaType,
          dayjs(visa.visaValidDate).format('DD-MM-YYYY'),
          visa.id,
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
    control,
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
    reset();
  };

  const handleDelete = visaId => {
    deleteVisaData(visaId);
    setOpenDeleteDialog(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <TableContainer className={s.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={s.tableHeader}>
                  {column.id === 'delete' ? (
                    <div>
                      <AddButton handleClickOpen={handleClickOpen} />
                    </div>
                  ) : (
                    column.label
                  )}
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
                            <Button onClick={handleClickOpenDeleteDialog}>
                              <DeleteIcon sx={{ color: pink[500] }} />
                            </Button>
                            <div>
                              <AlertDialogSlide
                                openDeleteDialog={openDeleteDialog}
                                handleCloseDeleteDialog={handleCloseDeleteDialog}
                                handleDelete={handleDelete}
                                rowId={row.id}
                              />
                            </div>
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
        rowsPerPageOptions={[3]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <VisasTableDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        saveButtonClick={saveButtonClick}
        register={register}
        control={control}
      />
    </div>
  );
};

export default VisasTable;
