import React from 'react';
import s from './VisasPassports.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const PassportsTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add Passport</DialogTitle>
        <DialogContent>
          <div className={s.newPassportContainer}>
            <div>
              <TextField
                {...props.register('nationality')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Nationality"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('number')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Number"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('placeIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Place Issues"
                style={{ width: '160px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('dateIssues')}
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
                {...props.register('expireDate')}
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
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Add Passport</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PassportsTableDialog;
