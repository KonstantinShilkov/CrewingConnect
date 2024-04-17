import React, { useContext, useEffect, useState } from 'react';
import s from './MarineCourses.module.css';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';

const columns = [
  { id: 'courseAttended', label: 'Marine Course Attended' },
  { id: 'dateIssues', label: 'Date Attended' },
  { id: 'expireDate', label: 'Expired(if any) ' },
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

  useEffect(() => {
    if (currentUserData && currentUserData.courses) {
      const rows = currentUserData.courses.map((course, index) =>
        createData(
          course.courseAttended,
          course.dateIssues,
          course.expireDate,
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'delete' ? (
                        <div className={s.deleteCourseButton}>
                          <Button onClick={() => handleDelete(row.id)}>
                            <DeleteIcon sx={{ color: pink[500] }} />
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
      <div className={s.addCourseButton}>
        <Button onClick={handleClickOpen}>
          <AddCircleIcon />
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(saveButtonClick)}>
          <DialogTitle>Add Passport</DialogTitle>
          <DialogContent>
            <div className={s.newCourseContainer}>
              <div>
                <TextField
                  {...register('courseAttended')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Course Attended"
                  style={{ width: '500px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('dateIssues')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="Date Attended"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('expireDate')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="Expired (if any)"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('remarks')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Remarks"
                  style={{ width: '160px' }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Course</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default MarineCoursesTable;
