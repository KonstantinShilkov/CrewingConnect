import React, { useContext, useEffect, useState } from 'react';
import s from './QualificationDocuments.module.css';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/user-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import AlertDialogSlide from '../../../common/DeleteNotification';
import SeamanBookIdTableDialog from './SeamanBookIdTableDialog';

const columns = [
  { id: 'national', label: 'National' },
  { id: 'number', label: 'Number' },
  { id: 'placeIssues', label: 'Place Issues' },
  { id: 'dateIssues', label: 'Date Issues' },
  { id: 'expireDate', label: 'Expire Date' },
  { id: 'delete', label: '' },
];
const createData = (national, number, placeIssues, dateIssues, expireDate, id) => {
  return { national, number, placeIssues, dateIssues, expireDate, id };
};

const SeamanBookIdTable = () => {
  const { currentUserData, updateSeamanBooksData, deleteSeamanBookData } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dayjs = require('dayjs');

  useEffect(() => {
    if (currentUserData && currentUserData.seamanBooks) {
      const rows = currentUserData.seamanBooks.map((seamanBook, index) =>
        createData(
          seamanBook.national,
          seamanBook.number,
          seamanBook.placeIssues,
          dayjs(seamanBook.dateIssues).format('DD-MM-YYYY'),
          dayjs(seamanBook.expireDate).format('DD-MM-YYYY'),
          seamanBook.id,
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
    updateSeamanBooksData(data);
    setOpen(false);
    reset();
  };

  const handleDelete = seamanBookId => {
    deleteSeamanBookData(seamanBookId);
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
      <div className={s.addSeamanBookButton}>
        <Button onClick={handleClickOpen}>
          <AddCircleIcon />
        </Button>
      </div>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'delete' ? (
                        <div className={s.deleteSeamanBookButton}>
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
            ))}
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

      <SeamanBookIdTableDialog
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

export default SeamanBookIdTable;
