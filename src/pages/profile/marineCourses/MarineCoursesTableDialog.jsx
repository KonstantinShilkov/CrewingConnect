import React from 'react';
import s from './MarineCourses.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const MarineCoursesTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add Marine Course</DialogTitle>
        <DialogContent>
          <div className={s.newCourseContainer}>
            <div>
              <TextField
                {...props.register('courseAttended')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Course Attended"
                style={{ width: '500px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('dateIssues')}
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
                {...props.register('expireDate')}
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Expired (if any)"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('remarks')}
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Remarks"
                style={{ width: '160px' }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Add Course</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MarineCoursesTableDialog;
