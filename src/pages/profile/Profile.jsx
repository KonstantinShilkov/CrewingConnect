import React, { useContext } from 'react';
import s from './Profile.module.css';
import { NavLink } from 'react-router-dom';
import { Grid, IconButton, TextField } from '@mui/material';
import { UserContext } from '../../context/user-context';
import Preloader from '../../common/Preloader';
import EditNoteIcon from '@mui/icons-material/EditNote';
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';
import { Card } from '@mui/joy';
import ProfileTable from './ProfileTable';

const Profile = () => {
  const { currentUserData, isFetching } = useContext(UserContext);

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={s.profileContainer}>
      <Card className={s.card}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <div className={s.profileTextfields}>
              <div className={s.age}>
                <TextField
                  size="small"
                  fullWidth
                  label="Age"
                  style={{ width: '150px' }}
                  value={currentUserData.age ? currentUserData.age : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.presentRank}>
                <TextField
                  size="small"
                  fullWidth
                  label="Present Rank"
                  style={{ width: '150px', color: 'primary' }}
                  value={currentUserData.presentRank ? currentUserData.presentRank : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.appliedRank}>
                <TextField
                  size="small"
                  fullWidth
                  label="Applied for Rank"
                  style={{ width: '150px' }}
                  value={currentUserData.rankApplied ? currentUserData.rankApplied : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.vesselType}>
                <TextField
                  size="small"
                  fullWidth
                  label="Type of Vessel"
                  style={{ width: '150px' }}
                  value={currentUserData.vesselType ? currentUserData.vesselType : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.availibaleDate}>
                <TextField
                  size="small"
                  fullWidth
                  label="Availibale Date"
                  style={{ width: '150px' }}
                  value={currentUserData.availableDate ? currentUserData.availableDate : ''}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className={s.avatarContainer}>
              <div className={s.name}>
                <TextField
                  size="small"
                  fullWidth
                  label="Full Name"
                  style={{ width: '350px' }}
                  value={`${currentUserData.name ? currentUserData.name : ''} ${
                    currentUserData.surname ? currentUserData.surname : ''
                  } ${currentUserData.middleName ? currentUserData.middleName : ''}`}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className={s.avatar}>
                <img src={currentUserData.photo || defaultAvatar} className={s.avatar} />
              </div>
              <div className={s.button}>
                <NavLink to="/profile/edit/maininfo">
                  <IconButton size="large">
                    <EditNoteIcon />
                  </IconButton>
                </NavLink>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <ProfileTable />
            {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
            {/* <div className={s.table}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map(column => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
              {/* </Paper> */}
            {/* </div> */}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Profile;
