import React, { useContext, useEffect, useState } from 'react';
import s from './Experince.module.css';
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
import ExperienceTableDialog from './ExperienceTableDialog';
import _ from 'lodash';

const columns = [
  { id: 'vesselName', label: 'Vessel Name', minWidth: 100 },
  { id: 'typeTrade', label: 'Type / kW; Trading/DW', minWidth: 85 },
  { id: 'engineType', label: 'Type (S/M)', minWidth: 75 },
  { id: 'vesselType', label: 'Vessel Type' },
  { id: 'companyName', label: 'Company Name' },
  { id: 'rank', label: 'Rank' },
  { id: 'fromDate', label: 'From', minWidth: 85 },
  { id: 'tillDate', label: 'Till', minWidth: 85 },
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dayjs = require('dayjs');

  useEffect(() => {
    if (currentUserData && currentUserData.experience) {
      const sortedRowsByDate = _.sortBy(currentUserData.experience, 'fromDate').reverse();
      const rows = sortedRowsByDate.map((exp, index) =>
        createData(
          exp.vesselName,
          exp.typeTrade,
          exp.engineType,
          exp.vesselType,
          exp.companyName,
          exp.rank,
          dayjs(exp.fromDate).format('DD-MM-YYYY'),
          dayjs(exp.tillDate).format('DD-MM-YYYY'),
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
      <div className={s.addExperienceButton}>
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
            {/* {sortedRows.map((row, index) => ( */}
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'delete' ? (
                        <div className={s.deleteExperineceButton}>
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
        rowsPerPageOptions={[3]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ExperienceTableDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        saveButtonClick={saveButtonClick}
        register={register}
      />
    </div>
  );
};

export default ExperienceTable;
