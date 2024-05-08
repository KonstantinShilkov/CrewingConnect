import React, { useContext, useEffect, useState } from 'react';
import s from './MarineCourses.module.css';
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
import MarineCoursesTableDialog from './MarineCoursesTableDialog';

const columns = [
  { id: 'courseAttended', label: 'Marine Course Attended' },
  { id: 'dateIssues', label: 'Date Attended' },
  { id: 'expireDate', label: 'Expired(if any)' },
  { id: 'remarks', label: 'Remarks' },
  { id: 'delete', label: '' },
];
const createData = (courseAttended, dateIssues, expireDate, remarks, id) => {
  return { courseAttended, dateIssues, expireDate, remarks, id };
};

const MarineCoursesTable = () => {
  const { currentUserData, updateCourseData, deleteCourseData } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dayjs = require('dayjs');

  useEffect(() => {
    if (currentUserData && currentUserData.courses) {
      const rows = currentUserData.courses.map((course, index) =>
        createData(
          course.courseAttended,
          dayjs(course.dateIssues).format('DD-MM-YYYY'),
          dayjs(course.expireDate).format('DD-MM-YYYY'),
          course.remarks,
          course.id,
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
    updateCourseData(data);
    setOpen(false);
    reset();
  };

  const handleDelete = courseId => {
    deleteCourseData(courseId);
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
      <div className={s.addCourseButton}>
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
                        <div className={s.deleteCourseButton}>
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

      <MarineCoursesTableDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        saveButtonClick={saveButtonClick}
        register={register}
      />
    </div>
  );
};

export default MarineCoursesTable;
