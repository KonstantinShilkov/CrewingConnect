import React from 'react';
import s from './VisasPassports.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import CountrySelectDialogs from '../../../common/CountrySelectDialogs';
import { Controller } from 'react-hook-form';

const PassportsTableDialog = props => {
  return (
    <Dialog className={s.dialog} open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add Passport</DialogTitle>
        <DialogContent>
          <div className={s.newPassportContainer}>
            <div className={s.countryPlace}>
              <Controller
                control={props.control}
                name="nationality"
                render={({ field }) => <CountrySelectDialogs field={field} />}
              />
              <TextField
                {...props.register('placeIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Place Issues"
              />
            </div>
            <div className={s.number}>
              <TextField
                {...props.register('number')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                label="Number"
              />
            </div>
            <div className={s.date}>
              <TextField
                {...props.register('dateIssues')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Date Issues"
              />
              <TextField
                {...props.register('expireDate')}
                required
                size="small"
                InputLabelProps={{ shrink: true }}
                type="date"
                label="Expire Date"
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

export default PassportsTableDialog;
