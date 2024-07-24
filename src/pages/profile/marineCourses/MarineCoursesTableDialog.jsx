import React from 'react';
import s from './MarineCourses.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import CourseSelectDialogs from '../../../common/CourseSelectDialogs';

const MarineCoursesTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add Marine Course</DialogTitle>
        <DialogContent>
          <div className={s.newCourseContainer}>
            <div className={s.courses}>
              <Controller
                control={props.control}
                name="courseAttended"
                render={({ field }) => <CourseSelectDialogs field={field} />}
              />
            </div>
            <div className={s.remarks}>
              <TextField
                {...props.register('remarks')}
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Remarks"
                style={{ width: '160px' }}
              />
            </div>

            <div className={s.date}>
              <TextField
                {...props.register('dateIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Date Attended"
                style={{ width: '160px' }}
              />
              <TextField
                {...props.register('expireDate')}
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Expired (if any)"
                style={{ width: '160px' }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button className={s.addButton} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MarineCoursesTableDialog;
