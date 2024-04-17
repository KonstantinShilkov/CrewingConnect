import React, { useContext, useEffect, useState } from 'react';
import s from './QualificationDocuments.module.css';
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
  { id: 'qualificationCertificate', label: 'Qualification/Certificate' },
  { id: 'placeIssues', label: 'Place Issues' },
  { id: 'dateIssues', label: 'Date Issues' },
  { id: 'expireDate', label: 'Expire Date' },
  { id: 'delete', label: '' },
];
const createData = (qualificationCertificate, placeIssues, dateIssues, expireDate, id) => {
  return { qualificationCertificate, placeIssues, dateIssues, expireDate, id };
};

const QualificationCertificates = () => {
  const { currentUserData, updateQualificationCertificatesData, deleteQualificationCertificateData } =
    useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (currentUserData && currentUserData.qualifications) {
      const rows = currentUserData.qualifications.map((qualificationCertificate, index) =>
        createData(
          qualificationCertificate.qualificationCertificate,
          qualificationCertificate.placeIssues,
          qualificationCertificate.dateIssues,
          qualificationCertificate.expireDate,
          qualificationCertificate.id,
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
    updateQualificationCertificatesData(data);
    setOpen(false);
    reset();
  };

  const handleDelete = qualificationId => {
    deleteQualificationCertificateData(qualificationId);
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
                        <div className={s.deleteQualificationCertificateButton}>
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
      <div className={s.addQualificationCertificateButton}>
        <Button onClick={handleClickOpen}>
          <AddCircleIcon />
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(saveButtonClick)}>
          <DialogTitle>Qualifications / Certificates</DialogTitle>
          <DialogContent>
            <div className={s.newQualificationCertificateContainer}>
              <div>
                <TextField
                  {...register('qualificationCertificate')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Qualification /Certificate"
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
            <Button type="submit">Add Qualification / Certificate</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default QualificationCertificates;
