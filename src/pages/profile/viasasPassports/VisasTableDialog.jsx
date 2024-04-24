import React from 'react';
import s from './VisasPassports.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const VisasTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add Visa</DialogTitle>
        <DialogContent>
          <div className={s.newVisaContainer}>
            <div>
              <TextField
                {...props.register('visaCountry')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Country"
                style={{ width: '150px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('visaType')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Type"
                style={{ width: '150px' }}
              />
            </div>
            <div>
              <TextField
                {...props.register('visaValidDate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Valid Until"
                style={{ width: '150px' }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Add Visa</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VisasTableDialog;
