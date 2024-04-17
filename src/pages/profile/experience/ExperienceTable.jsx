import React, { useContext, useEffect, useState } from 'react';
import s from './Experince.module.css';
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
  { id: 'vesselName', label: 'Vessel Name' },
  { id: 'typeTrade', label: 'Type / kW; Trading/DW' },
  { id: 'engineType', label: 'S/M' },
  { id: 'vesselType', label: 'Vessel Type' },
  { id: 'companyName', label: 'Company Name' },
  { id: 'rank', label: 'Rank' },
  { id: 'fromDate', label: 'From' },
  { id: 'tillDate', label: 'Till' },
  { id: 'delete', label: '' },
];
const createData = (
  vesselName,
  typeTrade,
  engineType,
  vesselType,
  companyName,
  rank,
  fromDate,
  tillDate,
  id
) => {
  return { vesselName, typeTrade, engineType, vesselType, companyName, rank, fromDate, tillDate, id };
};

const ExperienceTable = () => {
  const { currentUserData, updateExperienceData, deleteExperienceData } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (currentUserData && currentUserData.experience) {
      const rows = currentUserData.experience.map((exp, index) =>
        createData(
          exp.vesselName,
          exp.typeTrade,
          exp.engineType,
          exp.vesselType,
          exp.companyName,
          exp.rank,
          exp.fromDate,
          exp.tillDate,
          exp.id,
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
    updateExperienceData(data);
    setOpen(false);
    reset();
  };

  const handleDelete = experienceId => {
    deleteExperienceData(experienceId);
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
                        <div className={s.deleteExperineceButton}>
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
      <div className={s.addExperienceButton}>
        <Button onClick={handleClickOpen}>
          <AddCircleIcon />
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(saveButtonClick)}>
          <DialogTitle>Add Experience</DialogTitle>
          <DialogContent>
            <div className={s.newExperienceContainer}>
              <div>
                <TextField
                  {...register('vesselName')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Vessel Name"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('typeTrade')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Type/kW or Area/DW"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('engineType')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Steam or Motor"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('vesselType')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Vessel Type"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('companyName')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Company Name"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('rank')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label="Rank"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('fromDate')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="From"
                  style={{ width: '160px' }}
                />
              </div>
              <div>
                <TextField
                  {...register('tillDate')}
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  label="Till"
                  style={{ width: '160px' }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Experience</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ExperienceTable;
