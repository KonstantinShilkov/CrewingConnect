import React from 'react';
import s from './QualificationDocuments.module.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import CountrySelectDialogs from '../../../common/CountrySelectDialogs';

const LicensesTableDialog = props => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <form onSubmit={props.handleSubmit(props.saveButtonClick)}>
        <DialogTitle>Add License</DialogTitle>
        <DialogContent>
          <div className={s.newLicensesContainer}>
            <Controller
              control={props.control}
              name="national"
              render={({ field }) => <CountrySelectDialogs field={field} />}
            />
            <TextField
              {...props.register('gradeOfLicenses')}
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Grade of Licenses"
              style={{ width: '160px' }}
            />
            <TextField
              {...props.register('licenseType')}
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Licenses Type (S or M)"
              style={{ width: '160px' }}
            />
            <TextField
              {...props.register('number')}
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Number"
              style={{ width: '160px' }}
            />
            <TextField
              {...props.register('placeIssues')}
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              label="Place Issues"
              style={{ width: '160px' }}
            />
            <TextField
              {...props.register('dateIssues')}
              required
              size="small"
              InputLabelProps={{ shrink: true }}
              type="date"
              label="Date Issues"
              style={{ width: '160px' }}
            />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Add Licenses</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LicensesTableDialog;
