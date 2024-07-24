import React from 'react';
import s from './VisasPassports.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import CountrySelectDialogs from '../../../common/CountrySelectDialogs';

const VisasTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add Visa</DialogTitle>
        <DialogContent>
          <div className={s.newVisaContainer}>
            <div className={s.country}>
              <Controller
                control={props.control}
                name="visaCountry"
                render={({ field }) => <CountrySelectDialogs field={field} />}
              />
            </div>
            <div className={s.typeDate}>
              <TextField
                {...props.register('visaType')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Type"
              />
              <TextField
                {...props.register('visaValidDate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Valid Until"
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

export default VisasTableDialog;
